import { Upload, Brain, FileText } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Upload your anime subtitle file and the source novel text.",
    color: "primary"
  },
  {
    icon: Brain,
    title: "Analyze", 
    description: "Our AI performs a deep semantic and thematic comparison in seconds.",
    color: "secondary"
  },
  {
    icon: FileText,
    title: "Discover",
    description: "Get a detailed report of every significant scene, character moment, and mini-arc missing from the anime.",
    color: "primary"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to uncover the hidden content in your favorite stories
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5">
                    <div className="w-1/2 h-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                  </div>
                )}
                
                {/* Icon Container */}
                <div className={`
                  inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6
                  gradient-card shadow-card border border-primary/20
                  group-hover:shadow-primary transition-all duration-500 transform group-hover:scale-110
                `}>
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;