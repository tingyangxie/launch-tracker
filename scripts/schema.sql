-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE release_source AS ENUM (
  'big_tech',
  'startup',
  'open_source',
  'community',
  'other'
);

CREATE TYPE release_category AS ENUM (
  'ai_ml',
  'web_framework',
  'mobile',
  'database',
  'devtools',
  'language_runtime',
  'os_platform',
  'security',
  'cloud_infra',
  'design',
  'hardware',
  'other'
);

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  organization  TEXT,
  source_type   release_source NOT NULL DEFAULT 'other',
  website_url   TEXT,
  repo_url      TEXT,
  description   TEXT,
  logo_url      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_source ON products (source_type);

CREATE TABLE releases (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  version       TEXT,
  title         TEXT NOT NULL,
  release_date  DATE NOT NULL,
  category      release_category NOT NULL DEFAULT 'other',
  summary       TEXT,
  changelog_url TEXT,
  is_major      BOOLEAN NOT NULL DEFAULT false,
  tags          TEXT[] DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_releases_date ON releases (release_date);
CREATE INDEX idx_releases_product ON releases (product_id);
CREATE INDEX idx_releases_category ON releases (category);

CREATE TABLE daily_notes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_date     DATE NOT NULL UNIQUE,
  content       TEXT NOT NULL DEFAULT '',
  release_ids   UUID[] DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notes_date ON daily_notes (note_date);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_releases_updated
  BEFORE UPDATE ON releases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_notes_updated
  BEFORE UPDATE ON daily_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS (permissive for MVP)
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on releases" ON releases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on daily_notes" ON daily_notes FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- VIEW
-- ============================================================

CREATE VIEW releases_with_product AS
SELECT
  r.*,
  p.name AS product_name,
  p.organization,
  p.source_type,
  p.logo_url,
  p.website_url,
  p.repo_url
FROM releases r
JOIN products p ON r.product_id = p.id;
