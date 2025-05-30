import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-foreground pt-4">1. Introduction</h2>
          <p>[TODO: Insert Introduction - Briefly explain what PromptCraft Pro is and the purpose of this policy.]</p>
          <p>Welcome to PromptCraft Pro! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">2. Information We Collect</h2>
          <p>[TODO: Specify types of data collected, e.g., Personally Identifiable Information (PII) like email if auth is used, Non-PII like usage data, device info. Be specific about data collected for prompt generation and favorites if stored server-side in future.]</p>
          <p>Currently, PromptCraft Pro primarily stores data locally on your device (e.g., favorite prompts, locally managed prompt catalog). If you use the AI Prompt Generation feature, your requests are sent to our AI provider (Google Gemini) for processing.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">3. How We Use Your Information</h2>
          <p>[TODO: Explain the purpose of collecting data, e.g., to provide and improve the service, personalize experience, for analytics, AI model interaction.]</p>
          <p>We use the information we collect to: provide and maintain the app; improve user experience; process your requests for prompt generation; understand usage patterns for future development.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">4. Sharing Your Information</h2>
          <p>[TODO: Detail if and how data is shared with third parties, e.g., AI service providers, analytics. Mention affiliate links if applicable.]</p>
          <p>We do not sell your personal information. Requests to the AI Prompt Generation feature are processed by Google Gemini, subject to their privacy policies. The app may contain affiliate links; clicking these may result in us earning a commission, but does not involve sharing your personal data from our app with these affiliates.</p>
          
          <h2 className="text-xl font-semibold text-foreground pt-4">5. Data Storage and Security</h2>
          <p>[TODO: Explain where data is stored (local, cloud) and security measures taken.]</p>
          <p>Prompt data and favorites are stored locally in your browser's storage. We implement reasonable security measures to protect your information, though no system is impenetrable.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">6. Your Rights (GDPR/CCPA)</h2>
          <p>[TODO: Outline user rights, e.g., access, rectification, erasure, opt-out. Provide contact info for exercising these rights.]</p>
          <p>Depending on your jurisdiction, you may have rights such as access, correction, or deletion of your data. Since most data is local, you can manage it directly. For any queries, contact us at [TODO: Your Contact Email].</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">7. Children's Privacy</h2>
          <p>[TODO: State policy regarding children, e.g., not intended for users under 13/16.]</p>
          <p>PromptCraft Pro is not intended for children under the age of 13 (or 16 in some jurisdictions). We do not knowingly collect personal information from children.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">8. Changes to This Privacy Policy</h2>
          <p>[TODO: Explain how updates to the policy will be communicated.]</p>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: [TODO: Your Contact Email / Support Link]</p>
        </CardContent>
      </Card>
    </div>
  );
}
