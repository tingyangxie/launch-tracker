-- Clear existing data
DELETE FROM releases;
DELETE FROM products;
DELETE FROM daily_notes;

-- Real products (April 2026)
INSERT INTO products (id, name, organization, source_type, website_url, repo_url, description) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Gemma 4', 'Google DeepMind', 'big_tech', 'https://ai.google.dev/gemma', 'https://github.com/google-deepmind/gemma', 'Open-weight AI model family with E2B, E4B, 26B MoE, and 31B Dense variants'),
  ('b1000000-0000-0000-0000-000000000002', 'Qwen 3.6-Plus', 'Alibaba', 'big_tech', 'https://qwenlm.github.io', 'https://github.com/QwenLM/Qwen', 'Flagship AI model with 1M context window and native agentic coding'),
  ('b1000000-0000-0000-0000-000000000003', 'Cursor', 'Anysphere', 'startup', 'https://cursor.com', NULL, 'AI-first code editor with integrated agents'),
  ('b1000000-0000-0000-0000-000000000004', 'GitHub Copilot SDK', 'GitHub', 'big_tech', 'https://github.com/features/copilot', 'https://github.com/github/copilot-sdk', 'SDK to embed Copilot agentic capabilities into apps and services'),
  ('b1000000-0000-0000-0000-000000000005', 'VS Code', 'Microsoft', 'big_tech', 'https://code.visualstudio.com', 'https://github.com/microsoft/vscode', 'Popular open-source code editor by Microsoft'),
  ('b1000000-0000-0000-0000-000000000006', 'Claude', 'Anthropic', 'startup', 'https://claude.ai', NULL, 'AI assistant and platform by Anthropic'),
  ('b1000000-0000-0000-0000-000000000007', 'Cisco AI Defense', 'Cisco', 'big_tech', 'https://www.cisco.com', NULL, 'Zero Trust security framework for AI agents and multi-agent systems');

-- Real releases (April 1–9, 2026)
INSERT INTO releases (product_id, version, title, release_date, category, summary, is_major, tags, changelog_url) VALUES
  ('b1000000-0000-0000-0000-000000000007', NULL, 'Cisco Zero Trust for AI Agents at RSA 2026', '2026-04-01', 'security', 'New Zero Trust architecture for autonomous AI agents with real-time policy enforcement, anomaly detection, and DefenseClaw open-source framework.', true, ARRAY['zero-trust','ai-agents','rsa-2026','security'], 'https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2026/m03/cisco-reimagines-security-for-the-agentic-workforce.html'),
  ('b1000000-0000-0000-0000-000000000001', '4.0', 'Gemma 4 Open Model Family Released', '2026-04-02', 'ai_ml', 'Four model sizes (E2B, E4B, 26B MoE, 31B Dense) under Apache 2.0 license. 31B ranks #3 on Arena AI at 1452 Elo. Runs offline on edge devices.', true, ARRAY['open-source','llm','on-device','apache-2.0'], 'https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/'),
  ('b1000000-0000-0000-0000-000000000002', '3.6-Plus', 'Qwen 3.6-Plus Flagship Model', '2026-04-02', 'ai_ml', '1M token context window, 65K output tokens, always-on chain-of-thought, native function calling. Competitive with Claude 4.5 Opus on agentic coding.', true, ARRAY['llm','agentic','function-calling','alibaba'], 'https://qwenlm.github.io'),
  ('b1000000-0000-0000-0000-000000000003', '3.0', 'Cursor 3 — Agent-First IDE', '2026-04-02', 'devtools', 'Unified agent-first workspace with Agents Window for parallel agents across local, cloud, worktree, and SSH environments. Adds Design Mode.', true, ARRAY['ide','ai-agents','developer-tools'], 'https://cursor.com/blog/cursor-3'),
  ('b1000000-0000-0000-0000-000000000004', NULL, 'GitHub Copilot SDK Public Preview', '2026-04-02', 'devtools', 'SDK to embed Copilot agent runtime in apps. Supports Node.js, Python, Go, .NET, Java. Includes streaming, tool invocation, BYOK, and OpenTelemetry.', true, ARRAY['sdk','ai-agents','copilot','open-source'], 'https://github.blog/changelog/2026-04-02-copilot-sdk-in-public-preview/'),
  ('b1000000-0000-0000-0000-000000000006', NULL, 'Claude Mythos Preview Announced', '2026-04-07', 'ai_ml', 'Most capable Anthropic model to date. Gated access via Project Glasswing for 50 organizations to scan infrastructure for cybersecurity vulnerabilities.', true, ARRAY['llm','cybersecurity','restricted-access'], 'https://red.anthropic.com/2026/mythos-preview/'),
  ('b1000000-0000-0000-0000-000000000005', '1.115', 'VS Code 1.115 with Agents App', '2026-04-08', 'devtools', 'Introduces VS Code Agents companion app for agent-native development. Terminal image paste, background notifications for agents, pinch-to-zoom browser.', false, ARRAY['ide','ai-agents','weekly-release'], 'https://code.visualstudio.com/updates/v1_115'),
  ('b1000000-0000-0000-0000-000000000006', NULL, 'Claude Managed Agents Public Beta', '2026-04-09', 'ai_ml', 'Cloud-based suite for deploying AI agents without managing infrastructure. Automates execution, state management, orchestration. Early adopters include Notion, Asana, Sentry.', true, ARRAY['ai-agents','platform','enterprise','public-beta'], 'https://platform.claude.com/docs/en/release-notes/overview');
