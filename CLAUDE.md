# App Factory: autopilot rules

The owner of this repository builds apps by describing them in plain language. They do not
want to deal with tooling, terminals, branches, builds or deployments. Everything between
their prompt and a working app on the web and on their Android phone is your job.

@AGENTS.md

## Talking to the owner

- Reply in the language they write in (usually French).
- Keep replies short and in plain words. No jargon, no logs, no code unless they ask.
- Do not use dashes as punctuation in replies (compound words like "peut-être" are fine).
- Ask questions only when a wrong guess would waste real work (see "Understand" below).
  Otherwise pick a sensible default, build, and mention the choice in one line.

## Stack (do not change it)

- Expo with Expo Router and TypeScript (strict). One codebase for Android and the web.
- Routes live in `src/app/`, everything else in `src/components`, `src/features`, `src/hooks`,
  `src/lib`. This layout wins over any other layout shown in a skill.
- iOS is not a target. Never create or edit `android/` or `ios/` by hand.
- Add packages with `npx expo install <package>`.
- No backend by default. When the app needs accounts, sync between devices or shared data,
  propose Supabase: the owner creates a free project and pastes the project URL and the
  public anon key, which go in `src/lib/config.ts`. Row Level Security must be enabled on
  every table. Never commit a service role key or any other secret.

## How to handle each request

1. **Understand.**
   - Small change (text, colors, a screen tweak, a bug): just do it.
   - New app or big feature: if essential information is missing, ask at most 3 short
     questions in ONE message, each with a suggested default so the owner can answer "ok".
     Then write or update `docs/PRODUCT.md`: who it is for, the problem, the 3 to 5 core
     screens, what is out of scope, and acceptance criteria written as checkable sentences.
     Show a 5 line summary and wait for the owner's go ahead. This is the only gate.
2. **Plan** in thin vertical slices: one end to end path working first, then the next.
   For features touching several files, use the `planner` agent.
3. **Build.** Write tests for logic (calculations, data handling, validation) and for every
   bug fix. Pure layout tweaks do not need tests. Use the `tdd-guide` agent for logic heavy
   features. Follow the `react-native-patterns` skill; use `make-interfaces-feel-better`
   when polishing UI.
4. **Verify.** `npm run check` (typecheck, lint, tests) and `npm run build` (web export) must
   both pass before shipping. Fix failures yourself; use `build-error-resolver` if stuck.
5. **Review** non trivial changes with `code-reviewer`, plus `react-reviewer` and
   `typescript-reviewer` for `.tsx`/`.ts` changes. Add `security-reviewer` when the change
   touches login, user input sent to a server, secrets, payments or network calls.
   Fix CRITICAL and HIGH findings before shipping. Skip reviews for trivial changes.
6. **Ship.** Commit with a clear message and push straight to `main`: the owner does not
   review pull requests. Pushing to `main` deploys automatically (see below). If the push to
   `main` is rejected, push the branch, open a pull request with `gh api` (REST), and tell
   the owner it needs one click to merge.
7. **Report** in 2 to 4 lines: what changed, then the two links below, and that they update
   a few minutes after the push (the Android build takes about 15 minutes). If the owner
   asks whether it is live, check with
   `gh api "repos/OWNER/REPO/actions/runs?branch=main&per_page=4"` and fix failed runs.

## Links to give the owner

Derive OWNER and REPO from `git remote get-url origin`.

- Web app: `https://OWNER.github.io/REPO/` (OWNER in lowercase)
- Android app (APK to install on the phone):
  `https://github.com/OWNER/REPO/releases/download/android-latest/app.apk`

The first time they install the APK, Android asks them to allow installs from this source.
A newer APK installs over the previous one.

## Deployment (already set up, do not rebuild it)

- `.github/workflows/web.yml` exports the web app and publishes it on GitHub Pages.
- `.github/workflows/android.yml` builds a release APK and publishes it on the
  `android-latest` GitHub release.
- Both run on every push to `main` and can be started by hand from the Actions tab.
- The owner has no Expo account: do not use EAS (`eas build`, `eas update`) even though
  `AGENTS.md` mentions it. GitHub Actions does all the building.

## First request in a new repository

When `app.json` still says `"name": "App Factory"`, this repository has not been turned into
a real app yet. Before building the owner's first app:

1. Rename it: `name`, `slug` and `scheme` in `app.json`, `name` in `package.json`, and
   `android.package` as `com.<owner>.<slug>` (lowercase letters and digits only).
   Never change `android.package` again afterwards: Android would treat it as a new app.
2. Delete the demo screens and components the app does not need, and the
   `src/__tests__/themed-text.test.tsx` example if `ThemedText` goes away.
3. Turn on GitHub Pages for Actions, once:
   `gh api -X POST repos/OWNER/REPO/pages -f build_type=workflow`
   A 409 means it is already on. If it fails with 403 or 404, tell the owner to open the
   repository on GitHub, then Settings, Pages, and pick "GitHub Actions" as the source.

## Never

- Never put secrets, passwords or private keys in the code or in commits.
- Never delete the workflows, this file, `.claude/` or `scripts/install_pkgs.sh`.
- Never say something is deployed or working without having checked it.

## Credits

The agents in `.claude/agents/` and the skills in `.claude/skills/` come from ECC by Affaan
Mustafa (https://github.com/affaan-m/ECC, MIT license, see `.claude/ECC-LICENSE`).
