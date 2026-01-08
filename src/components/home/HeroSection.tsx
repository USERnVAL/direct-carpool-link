import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Car, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container-app relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Car className="h-4 w-4" />
            Covoiturage à Abidjan
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 animate-slide-up text-balance">
            Partagez vos trajets,{" "}
            <span className="text-primary">économisez ensemble</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up text-balance" style={{ animationDelay: "100ms" }}>
            Trouvez facilement un trajet ou proposez le vôtre. 
            Connectez-vous avec des conducteurs et passagers à travers toutes les communes d'Abidjan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Link to="/rechercher">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Rechercher un trajet
              </Button>
            </Link>
            <Link to="/publier">
              <Button variant="outline" size="xl" className="w-full sm:w-auto group">
                Publier un trajet
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">13</div>
              <div className="text-sm text-muted-foreground mt-1">Communes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">Gratuit</div>
              <div className="text-sm text-muted-foreground mt-1">Sans frais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">Simple</div>
              <div className="text-sm text-muted-foreground mt-1">Et rapide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
