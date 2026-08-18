# Locked decisions (user, 2026-08-08)

T1 Chat language:     B — locale query / Accept-Language (with POST body for prompt)
N1 Chat transport:    A — POST JSON `{ prompt }`
   History:           none
T2 Markdown lists:    A — @tailwindcss/typography prose
N4 Assistant color:   B — distinct bubble surfaces
N8 Stream cancel:     A — AbortController + Stop
N9 Projects content:  A — render description + tags
N3 Typewriter a11y:   A — live region on line-done only
N10 Intro (from order): A — production Skip
T5 Locale script:     A — theme script in root layout
N5 Nested main:       A — legal → article
N6 Legal links:       A — text-accent
T4 Projects center:   A — place-items-center (in order, default A)
N2 Ecommerce repo:    C — optional repoLink (no correct URL provided)
T6 Performance:       B — RSC for static pages
T7 Edge cases:        A — explicit matrix + fixes
N11 Env:              A — NEXT_PUBLIC_MAX_MESSAGES + .env.example
N12 Dead code:        A — cleanup + README
N13 SEO/headers:      A — robots, sitemap, OG, favicon
N15 Tests:            C — chat unit + e2e smoke expansion
S1 / N7 / T3 / N14:   skip (not in decision/order except T3 omitted from order)

Order: N2 → T1+N1 → T2+N4 → T4 → N5+N6 → N3+N10 → N8 → N9 → T5 → N11+N12 → T6/T7 → N13–N15
