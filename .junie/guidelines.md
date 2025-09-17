Project: clemann (Create React App + TypeScript)

This document records project-specific guidance for building, testing, and contributing to this codebase. It assumes familiarity with Node.js, React, Jest/RTL, and TypeScript.

1. Build and configuration
- Node/npm: Project was validated with Node 16+ (react-scripts 5). Using a modern LTS (v18 or v20) also works, but if you hit type or Jest environment mismatches, prefer Node 18 LTS.
- Install: Run `npm ci` in CI environments for reproducible installs; locally `npm install` is fine.
- Start (dev server): `npm start` (react-scripts start)
- Production build: `npm run build` (outputs to build/)
- TypeScript: tsconfig.json is tailored for CRA TS defaults. react-scripts handles TS transpilation and type-checking during build. For isolated type-checking, you can run `tsc --noEmit` if you add a script.
- Browser targets: managed by browserslist in package.json (CRA defaults). Adjust only if you need to drop legacy targets or leverage newer syntax in output bundles.

2. Testing
- Runner: Jest via react-scripts (no explicit jest.config—CRA’s built-in config is used).
- Test utilities: @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @testing-library/dom are available. setupTests.ts imports jest-dom matchers and is auto-loaded by CRA.
- File conventions: Any `*.test.{ts,tsx,js,jsx}` or files under `__tests__/` are discovered by Jest. Tests run in jsdom by default.
- Run tests: `npm test` (interactive watch mode); CI/non-watch: `npm test -- --watchAll=false`.
- Adding tests:
  - Unit/component tests belong alongside the component under test: e.g., `src/components/Button/Button.test.tsx`.
  - Prefer Testing Library queries by role/name over text to make tests resilient and accessible.
  - Use `screen` and `within` from RTL; avoid implementation details. For async UI, use `findBy*` and `await`.
- Mocks/stubs:
  - Jest auto-mocking is not enabled. Use `jest.mock('module', () => ...)` per test or create `__mocks__` as needed.
  - For network calls, inject fetch/clients and mock them; or abstract to a service and mock the service.
- Coverage: CRA exposes coverage flags. Example: `npm test -- --coverage --watchAll=false`.

2.1 Demonstrated test run (verified)
- Existing test: `src/App.test.tsx` exercises the default App component and passes.
- Verified command: `npm test -- --watchAll=false` → observed “Test Suites: 1 passed”. Use this command in CI or when validating locally without watch mode.

3. Development notes
- Code style: CRA ESLint presets are active (`react-app`, `react-app/jest`). If you add rules, prefer extending via package.json eslintConfig to avoid ejecting.
- TS types: The project uses React 19 types. If you add libraries requiring React 18 types (e.g., legacy patterns), ensure compatibility or pin appropriate versions.
- React 19 considerations: Some ecosystem packages may not yet be fully compatible. Validate `@testing-library/*` queries and typings when upgrading or introducing new libs.
- Absolute imports: CRA supports baseUrl if configured in tsconfig. Currently defaults to relative imports. If you enable path aliases, ensure Jest and TS agree (tsconfig paths + jest moduleNameMapper via CRA override tools if you adopt them).
- Environment variables: Use `REACT_APP_*` variables for runtime configuration. They are inlined at build time by react-scripts. Never commit secrets.
- Performance tips: Keep components pure where possible. Defer non-critical effects to after paint. Use React devtools profiler to analyze bottlenecks.
- Debugging Jest: Run with `CI=1` to disable watch heuristics; use `--runInBand` for serial execution when isolating flaky tests.

4. Common tasks
- Add a new component with tests:
  1) Create `src/components/Widget/Widget.tsx` and its styles.
  2) Create `src/components/Widget/Widget.test.tsx` with RTL tests using role-based queries.
  3) Run `npm test` and iterate.
- Add a new env var: define `REACT_APP_FOO=bar` in `.env.local`, use `process.env.REACT_APP_FOO`. Do not prefix without REACT_APP.
- Update browserslist: adjust `package.json` → `browserslist` and verify prod build output in build/static.

Appendix: Minimal test example (for reference)
- Example test body that works in this repo’s setup:

  import { render, screen } from '@testing-library/react'
  import React from 'react'

  function Greeting() { return <h1>Hello</h1> }

  test('greets', () => {
    render(<Greeting />)
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
  })

- To try it temporarily, create a file `src/Greeting.test.tsx` with the content above, run `npm test -- --watchAll=false`, then delete the file afterward. Do not commit temporary tests.

Maintenance
- Keep dependencies aligned with CRA 5 constraints. If you intend to migrate off react-scripts (e.g., Vite), plan for Jest config changes and TS path mapping. Document the new workflow here when that happens.
