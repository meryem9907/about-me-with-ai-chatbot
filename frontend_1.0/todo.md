- [x] localization — next-intl, locales en/de/tr, URL prefix `/en/`
- [x] wcag — skip link, menu focus trap, labels, live region, reduced motion, axe+checklist
- [x] mobility — responsive type, linked CTAs, md+ top links + hamburger
- [x] error management — error/not-found pages, inline+toast, 429 cooldown+retry
- [x] tests — Vitest + Playwright + GitHub Action
- [x] dark light — theme tokens + light/dark/system toggle
- [x] chat save — opt-in `chat_state_v1`, no draft, clear button; privacy updated

- [x] detect performance issues — convert imprint/legal/projects toward RSC (T6-B)
- [x] detect edge cases — matrix in `docs/edge-cases.md` + chat harden (T7-A)
- [x] menu buttons in hamburger dont get dark — dark surface + color-scheme on drawer controls
- [x] bullet points not visually shown in chat message — typography prose (T2-A)
- [x] chat ass antwortet nicht in gefragter sprache — locale query + Accept-Language (T1-B) + POST (N1-A); backend honors locale
- [x] projects in mobile view not centered — place-items-center (T4-A)
- [x] locale change script-tag warning — theme script moved to root layout (T5-A)

Also done this pass: N2-C optional repo, N3-A/N10-A typewriter, N4-B bubbles, N5/N6 legal, N8-A stop, N9-A descriptions/tags, N11–N13, N15-C tests.

- [ ] review whole project manually and automatically
- [ ] commit and deploy