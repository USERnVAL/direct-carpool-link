import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, ArrowRight, Clock } from "lucide-react";
import { JOURS_SEMAINE } from "@/lib/communes";

interface TripCardProps {
  id: string;
  depart: string;
  arrivee: string;
  zonesPassage?: string[];
  jours: string[];
  places: number;
  prix: number;
  description?: string;
  conducteur?: {
    nom: string;
    prenom: string;
  };
  datePublication: string;
}

const TripCard = ({
  id,
  depart,
  arrivee,
  zonesPassage,
  jours,
  places,
  prix,
  description,
  conducteur,
  datePublication,
}: TripCardProps) => {
  const joursLabels = jours
    .map((jour) => JOURS_SEMAINE.find((j) => j.id === jour)?.short)
    .filter(Boolean)
    .join(", ");

  return (
    <Card hover className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-5">
          {/* Route */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                Départ
              </div>
              <div className="font-semibold text-foreground">{depart}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 text-right">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 justify-end">
                <MapPin className="h-4 w-4 text-accent" />
                Arrivée
              </div>
              <div className="font-semibold text-foreground">{arrivee}</div>
            </div>
          </div>

          {/* Zones de passage */}
          {zonesPassage && zonesPassage.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Via:</span>
              <span className="text-foreground">{zonesPassage.join(" → ")}</span>
            </div>
          )}

          {/* Info row */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {joursLabels}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {places} place{places > 1 ? "s" : ""}
            </Badge>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-2xl font-bold text-primary">
                {prix.toLocaleString()} <span className="text-sm font-normal">FCFA</span>
              </div>
              <div className="text-xs text-muted-foreground">par place</div>
            </div>
            <Link to={`/trajet/${id}`}>
              <Button variant="gradient" size="sm">
                Voir détails
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Conducteur info */}
        {conducteur && (
          <div className="bg-muted/50 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                {conducteur.prenom[0]}
              </div>
              <span className="text-muted-foreground">
                {conducteur.prenom} {conducteur.nom[0]}.
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(datePublication).toLocaleDateString("fr-FR")}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripCard;
