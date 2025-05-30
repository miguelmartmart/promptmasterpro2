
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdatedDate = "30 mayo 2025"; 

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Button variant="outline" asChild className="mb-8 print:hidden">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Política de privacidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
          <p><strong>Última actualización:</strong> {lastUpdatedDate}</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">1. ¿Quién es el responsable?</h2>
            <p>Miguel Ángel Martín Martín (“nosotros”). Contacto: <a href="mailto:software.empresa.ia@gmail.com" className="text-primary hover:underline">software.empresa.ia@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">2. Qué datos recogemos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Correo electrónico</strong> (solo si inicias sesión con Google).</li>
              <li><strong>ID publicitario de Android (AAID)</strong> para medir clics en banners de afiliados.</li>
              <li><strong>Métricas de uso agregadas</strong> a través de Firebase Analytics.</li>
              <li><strong>Informes de fallos</strong> mediante Firebase Crashlytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">3. Para qué usamos tus datos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Autenticación y sincronización de favoritos.</li>
              <li>Analítica para mejorar la app (nunca vendemos datos).</li>
              <li>Mostrar anuncios de afiliados de Amazon, Shein y AliExpress.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">4. Compartición con terceros</h2>
            <p>Los datos se procesan en los servicios de Google Cloud (Firebase). No compartimos tus datos con otras empresas salvo obligación legal.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">5. Seguridad</h2>
            <p>Las comunicaciones se cifran con TLS 1.3. El acceso a la base de datos está protegido por reglas de seguridad Firebase.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">6. Tus derechos</h2>
            <p>Puedes solicitar acceso, rectificación o eliminación escribiendo a nuestro correo.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">7. Cambios</h2>
            <p>Cualquier cambio se publicará en este documento y se actualizará la fecha.</p>
          </section>

          <hr className="my-8 border-border" />

          <CardTitle className="text-3xl pt-4" lang="en">Privacy Policy (English)</CardTitle>
          
          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">1. Who is responsible?</h2>
            <p>Miguel Ángel Martín Martín (“we”, “us”). Contact: <a href="mailto:software.empresa.ia@gmail.com" className="text-primary hover:underline">software.empresa.ia@gmail.com</a></p>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">2. What data we collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Email address</strong> (only if you sign in with Google).</li>
              <li><strong>Android Advertising ID (AAID)</strong> to measure clicks on affiliate banners.</li>
              <li><strong>Aggregated usage metrics</strong> via Firebase Analytics.</li>
              <li><strong>Crash reports</strong> via Firebase Crashlytics.</li>
            </ul>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">3. Why we use your data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Authentication and synchronization of favorites.</li>
              <li>Analytics to improve the app (we never sell data).</li>
              <li>Display affiliate ads from Amazon, Shein, and AliExpress.</li>
            </ul>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">4. Sharing with third parties</h2>
            <p>Data is processed on Google Cloud services (Firebase). We do not share your data with other companies unless legally obligated.</p>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">5. Security</h2>
            <p>Communications are encrypted using TLS 1.3. Database access is protected by Firebase security rules.</p>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">6. Your rights</h2>
            <p>You can request access, rectification, or deletion by writing to our email.</p>
          </section>

          <section lang="en">
            <h2 className="text-xl font-semibold text-foreground pt-2 pb-1">7. Changes</h2>
            <p>Any changes will be published in this document, and the date will be updated.</p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
