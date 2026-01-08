import { Link } from "react-router-dom";
import { Car } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">
                CovoitAbidjan
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Plateforme de mise en relation entre conducteurs et passagers à Abidjan.
              Partagez vos trajets, économisez ensemble.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              ⚠️ CovoitAbidjan est uniquement un intermédiaire de mise en relation.
              Nous ne sommes pas responsables des trajets effectués.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/rechercher" className="text-muted-foreground hover:text-primary transition-colors">
                  Rechercher un trajet
                </Link>
              </li>
              <li>
                <Link to="/publier" className="text-muted-foreground hover:text-primary transition-colors">
                  Publier un trajet
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CovoitAbidjan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
