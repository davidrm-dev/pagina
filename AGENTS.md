**Agents Guide**

- Purpose: provide instructions and conventions for autonomous/code-writing agents working in this repo; keep changes safe, reproducible, and consistent.
- Repo entrypoint: `index.html` (static site). Images live at the repository root: `logo.png`, `JugoMango.png`, `JugoMora.png`.

Build / Lint / Test commands
- Serve the site locally (quick, zero-install):
  - `python3 -m http.server 8000` — serves repo on http://localhost:8000 (run from the repo root).
  - `ruby -run -ehttpd . -p 8000` — alternative if Ruby is preferred.
- Node-based quick server (if Node is available):
  - Install once: `npm install -g http-server` or `corepack enable && npm i -D http-server`.
  - Run: `npx http-server -c-1 . -p 8000`
- Linting / formatting (recommended tools; not required for this static repo):
  - HTML: `tidy -e index.html` (installs: `brew install tidy-html5` on macOS) — checks for structural issues.
  - CSS: `stylelint "**/*.css"` (requires a `package.json` and `stylelint` config).
  - JS/TS: `eslint .` (requires `eslint` configuration). Use `npx eslint --fix .` to auto-fix simple issues.
  - Automated formatting: `npx prettier --write .` (requires Prettier in `package.json`).
- Tests (this repo currently has no tests):
  - Recommended test runner: Jest for JS/TS. To run all tests: `npx jest`.
  - Run a single test by name: `npx jest -t "nameRegex"`.
  - Run a single test file: `npx jest path/to/file.test.js` or `npm test -- path/to/file.test.js`.
  - For other frameworks: use `pytest path/to/test.py` for Python, `go test ./pkg -run TestName` for Go.

Repository conventions and code style
- General
  - Keep the repo small and explicit: static assets at root are acceptable for this project.
  - Agents MUST NOT create or commit secrets. If a secret is required, ask the human operator.
  - Prefer adding a `README.md` and `package.json` if adding build tooling or tests so other agents and humans can reproduce flows.

- Formatting
  - Use Prettier for HTML/CSS/JS/JSON when present: `npx prettier --write <files>`.
  - Keep line length to 100 characters where practical.
  - Use 2 spaces for indentation in web files (HTML/CSS/JS). Use tabs only if a project-wide convention already uses them.

- HTML
  - Use lowercase for element and attribute names.
  - Always include `lang` on the `<html>` element (e.g. `<html lang="en">`).
  - Order attributes: id, class, data-*, aria-*, other attributes, event handlers last.
  - Use semantic elements (`header`, `main`, `footer`, `nav`, `section`, `article`) rather than generic `div` where appropriate.
  - Minimize inline styles; prefer a separate CSS file.

- CSS
  - File naming: kebab-case for filenames (`main.css`, `home-page.css`).
  - Use CSS variables for colors and spacing when a stylesheet grows beyond a couple files.
  - Prefer BEM-like class naming when components are complex (block__element--modifier).
  - Keep specificity low; avoid deep selectors.

- JavaScript / TypeScript
  - If adding JS: prefer ES Modules (`import` / `export`).
  - File naming: kebab-case for files that map to pages (`cart-widget.js`), PascalCase for React components (`CartWidget.jsx`) if React is introduced.
  - Variables and function names: use camelCase. Use PascalCase for constructor functions and classes.
  - Prefer `const` and `let` over `var`. Use `const` by default.
  - Prefer TypeScript for new code if the repository becomes non-trivial. If TS is used, add `tsconfig.json` and type-check in CI.
  - Keep functions small and single-responsibility. Prefer composition over long monolithic functions.

- Imports
  - Always use absolute or project-root relative imports only if a module resolver is configured; otherwise use relative imports that remain correct when files move together.
  - Keep import ordering consistent: 1) external packages, 2) internal modules (grouped by feature), 3) assets (images, styles). Use a linter rule to enforce order (eslint-plugin-import).

- Types and annotations
  - If TypeScript: fully type public function signatures and exported objects. Use `unknown` instead of `any` when handling external input, and narrow with type guards.
  - In JS-only files, prefer JSDoc for complex public APIs to help tooling and agents.

- Naming conventions
  - Files: kebab-case for plain scripts and styles; PascalCase for component classes when applicable.
  - Variables/functions: camelCase. Constants (module-level) that are truly constant: UPPER_SNAKE_CASE.
  - HTML classes: kebab-case or BEM as noted above.

- Error handling
  - Do not swallow errors silently. Either handle the error or rethrow/log it with context.
  - For async/await, wrap top-level awaits in try/catch and return useful error messages.
  - Prefer returning structured errors (objects with `code`, `message`, and optional `details`) instead of free-form strings for programmatic handling.
  - Log errors with stack traces when available during development; in production logs redact sensitive values.

- Security / secrets
  - Never write credentials, private keys, or tokens into the repository.
  - If an agent needs an API key or secret, request it from the user; do not invent or persist secrets in files.

Cursor / Copilot rules
- Cursor rules: No `.cursor/rules/` directory exists in this repository. If you create one, document rule intent inside the directory and reference it here.
- Copilot instructions: No `.github/copilot-instructions.md` file exists. If you add Copilot rules, prefer short, actionable guidance (e.g. "Prefer explicit imports, avoid inline styles").

Working with git (agent rules)
- Agents MUST NOT run destructive Git commands (no `--hard` resets, no force-pushes to main/master) without explicit user approval.
- Do not amend commits unless explicitly requested. Create new commits for fixes.
- Commit message style: short header (imperative) + optional body. Example: `fix: prevent crash when image missing`.
- Avoid committing large generated files (build artifacts). Add them to `.gitignore` instead.

When adding tooling
- If you add Node tooling (eslint, jest, prettier, stylelint), add a minimal `package.json` and lockfile and document install steps in `README.md`.
- Prefer `npx` or local `node_modules/.bin` execution in automation to avoid global installs.

Agent behaviour and checklist (before committing or pushing)
- Run linters and formatters or ensure repository contains a clear instruction to do so.
- Run tests (if present) and fix failures.
- Ensure no secrets are being added.
- Create a concise commit message explaining the why behind the change.

Next steps humans may want to take
1. Add `package.json` with devDependencies (prettier, eslint, jest) to standardize agent workflows.
2. Add a `README.md` with local development steps and deploy instructions.
3. Add lightweight CI (GitHub Actions) that runs lint + tests on PRs.

If you are an automated agent and you need a default action to make progress: create a `README.md` with the serve commands above and add `package.json` only if you also add a matching `.gitignore` entry for node_modules. Ask for permission before pushing or modifying remote branches.
