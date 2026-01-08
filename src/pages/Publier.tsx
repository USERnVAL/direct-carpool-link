import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMMUNES_ABIDJAN, JOURS_SEMAINE } from "@/lib/communes";
import { Car, MapPin, Calendar, Users, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Publier = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    depart: "",
    zone1: "",
    zone2: "",
    zone3: "",
    arrivee: "",
    jours: [] as string[],
    places: "",
    prix: "",
    description: "",
  });

  const toggleJour = (jour: string) => {
    setFormData((prev) => ({
      ...prev,
      jours: prev.jours.includes(jour)
        ? prev.jours.filter((j) => j !== jour)
        : [...prev.jours, jour],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.depart || !formData.arrivee) {
      toast.error("Veuillez sélectionner le départ et l'arrivée");
      return;
    }

    if (formData.jours.length === 0) {
      toast.error("Veuillez sélectionner au moins un jour");
      return;
    }

    if (!formData.places || parseInt(formData.places) < 1) {
      toast.error("Veuillez indiquer le nombre de places");
      return;
    }

    if (!formData.prix || parseInt(formData.prix) < 100) {
      toast.error("Veuillez indiquer un prix valide");
      return;
    }

    if (!user) {
      toast.error("Vous devez être connecté");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("trajets").insert({
        conducteur_id: user.id,
        depart: formData.depart,
        arrivee: formData.arrivee,
        zone1: formData.zone1 === "_none" ? null : formData.zone1 || null,
        zone2: formData.zone2 === "_none" ? null : formData.zone2 || null,
        zone3: formData.zone3 === "_none" ? null : formData.zone3 || null,
        jours: formData.jours,
        places_disponibles: parseInt(formData.places),
        prix: parseInt(formData.prix),
        description: formData.description || null,
      });

      if (error) throw error;

      toast.success("Trajet publié avec succès !");
      navigate("/mes-trajets");
    } catch (error) {
      console.error("Error creating trajet:", error);
      toast.error("Erreur lors de la publication");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="container-app py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container-app py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Connexion requise
            </h1>
            <p className="text-muted-foreground mb-8">
              Pour publier un trajet, vous devez d'abord vous connecter à votre compte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/connexion">
                <Button variant="gradient" size="lg">
                  Se connecter
                </Button>
              </Link>
              <Link to="/inscription">
                <Button variant="outline" size="lg">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 py-8 md:py-12">
        <div className="container-app">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Publier un trajet
          </h1>
          <p className="text-muted-foreground">
            Partagez votre trajet avec d'autres voyageurs
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Détails du trajet
            </CardTitle>
            <CardDescription>
              Remplissez les informations de votre trajet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Itinéraire */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Itinéraire
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Commune de départ *</Label>
                    <Select
                      value={formData.depart}
                      onValueChange={(value) =>
                        setFormData({ ...formData, depart: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        {COMMUNES_ABIDJAN.map((commune) => (
                          <SelectItem key={commune} value={commune}>
                            {commune}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Commune d'arrivée *</Label>
                    <Select
                      value={formData.arrivee}
                      onValueChange={(value) =>
                        setFormData({ ...formData, arrivee: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        {COMMUNES_ABIDJAN.map((commune) => (
                          <SelectItem key={commune} value={commune}>
                            {commune}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Zones de passage (optionnel)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((num) => (
                      <Select
                        key={num}
                        value={formData[`zone${num}` as keyof typeof formData] as string}
                        onValueChange={(value) =>
                          setFormData({ ...formData, [`zone${num}`]: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Zone ${num}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-card z-50">
                          <SelectItem value="_none">Aucune</SelectItem>
                          {COMMUNES_ABIDJAN.map((commune) => (
                            <SelectItem key={commune} value={commune}>
                              {commune}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jours */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Jours de trajet *
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {JOURS_SEMAINE.map((jour) => (
                    <label
                      key={jour.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.jours.includes(jour.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <Checkbox
                        checked={formData.jours.includes(jour.id)}
                        onCheckedChange={() => toggleJour(jour.id)}
                      />
                      <span className="text-sm font-medium">{jour.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Places et prix */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Places et tarif
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre de places *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="8"
                      placeholder="Ex: 3"
                      value={formData.places}
                      onChange={(e) =>
                        setFormData({ ...formData, places: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prix par place (FCFA) *</Label>
                    <Input
                      type="number"
                      min="100"
                      step="100"
                      placeholder="Ex: 1500"
                      value={formData.prix}
                      onChange={(e) =>
                        setFormData({ ...formData, prix: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description (optionnel)</Label>
                <Textarea
                  placeholder="Précisez les détails utiles : heure de départ, point de rendez-vous, conditions particulières..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publication...
                  </>
                ) : (
                  "Publier le trajet"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Publier;
