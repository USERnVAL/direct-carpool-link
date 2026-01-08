import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMMUNES_ABIDJAN } from "@/lib/communes";
import { MapPin, Search } from "lucide-react";

const SearchForm = () => {
  const navigate = useNavigate();
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (depart) params.set("depart", depart);
    if (arrivee) params.set("arrivee", arrivee);
    navigate(`/rechercher?${params.toString()}`);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container-app">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
              Où allez-vous ?
            </h2>
            
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Départ */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Départ
                  </label>
                  <Select value={depart} onValueChange={setDepart}>
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Commune de départ" />
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

                {/* Arrivée */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    Arrivée
                  </label>
                  <Select value={arrivee} onValueChange={setArrivee}>
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue placeholder="Commune d'arrivée" />
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

                {/* Submit */}
                <div className="flex items-end">
                  <Button type="submit" variant="gradient" className="w-full h-12">
                    <Search className="h-4 w-4" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
