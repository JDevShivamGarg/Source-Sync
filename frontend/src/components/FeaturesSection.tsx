import { Zap, Target, BookOpen, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Beyond Word-for-Word",
    description: "Our AI understands context, not just exact matches. It finds corresponding scenes even when dialogue and descriptions differ significantly between formats."
  },
  {
    icon: Target,
    title: "Thematic Grouping", 
    description: "Automatically organizes missing content by themes like 'Character Development,' 'World Building,' or 'Political Intrigue' for easy understanding."
  },
  {
    icon: BookOpen,
    title: "Uncover Lost Arcs",
    description: "Identifies entire storylines and character arcs that were cut, explaining their significance to the overall narrative structure."
  },
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Uses advanced semantic analysis to understand narrative flow and find connections that traditional text comparison tools would miss."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 gradient-hero">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Advanced AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our intelligent analysis goes far beyond simple text comparison, 
            understanding narrative structure and thematic connections.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 gradient-card rounded-2xl shadow-card border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-primary"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;