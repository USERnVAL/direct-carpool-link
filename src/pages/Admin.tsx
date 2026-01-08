import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Users,
  Car,
  MessageSquare,
  Shield,
  Trash2,
  UserX,
  UserCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { JOURS_SEMAINE } from "@/lib/communes";

interface ProfileWithRole {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  is_active: boolean;
  created_at: string;
}

interface Trajet {
  id: string;
  depart: string;
  arrivee: string;
  jours: string[];
  places_disponibles: number;
  prix: number;
  is_active: boolean;
  created_at: string;
  conducteur_id: string;
  profiles?: {
    nom: string;
    prenom: string;
  };
}

interface ContactMessage {
  id: string;
  nom_passager: string;
  telephone_passager: string;
  message: string;
  created_at: string;
  trajets?: {
    depart: string;
    arrivee: string;
    profiles?: {
      nom: string;
      prenom: string;
    };
  };
}

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ProfileWithRole[]>([]);
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;
      setUsers(profilesData as ProfileWithRole[]);

      // Fetch all trajets
      const { data: trajetsData, error: trajetsError } = await supabase
        .from("trajets")
        .select("*")
        .order("created_at", { ascending: false });

      if (trajetsError) throw trajetsError;

      // Fetch profiles for trajets conducteurs
      const conducteurIds = [...new Set(trajetsData.map((t) => t.conducteur_id))];
      const { data: conducteurProfiles } = await supabase
        .from("profiles")
        .select("id, nom, prenom")
        .in("id", conducteurIds);

      const trajetsWithProfiles = trajetsData.map((t) => ({
        ...t,
        profiles: conducteurProfiles?.find((p) => p.id === t.conducteur_id),
      }));
      setTrajets(trajetsWithProfiles as Trajet[]);

      // Fetch all contact messages with trajet info
      const { data: messagesData, error: messagesError } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (messagesError) throw messagesError;

      // Fetch trajet info for messages
      const trajetIds = [...new Set(messagesData.map((m) => m.trajet_id))];
      const { data: trajetInfos } = await supabase
        .from("trajets")
        .select("id, depart, arrivee, conducteur_id")
        .in("id", trajetIds);

      const messagesWithTrajets = messagesData.map((m) => {
        const trajet = trajetInfos?.find((t) => t.id === m.trajet_id);
        const conducteurProfile = conducteurProfiles?.find(
          (p) => p.id === trajet?.conducteur_id
        );
        return {
          ...m,
          trajets: trajet
            ? {
                depart: trajet.depart,
                arrivee: trajet.arrivee,
                profiles: conducteurProfile,
              }
            : undefined,
        };
      });
      setMessages(messagesWithTrajets as ContactMessage[]);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: !currentStatus })
        .eq("id", userId);

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_active: !currentStatus } : u
        )
      );

      toast.success(
        currentStatus ? "Compte désactivé" : "Compte réactivé"
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Erreur lors de la modification du statut");
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatJours = (jours: string[]) => {
    return jours
      .map((j) => JOURS_SEMAINE.find((jour) => jour.id === j)?.label.slice(0, 3))
      .filter(Boolean)
      .join(", ");
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

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="bg-muted/30 py-8 md:py-12">
        <div className="container-app">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Administration
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, trajets et messages
          </p>
        </div>
      </div>

      <div className="container-app py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{users.length}</div>
                <div className="text-muted-foreground text-sm">Utilisateurs</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Car className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">{trajets.length}</div>
                <div className="text-muted-foreground text-sm">Trajets</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-secondary">
                <MessageSquare className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">{messages.length}</div>
                <div className="text-muted-foreground text-sm">Messages</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="trajets">Trajets</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Liste des utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Inscription</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">
                          {u.prenom} {u.nom}
                        </TableCell>
                        <TableCell>{u.telephone}</TableCell>
                        <TableCell>{formatDate(u.created_at)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={u.is_active ? "default" : "destructive"}
                          >
                            {u.is_active ? "Actif" : "Désactivé"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserStatus(u.id, u.is_active)}
                          >
                            {u.is_active ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trajets Tab */}
          <TabsContent value="trajets">
            <Card>
              <CardHeader>
                <CardTitle>Liste des trajets</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Itinéraire</TableHead>
                      <TableHead>Conducteur</TableHead>
                      <TableHead>Jours</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trajets.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">
                          {t.depart} → {t.arrivee}
                        </TableCell>
                        <TableCell>
                          {t.profiles?.prenom} {t.profiles?.nom}
                        </TableCell>
                        <TableCell>{formatJours(t.jours)}</TableCell>
                        <TableCell>{t.prix.toLocaleString()} FCFA</TableCell>
                        <TableCell>{formatDate(t.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
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
                                  onClick={() => deleteTrajet(t.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((m) => (
                    <Card key={m.id} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1">
                            <div className="font-medium text-foreground">
                              {m.nom_passager}
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              {m.telephone_passager} • {formatDate(m.created_at)}
                            </div>
                            <p className="text-foreground">{m.message}</p>
                          </div>
                          <div className="text-sm text-muted-foreground bg-background p-3 rounded-lg">
                            <div className="font-medium">
                              Trajet: {m.trajets?.depart} → {m.trajets?.arrivee}
                            </div>
                            <div>
                              Conducteur: {m.trajets?.profiles?.prenom}{" "}
                              {m.trajets?.profiles?.nom}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun message de contact
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
