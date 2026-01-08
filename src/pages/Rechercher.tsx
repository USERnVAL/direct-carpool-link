import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import TripCard from "@/components/trips/TripCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { COMMUNES_ABIDJAN, JOURS_SEMAINE } from "@/lib/communes";
import { MapPin, Search, Filter, X } from "lucide-react";

// Mock data for demonstration
const MOCK_TRIPS = [
  {
    id: "1",
    depart: "Cocody",
    arrivee: "Plateau",
    zonesPassage: ["Riviera", "Marcory"],
    jours: ["lundi", "mardi", "mercredi", "jeudi", "vendredi"],
    places: 3,
    prix: 1500,
    description: "Départ à 7h30 de Cocody Riviera 2. Trajet régulier pour le travail.",
    conducteur: { nom: "Kouassi", prenom: "Jean" },
    datePublication: "2024-01-15",
  },
  {
    id: "2",
    depart: "Yopougon",
    arrivee: "Cocody",
    zonesPassage: ["Adjamé", "Plateau"],
    jours: ["lundi", "mercredi", "vendredi"],
    places: 2,
    prix: 2000,
    description: "Trajet confortable, climatisation. Flexibilité sur l'heure de départ.",
    conducteur: { nom: "Traoré", prenom: "Marie" },
    datePublication: "2024-01-14",
  },
  {
    id: "3",
    depart: "Abobo",
    arrivee: "Marcory",
    zonesPassage: ["Adjamé", "Plateau"],
    jours: ["mardi", "jeudi", "samedi"],
    places: 4,
    prix: 1800,
    conducteur: { nom: "Diallo", prenom: "Amadou" },
    datePublication: "2024-01-13",
  },
];

const Rechercher = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [depart, setDepart] = useState(searchParams.get("depart") || "_all");
  const [arrivee, setArrivee] = useState(searchParams.get("arrivee") || "_all");
  const [joursSelectionnes, setJoursSelectionnes] = useState<string[]>([]);

  const filteredTrips = useMemo(() => {
    return MOCK_TRIPS.filter((trip) => {
      if (depart !== "_all" && trip.depart !== depart) return false;
      if (arrivee !== "_all" && trip.arrivee !== arrivee) return false;
      if (joursSelectionnes.length > 0) {
        const hasMatchingDay = joursSelectionnes.some((jour) =>
          trip.jours.includes(jour)
        );
        if (!hasMatchingDay) return false;
      }
      return true;
    });
  }, [depart, arrivee, joursSelectionnes]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (depart !== "_all") params.set("depart", depart);
    if (arrivee !== "_all") params.set("arrivee", arrivee);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setDepart("_all");
    setArrivee("_all");
    setJoursSelectionnes([]);
    setSearchParams({});
  };

  const toggleJour = (jour: string) => {
    setJoursSelectionnes((prev) =>
      prev.includes(jour) ? prev.filter((j) => j !== jour) : [...prev, jour]
    );
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-8 md:py-12">
        <div className="container-app">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Rechercher un trajet
          </h1>
          <p className="text-muted-foreground">
            Trouvez le trajet idéal parmi nos offres
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Search filters */}
        <div className="bg-card rounded-xl border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Départ
              </label>
              <Select value={depart} onValueChange={setDepart}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Toutes les communes" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="_all">Toutes les communes</SelectItem>
                  {COMMUNES_ABIDJAN.map((commune) => (
                    <SelectItem key={commune} value={commune}>
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                Arrivée
              </label>
              <Select value={arrivee} onValueChange={setArrivee}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Toutes les communes" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="_all">Toutes les communes</SelectItem>
                  {COMMUNES_ABIDJAN.map((commune) => (
                    <SelectItem key={commune} value={commune}>
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2 md:col-span-2">
              <Button onClick={handleSearch} variant="gradient" className="flex-1 md:flex-none">
                <Search className="h-4 w-4" />
                Rechercher
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>
              {(depart !== "_all" || arrivee !== "_all" || joursSelectionnes.length > 0) && (
                <Button variant="ghost" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                  Effacer
                </Button>
              )}
            </div>
          </div>

          {/* Jours filter */}
          <div className={`mt-6 pt-6 border-t ${showFilters ? "block" : "hidden md:block"}`}>
            <label className="text-sm font-medium mb-3 block">Jours de trajet</label>
            <div className="flex flex-wrap gap-3">
              {JOURS_SEMAINE.map((jour) => (
                <label
                  key={jour.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={joursSelectionnes.includes(jour.id)}
                    onCheckedChange={() => toggleJour(jour.id)}
                  />
                  <span className="text-sm">{jour.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredTrips.length}</span>{" "}
            trajet{filteredTrips.length > 1 ? "s" : ""} trouvé{filteredTrips.length > 1 ? "s" : ""}
          </p>
        </div>

        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun trajet trouvé
            </h3>
            <p className="text-muted-foreground mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Effacer les filtres
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rechercher;
