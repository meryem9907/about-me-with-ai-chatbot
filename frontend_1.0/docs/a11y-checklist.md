# Accessibility checklist (WCAG 2.2 AA — core flows)

Manual pass targets: home, chat, projects, menu, theme, legal.

## Keyboard & focus
- [x] Skip link reaches `#main-content`
- [x] Menu opens/closes with keyboard; Escape closes; focus returns to toggle
- [x] Focus trap holds Tab inside open menu
- [x] Theme toggle, locale select, chat send, home CTAs are reachable
- [x] Visible focus styles on interactive controls

## Names & structure
- [x] Icon-only controls have accessible names (menu, send, chevron, theme)
- [x] Chat textarea has a label; streaming status uses a live region
- [x] Page headings present (`h1` on main views)
- [x] `html[lang]` matches active locale
- [x] Typewriter announces completed lines only (not each character)
- [x] Single landmark `<main>` (legal uses `<article>`)

## Motion & contrast
- [x] `prefers-reduced-motion`: typewriter shows full line immediately
- [ ] Light and dark themes: spot-check contrast on menu + projects after design tweaks

## Automated
- [x] Playwright + axe smoke on `/en`, `/en/chat-assistant`, `/en/projects`, `/de`
