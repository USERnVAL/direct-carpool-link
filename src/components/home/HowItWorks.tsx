import { Search, MessageSquare, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Recherchez",
    description: "Trouvez un trajet en sélectionnant votre commune de départ et d'arrivée parmi les 13 communes d'Abidjan.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Contactez",
    description: "Envoyez un message au conducteur via le formulaire de contact pour convenir des détails du trajet.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Car,
    title: "Voyagez",
    description: "Retrouvez votre conducteur au point de rendez-vous convenu et partagez le trajet ensemble.",
    color: "bg-secondary/10 text-secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En 3 étapes simples, trouvez ou proposez un trajet à Abidjan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className={`w-24 h-24 mx-auto rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                <step.icon className="h-10 w-10" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
