export default function PrivacyPolicy() {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10 pb-16 font-sans leading-relaxed break-words">
        <h1 className="mb-2 text-xl">Privacy Policy</h1>
  
        <p className="mb-6 text-sm text-[var(--retro-muted)]">
          <strong>Last updated:</strong> 27 July 2026
          <br />
          <strong>Operator:</strong> Meryem Ünüvar
          <br />
          <strong>Contact:</strong>{" "}
          <a
            className="text-[var(--retro-cyan)] underline"
            href="mailto:meryem9907@googlemail.com"
          >
            meryem9907@googlemail.com
          </a>
          <br />
          <strong>Website:</strong>{" "}
          <a
            className="break-all text-[var(--retro-cyan)] underline"
            href="https://about-me-with-ai-chatbot.onrender.com/"
          >
            https://about-me-with-ai-chatbot.onrender.com/
          </a>
        </p>
  
        <p className="mb-4">
          This privacy policy explains how personal data is processed when you
          visit this portfolio website and use the AI chatbot.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          1. Who is responsible?
        </h2>
        <p className="mb-2">I am the controller of this website:</p>
        <p className="mb-4">
          <strong>Meryem Ünüvar</strong>
          <br />
          Email:{" "}
          <a
            className="text-[var(--retro-cyan)] underline"
            href="mailto:meryem9907@googlemail.com"
          >
            meryem9907@googlemail.com
          </a>
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          2. What this site does
        </h2>
        <p className="mb-2">
          This is a personal portfolio for recruiters and visitors. It presents
          information about my background and includes an optional AI chatbot that
          answers questions about my profile using my own knowledge base.
        </p>
        <p className="mb-4">
          You do <strong>not</strong> need an account to use this site.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          3. What data is processed?
        </h2>
  
        <h3 className="mt-5 mb-2 text-sm">3.1 Server and hosting data</h3>
        <p className="mb-2">
          When you visit the site, the hosting provider may automatically process
          technical data that is typically required to deliver the website, for
          example:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>IP address</li>
          <li>Date and time of the request</li>
          <li>Browser type / user agent</li>
          <li>Referrer URL</li>
          <li>Requested pages / status codes</li>
        </ul>
        <p className="mb-4">
          <strong>Purpose:</strong> To operate, secure, and maintain the website.
          <br />
          <strong>Legal basis (GDPR):</strong> Art. 6(1)(f) — legitimate interest
          in providing a secure, functional website.
          <br />
          <strong>Hosting:</strong> The site and/or API may be hosted by Render.
          Their privacy policy applies to their infrastructure:{" "}
          <a
            className="break-all text-[var(--retro-cyan)] underline"
            href="https://render.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://render.com/privacy
          </a>
          .
        </p>
  
        <h3 className="mt-5 mb-2 text-sm">3.2 Chatbot messages</h3>
        <p className="mb-2">
          If you use the chatbot, the text you enter (your prompt) is sent to my
          backend API and then to Google’s Gemini API to generate a reply.
        </p>
        <p className="mb-2">Processed data may include:</p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>The content of your chat messages / questions</li>
          <li>Temporary technical request data needed to process the stream</li>
        </ul>
        <p className="mb-2">
          <strong>Purpose:</strong> To answer questions about my professional
          profile.
          <br />
          <strong>Legal basis (GDPR):</strong> Art. 6(1)(a) — consent (you choose
          to send a message); and/or Art. 6(1)(f) — legitimate interest in
          offering an interactive portfolio feature.
        </p>
        <p className="mb-4">
          <strong>Important:</strong> Please do <strong>not</strong> enter
          sensitive personal data (e.g. health data, passwords, ID numbers,
          confidential company information).
        </p>
  
        <h3 className="mt-5 mb-2 text-sm">3.3 Local storage in your browser</h3>
        <p className="mb-2">
          The site may store data locally in your browser (
          <code>localStorage</code>), including:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>
            Recent chat messages and draft input (<code>chat_state_v1</code>)
          </li>
          <li>Theme preference (light/dark)</li>
        </ul>
        <p className="mb-2">
          This data stays on <strong>your device</strong> and is not uploaded as a
          separate profile. Clearing site data in your browser removes it.
        </p>
        <p className="mb-4">
          <strong>Purpose:</strong> Convenience (keep chat/theme between visits).
          <br />
          <strong>Legal basis (GDPR):</strong> Art. 6(1)(f) — legitimate interest
          in a better user experience; theme preference may also be based on Art.
          6(1)(a) where treated as a non-essential preference.
        </p>
  
        <h3 className="mt-5 mb-2 text-sm">
          3.4 No tracking cookies / analytics (current setup)
        </h3>
        <p className="mb-4">
          This portfolio currently does <strong>not</strong> use advertising
          cookies or third-party analytics tools such as Google Analytics (to the
          best of my knowledge of the application configuration). If that changes,
          this policy will be updated.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          4. Recipients / processors
        </h2>
        <p className="mb-2">Your chatbot prompts may be processed by:</p>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border border-[var(--retro-border)] bg-[var(--retro-surface)] p-2">
                  Recipient
                </th>
                <th className="border border-[var(--retro-border)] bg-[var(--retro-surface)] p-2">
                  Role
                </th>
                <th className="border border-[var(--retro-border)] bg-[var(--retro-surface)] p-2">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--retro-border)] p-2">
                  Hosting provider (e.g. Render)
                </td>
                <td className="border border-[var(--retro-border)] p-2">
                  Hosting / infrastructure
                </td>
                <td className="border border-[var(--retro-border)] p-2">
                  Serve website and API
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--retro-border)] p-2">
                  Google (Gemini API)
                </td>
                <td className="border border-[var(--retro-border)] p-2">
                  AI model provider
                </td>
                <td className="border border-[var(--retro-border)] p-2">
                  Generate chatbot responses
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2">
          When data is sent to Google Gemini, Google’s terms and privacy policy
          apply for that processing:{" "}
          <a
            className="break-all text-[var(--retro-cyan)] underline"
            href="https://policies.google.com/privacy"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://policies.google.com/privacy
          </a>{" "}
          and Google’s generative AI / Gemini terms.
        </p>
        <p className="mb-4">
          My knowledge base used for retrieval (RAG) contains{" "}
          <strong>my own</strong> portfolio information, not visitor profiles.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          5. Transfers outside the EU/EEA
        </h2>
        <p className="mb-4">
          Depending on the hosting and AI provider, data may be processed on
          servers outside the EU/EEA (for example in the United States). Where
          required, such transfers rely on appropriate safeguards (e.g. Standard
          Contractual Clauses) provided by those services.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          6. Retention
        </h2>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>
            <strong>Hosting/server logs:</strong> according to the host’s
            retention settings / short technical necessity
          </li>
          <li>
            <strong>Chat prompts on the server:</strong> processed to generate a
            response; I do not intentionally operate a long-term visitor chat
            archive in the application
          </li>
          <li>
            <strong>localStorage:</strong> until you clear it or remove chat
            history in the UI
          </li>
        </ul>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          7. Your rights (GDPR / comparable laws)
        </h2>
        <p className="mb-2">
          If applicable under GDPR or similar laws, you may have the right to:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5">
          <li>Access your personal data</li>
          <li>Rectification</li>
          <li>Erasure</li>
          <li>Restriction of processing</li>
          <li>Data portability</li>
          <li>Object to processing based on legitimate interests</li>
          <li>
            Withdraw consent at any time (without affecting prior lawful
            processing)
          </li>
          <li>Lodge a complaint with a supervisory authority</li>
        </ul>
        <p className="mb-2">
          To exercise these rights, contact:{" "}
          <a
            className="text-[var(--retro-cyan)] underline"
            href="mailto:meryem9907@googlemail.com"
          >
            meryem9907@googlemail.com
          </a>
        </p>
        <p className="mb-4">
          Because most chatbot use does not create a registered user account,
          please describe the request clearly (e.g. time, approximate message
          content). Data held only in your browser can be deleted by clearing
          local storage / site data.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          8. No obligation to provide data
        </h2>
        <p className="mb-4">
          You can browse the portfolio without using the chatbot. Using the
          chatbot is optional. If you do not send messages, no chat content is
          transmitted for AI processing.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          9. Children
        </h2>
        <p className="mb-4">
          This site is intended for professional visitors (e.g. recruiters) and
          adults. It is not directed at children.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          10. Changes
        </h2>
        <p className="mb-4">
          I may update this privacy policy when the website or processing
          practices change. The “Last updated” date will be revised accordingly.
        </p>
  
        <h2 className="mt-8 mb-3 border-t border-[var(--retro-border)] pt-4 text-base">
          11. Contact
        </h2>
        <p className="mb-4">
          Questions about privacy:
          <br />
          <strong>Meryem Ünüvar</strong>
          <br />
          Email:{" "}
          <a
            className="text-[var(--retro-cyan)] underline"
            href="mailto:meryem9907@googlemail.com"
          >
            meryem9907@googlemail.com
          </a>
        </p>
  
        <p className="mt-10 border-t border-[var(--retro-border)] pt-4 text-sm text-[var(--retro-muted)]">
          This is a practical template for a personal portfolio, not formal legal
          advice.
        </p>
      </main>
    );
  }