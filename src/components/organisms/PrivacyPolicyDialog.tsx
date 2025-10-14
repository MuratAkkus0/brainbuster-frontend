import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface PrivacyPolicyDialogProps {
  onAccept: () => void;
}

export const PrivacyPolicyDialog = ({
  onAccept,
}: PrivacyPolicyDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <Shield className="h-5 w-5 text-primary" />
          Privacy Policy & Data Protection
        </DialogTitle>
        <DialogDescription>
          Please read and accept our privacy policy to continue
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="h-[400px] w-full pr-4">
        <div className="space-y-4 text-sm text-muted-foreground">
          <section>
            <h3 className="font-semibold text-foreground mb-2">
              1. Data Collection and Processing
            </h3>
            <p>
              We collect and process your personal data in accordance with the
              General Data Protection Regulation (GDPR) and German data
              protection laws (BDSG). The data we collect includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Username and password (encrypted)</li>
              <li>Quiz performance data and statistics</li>
              <li>Secret question and answer for account recovery</li>
              <li>IP address and access logs for security purposes</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              2. Purpose of Data Processing
            </h3>
            <p>Your personal data is processed for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Account creation and authentication</li>
              <li>Providing personalized quiz experiences</li>
              <li>Tracking your progress and high scores</li>
              <li>Account security and fraud prevention</li>
              <li>Improving our services and user experience</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              3. Legal Basis (GDPR Article 6)
            </h3>
            <p>
              The legal basis for processing your data is your consent (Art. 6
              para. 1 lit. a GDPR) and the performance of a contract (Art. 6
              para. 1 lit. b GDPR).
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              4. Data Storage and Security
            </h3>
            <p>
              Your data is stored on secure servers located in Germany. We
              implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Passwords are encrypted using industry-standard algorithms</li>
              <li>Data transmission is secured via HTTPS/TLS</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              5. Data Retention
            </h3>
            <p>
              We retain your personal data only as long as necessary for the
              purposes outlined above or as required by law. You may request
              deletion of your account and associated data at any time.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              6. Your Rights under GDPR
            </h3>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Right to Access (Art. 15 GDPR):</strong> Request a copy
                of your personal data
              </li>
              <li>
                <strong>Right to Rectification (Art. 16 GDPR):</strong> Correct
                inaccurate personal data
              </li>
              <li>
                <strong>Right to Erasure (Art. 17 GDPR):</strong> Request
                deletion of your personal data
              </li>
              <li>
                <strong>Right to Restriction (Art. 18 GDPR):</strong> Request
                restriction of processing
              </li>
              <li>
                <strong>Right to Data Portability (Art. 20 GDPR):</strong>{" "}
                Receive your data in a structured format
              </li>
              <li>
                <strong>Right to Object (Art. 21 GDPR):</strong> Object to
                processing of your personal data
              </li>
              <li>
                <strong>Right to Withdraw Consent (Art. 7 GDPR):</strong>{" "}
                Withdraw your consent at any time
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              7. Data Sharing
            </h3>
            <p>
              We do not sell, trade, or transfer your personal data to third
              parties. Your data may only be shared:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>With your explicit consent</li>
              <li>As required by law or legal process</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">8. Cookies</h3>
            <p>
              We use essential cookies for authentication and session
              management. These cookies are necessary for the proper functioning
              of our service.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              9. Contact Information
            </h3>
            <p>
              For any questions or to exercise your rights, please contact our
              Data Protection Officer:
            </p>
            <div className="mt-2 p-3 bg-secondary rounded-md">
              <p>Email: privacy@brainbuster.com</p>
              <p>Address: BrainBuster GmbH, Musterstraße 123, 10115 Berlin, Germany</p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              10. Right to Lodge a Complaint
            </h3>
            <p>
              You have the right to lodge a complaint with a supervisory
              authority if you believe your data protection rights have been
              violated.
            </p>
            <div className="mt-2 p-3 bg-secondary rounded-md">
              <p className="font-medium">
                German Federal Commissioner for Data Protection:
              </p>
              <p>Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit</p>
              <p>Graurheindorfer Str. 153, 53117 Bonn, Germany</p>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-2">
              11. Changes to Privacy Policy
            </h3>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any material changes via email or through our
              platform.
            </p>
          </section>

          <section className="mt-4 pt-4 border-t">
            <p className="text-xs italic">
              Last updated: {new Date().toLocaleDateString("en-US")}
            </p>
            <p className="text-xs italic mt-1">
              By clicking "I Accept", you acknowledge that you have read,
              understood, and agree to this Privacy Policy and consent to the
              processing of your personal data as described above.
            </p>
          </section>
        </div>
      </ScrollArea>

      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={onAccept} className="w-full sm:w-auto">
          I Accept
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

