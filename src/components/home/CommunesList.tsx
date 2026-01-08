import { Link } from "react-router-dom";
import { COMMUNES_ABIDJAN } from "@/lib/communes";
import { MapPin } from "lucide-react";

const CommunesList = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Toutes les communes d'Abidjan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez des trajets dans toutes les communes de la capitale économique
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {COMMUNES_ABIDJAN.map((commune, index) => (
            <Link
              key={commune}
              to={`/rechercher?depart=${commune}`}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-card border hover:border-primary/30 hover:shadow-card transition-all duration-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {commune}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunesList;
