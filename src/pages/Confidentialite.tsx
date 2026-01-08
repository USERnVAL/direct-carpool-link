import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Confidentialite = () => {
  return (
    <Layout>
      <div className="container-app py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Politique de Confidentialité
          </h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Collecte des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  CovoitAbidjan collecte les données personnelles suivantes lors de votre inscription :
                </p>
                <ul>
                  <li>Nom et prénom</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations relatives aux trajets publiés</li>
                </ul>
                <p>
                  Ces données sont nécessaires au fonctionnement du service de mise en relation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilisation des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul>
                  <li>Créer et gérer votre compte utilisateur</li>
                  <li>Permettre la mise en relation entre conducteurs et passagers</li>
                  <li>Assurer le bon fonctionnement de la plateforme</li>
                  <li>Vous contacter en cas de besoin (support, notifications importantes)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protection des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="font-semibold text-foreground">
                  🔒 Votre numéro de téléphone n'est jamais affiché publiquement.
                </p>
                <p>
                  Les passagers contactent les conducteurs via un formulaire de contact sécurisé. Le conducteur reçoit les coordonnées du passager uniquement via message privé.
                </p>
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conservation des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Vos données sont conservées tant que votre compte est actif. Vous pouvez demander la suppression de vos données à tout moment en nous contactant.
                </p>
                <p>
                  Les trajets expirés peuvent être conservés à des fins statistiques sous forme anonymisée.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vos droits</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Conformément à la réglementation applicable, vous disposez des droits suivants :
                </p>
                <ul>
                  <li><strong>Droit d'accès :</strong> consulter vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> corriger vos données</li>
                  <li><strong>Droit de suppression :</strong> demander la suppression de vos données</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à : contact@covoitabidjan.ci
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Le site utilise des cookies techniques essentiels au fonctionnement du service (session utilisateur). Aucun cookie publicitaire n'est utilisé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Confidentialite;
