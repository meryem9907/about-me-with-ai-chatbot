import LegalEnglishNotice from "@/components/legal/legal-english-notice";
import TermsOfUse from "@/components/legal/terms-of-use";

export default async function TermsOfUsePage() {

  return (
    <>
      <div className="pt-16">
        <LegalEnglishNotice />
      </div>
      <TermsOfUse />
    </>
  );
}
