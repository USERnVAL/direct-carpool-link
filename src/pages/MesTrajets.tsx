import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Car,
  MapPin,
  Calendar,
  Users,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { JOURS_SEMAINE } from "@/lib/communes";

interface Trajet {
  id: string;
  depart: string;
  arrivee: string;
  zone1: string | null;
  zone2: string | null;
  zone3: string | null;
  jours: string[];
  places_disponibles: number;
  prix: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

const MesTrajets = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/connexion");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTrajets();
    }
  }, [user]);

  const fetchTrajets = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("trajets")
        .select("*")
        .eq("conducteur_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTrajets(data as Trajet[]);
    } catch (error) {
      console.error("Error fetching trajets:", error);
      toast.error("Erreur lors du chargement des trajets");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTrajet = async (trajetId: string) => {
    try {
      const { error } = await supabase
        .from("trajets")
        .delete()
        .eq("id", trajetId);

      if (error) throw error;

      setTrajets((prev) => prev.filter((t) => t.id !== trajetId));
      toast.success("Trajet supprimé");
    } catch (error) {
      console.error("Error deleting trajet:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const formatJours = (jours: string[]) => {
    return jours
      .map((j) => JOURS_SEMAINE.find((jour) => jour.id === j)?.label)
      .filter(Boolean);
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="container-app py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 py-8 md:py-12">
        <div className="container-app">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Mes trajets
              </h1>
              <p className="text-muted-foreground">
                Gérez vos trajets publiés
              </p>
            </div>
            <Link to="/publier">
              <Button variant="gradient">
                <Plus className="h-4 w-4" />
                Nouveau trajet
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-app py-8">
        {trajets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trajets.map((trajet) => (
              <Card key={trajet.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-semibold">{trajet.depart}</span>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{trajet.arrivee}</span>
                      <div className="w-3 h-3 rounded-full bg-accent" />
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Supprimer ce trajet ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. Le trajet sera
                            définitivement supprimé.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTrajet(trajet.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Zones de passage */}
                  {(trajet.zone1 || trajet.zone2 || trajet.zone3) && (
                    <div className="flex flex-wrap gap-1">
                      {[trajet.zone1, trajet.zone2, trajet.zone3]
                        .filter(Boolean)
                        .map((zone) => (
                          <Badge key={zone} variant="outline" className="text-xs">
                            {zone}
                          </Badge>
                        ))}
                    </div>
                  )}

                  {/* Jours */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {formatJours(trajet.jours).map((jour) => (
                        <Badge key={jour} variant="secondary" className="text-xs">
                          {jour}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Prix et places */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {trajet.places_disponibles} places
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {trajet.prix.toLocaleString()} FCFA
                    </div>
                  </div>

                  {trajet.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {trajet.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun trajet publié
            </h3>
            <p className="text-muted-foreground mb-6">
              Commencez par publier votre premier trajet
            </p>
            <Link to="/publier">
              <Button variant="gradient">
                <Plus className="h-4 w-4" />
                Publier un trajet
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MesTrajets;
