import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { JOURS_SEMAINE } from "@/lib/communes";
import { toast } from "sonner";

// Mock data
const MOCK_TRIP = {
  id: "1",
  depart: "Cocody",
  arrivee: "Plateau",
  zonesPassage: ["Riviera", "Marcory"],
  jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
  places: 3,
  prix: 1500,
  description:
    "Départ à 7h30 de Cocody Riviera 2. Trajet régulier pour le travail. Véhicule climatisé et confortable. Possibilité de déposer en cours de route.",
  conducteur: { nom: "Kouassi", prenom: "Jean" },
  datePublication: "2024-01-15",
};

const TrajetDetail = () => {
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    message: "",
  });

  // In real app, fetch trip by id
  const trip = MOCK_TRIP;

  const joursLabels = trip.jours
    .map((jour) => JOURS_SEMAINE.find((j) => j.id === jour)?.label)
    .filter(Boolean);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.telephone || !formData.message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Validate phone number (simple validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.telephone.replace(/\s/g, ""))) {
      toast.error("Numéro de téléphone invalide");
      return;
    }

    // In real app, send message to backend
    console.log("Message sent:", { tripId: id, ...formData });
    setMessageSent(true);
    toast.success("Message envoyé au conducteur !");
  };

  return (
    <Layout>
      <div className="container-app py-8">
        {/* Back button */}
        <Link to="/rechercher">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux résultats
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip info card */}
            <Card>
              <CardContent className="p-6">
                {/* Route header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      Départ
                    </div>
                    <div className="text-2xl font-bold text-foreground">{trip.depart}</div>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <div className="w-12 h-0.5 bg-border mb-1" />
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div className="w-12 h-0.5 bg-border mt-1" />
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 justify-end">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      Arrivée
                    </div>
                    <div className="text-2xl font-bold text-foreground">{trip.arrivee}</div>
                  </div>
                </div>

                {/* Zones de passage */}
                {trip.zonesPassage && trip.zonesPassage.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Zones de passage
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trip.zonesPassage.map((zone) => (
                        <Badge key={zone} variant="outline">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Days */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Jours de trajet
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {joursLabels.map((jour) => (
                      <Badge key={jour} variant="secondary">
                        {jour}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {trip.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Description
                    </h3>
                    <p className="text-foreground">{trip.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact form */}
            {!messageSent ? (
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => setShowContactForm(!showContactForm)}>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Contacter le conducteur
                  </CardTitle>
                </CardHeader>
                {showContactForm && (
                  <CardContent>
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom">Votre nom *</Label>
                          <Input
                            id="nom"
                            placeholder="Entrez votre nom"
                            value={formData.nom}
                            onChange={(e) =>
                              setFormData({ ...formData, nom: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telephone">Votre téléphone *</Label>
                          <Input
                            id="telephone"
                            placeholder="0X XX XX XX XX"
                            value={formData.telephone}
                            onChange={(e) =>
                              setFormData({ ...formData, telephone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Votre message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Bonjour, je suis intéressé par votre trajet..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>
                      <Button type="submit" variant="gradient" className="w-full md:w-auto">
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                )}
              </Card>
            ) : (
              <Card className="bg-accent/10 border-accent">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-muted-foreground">
                    Le conducteur recevra votre message et pourra vous contacter directement.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {trip.prix.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">FCFA / place</div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-foreground">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{trip.places} places disponibles</span>
                </div>
              </CardContent>
            </Card>

            {/* Driver card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conducteur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xl font-bold">
                    {trip.conducteur.prenom[0]}{trip.conducteur.nom[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {trip.conducteur.prenom} {trip.conducteur.nom[0]}.
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Membre depuis {new Date(trip.datePublication).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            {!showContactForm && !messageSent && (
              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => setShowContactForm(true)}
              >
                <MessageSquare className="h-5 w-5" />
                Contacter le conducteur
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrajetDetail;
