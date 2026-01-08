import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <Layout>
      <div className="container-app py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Mentions Légales
          </h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Éditeur du site</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Le site CovoitAbidjan est une plateforme de mise en relation entre conducteurs et passagers pour le covoiturage à Abidjan, Côte d'Ivoire.
                </p>
                <p>
                  <strong>Siège social :</strong> Abidjan, Côte d'Ivoire<br />
                  <strong>Contact :</strong> contact@covoitabidjan.ci
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hébergement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Le site est hébergé par un prestataire technique garantissant la sécurité et la disponibilité des services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nature du service</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p className="font-semibold text-foreground">
                  ⚠️ CovoitAbidjan est uniquement une plateforme de mise en relation.
                </p>
                <p>
                  Nous ne sommes pas partie prenante aux accords conclus entre conducteurs et passagers. Nous ne garantissons pas :
                </p>
                <ul>
                  <li>La réalisation effective des trajets</li>
                  <li>La ponctualité ou la qualité du service</li>
                  <li>Le comportement des utilisateurs</li>
                  <li>L'état des véhicules</li>
                </ul>
                <p>
                  Chaque utilisateur est responsable de vérifier les conditions de transport et de s'assurer de la légalité de ses actions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  CovoitAbidjan décline toute responsabilité en cas de :
                </p>
                <ul>
                  <li>Litige entre utilisateurs</li>
                  <li>Accident ou incident survenu lors d'un trajet</li>
                  <li>Non-respect des engagements par un utilisateur</li>
                  <li>Informations erronées publiées par les utilisateurs</li>
                </ul>
                <p>
                  Les utilisateurs sont seuls responsables de leurs interactions et des accords conclus via la plateforme.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  L'ensemble du contenu du site (textes, images, logos, design) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
