import LegalEnglishNotice from "@/components/legal/legal-english-notice";
import PrivacyPolicy from "@/components/legal/privacy-policy";

export default async function PrivacyPolicyPage() {

  return (
    <>
      <div className="pt-16">
        <LegalEnglishNotice />
      </div>
      <PrivacyPolicy />
    </>
  );
}
