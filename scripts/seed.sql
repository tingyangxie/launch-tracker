-- Seed data: Products
INSERT INTO products (id, name, organization, source_type, website_url, repo_url, description) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'React', 'Meta', 'big_tech', 'https://react.dev', 'https://github.com/facebook/react', 'JavaScript library for building user interfaces'),
  ('a1000000-0000-0000-0000-000000000002', 'Next.js', 'Vercel', 'startup', 'https://nextjs.org', 'https://github.com/vercel/next.js', 'The React framework for the web'),
  ('a1000000-0000-0000-0000-000000000003', 'PostgreSQL', 'PostgreSQL Global Development Group', 'open_source', 'https://postgresql.org', 'https://github.com/postgres/postgres', 'The world''s most advanced open source database'),
  ('a1000000-0000-0000-0000-000000000004', 'Claude', 'Anthropic', 'startup', 'https://claude.ai', NULL, 'AI assistant by Anthropic'),
  ('a1000000-0000-0000-0000-000000000005', 'Tailwind CSS', 'Tailwind Labs', 'open_source', 'https://tailwindcss.com', 'https://github.com/tailwindlabs/tailwindcss', 'Utility-first CSS framework'),
  ('a1000000-0000-0000-0000-000000000006', 'Rust', 'Rust Foundation', 'open_source', 'https://www.rust-lang.org', 'https://github.com/rust-lang/rust', 'A language empowering everyone to build reliable software'),
  ('a1000000-0000-0000-0000-000000000007', 'Supabase', 'Supabase', 'open_source', 'https://supabase.com', 'https://github.com/supabase/supabase', 'The open source Firebase alternative'),
  ('a1000000-0000-0000-0000-000000000008', 'Bun', 'Oven', 'open_source', 'https://bun.sh', 'https://github.com/oven-sh/bun', 'Incredibly fast JavaScript runtime');

-- Seed data: Releases
INSERT INTO releases (product_id, version, title, release_date, category, summary, is_major, tags) VALUES
  ('a1000000-0000-0000-0000-000000000001', '19.1', 'React 19.1 Released', '2026-03-28', 'web_framework', 'Stabilized server components and improved suspense handling.', true, ARRAY['frontend','server-components']),
  ('a1000000-0000-0000-0000-000000000002', '15.3', 'Next.js 15.3', '2026-03-25', 'web_framework', 'Improved turbopack stability and new caching strategies.', false, ARRAY['frontend','ssr','turbopack']),
  ('a1000000-0000-0000-0000-000000000003', '17.3', 'PostgreSQL 17.3', '2026-03-15', 'database', 'Minor release with bug fixes and performance improvements.', false, ARRAY['database','sql']),
  ('a1000000-0000-0000-0000-000000000004', 'Opus 4.6', 'Claude Opus 4.6 Released', '2026-04-09', 'ai_ml', 'New model with improved reasoning and coding capabilities.', true, ARRAY['llm','ai','api']),
  ('a1000000-0000-0000-0000-000000000005', '4.1', 'Tailwind CSS v4.1', '2026-03-20', 'web_framework', 'New utilities and improved performance.', false, ARRAY['css','frontend']),
  ('a1000000-0000-0000-0000-000000000006', '1.86', 'Rust 1.86.0', '2026-04-03', 'language_runtime', 'New stabilized APIs and compiler improvements.', false, ARRAY['systems','compiler']),
  ('a1000000-0000-0000-0000-000000000007', 'GA', 'Supabase Storage v3', '2026-04-01', 'cloud_infra', 'Resumable uploads and improved CDN integration.', true, ARRAY['storage','backend']),
  ('a1000000-0000-0000-0000-000000000008', '1.2', 'Bun 1.2', '2026-03-10', 'language_runtime', 'Windows support and Node.js compatibility improvements.', true, ARRAY['runtime','bundler']);
