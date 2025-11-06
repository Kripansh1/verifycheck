import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Zap, 
  Globe, 
  Clock, 
  Award,
  ShieldCheck,
  Building2,
  Smile,
  Headphones
} from "lucide-react";

const WhyChooseSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "15+ Years of Experience",
      description: "Over a decade of expertise in background verification and screening services across multiple industries and global markets.",
      metric: "15+ Years"
    },
    {
      icon: Users,
      title: "Industry Expertise",
      description: "Deep understanding of compliance requirements across healthcare, finance, technology, and government sectors.",
      metric: "50+ Industries"
    },
    {
      icon: Zap,
      title: "Advanced Technology",
      description: "Cutting-edge AI-powered verification systems combined with human expertise for unmatched accuracy and efficiency.",
      metric: "99.9% Accuracy"
    },
    {
      icon: Globe,
      title: "Comprehensive Coverage",
      description: "Global verification capabilities with access to databases and institutions in over 190 countries worldwide.",
      metric: "190+ Countries"
    },
    {
      icon: Clock,
      title: "Quick Turnaround Time",
      description: "Standard verification completed within 5 business days with expedited services available for urgent requirements.",
      metric: "5-Day Standard"
    },
    {
      icon: Award,
      title: "Certified & Compliant",
      description: "ISO 27001 certified with full GDPR compliance and adherence to international data protection standards.",
      metric: "ISO Certified"
    }
  ];

  return (
    <section id="why-choose" className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]">
      {/* Decorative blobs to match other sections */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Verify Check</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            Trusted by thousands of organizations worldwide for reliable, accurate, 
            and comprehensive verification services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group animate-fade-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="px-3 py-1 rounded-full border border-border/60 bg-background/60 text-sm font-semibold text-foreground shadow-sm">
                      {feature.metric}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-xl p-10 overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Trusted by Leading Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <div className="text-3xl font-bold text-foreground">10K+</div>
              </div>
              <div className="text-sm text-muted-foreground">Verifications Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5 text-sky-500" />
                <div className="text-3xl font-bold text-foreground">500+</div>
              </div>
              <div className="text-sm text-muted-foreground">Corporate Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Smile className="h-5 w-5 text-indigo-500" />
                <div className="text-3xl font-bold text-foreground">99.9%</div>
              </div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Headphones className="h-5 w-5 text-emerald-500" />
                <div className="text-3xl font-bold text-foreground">24/7</div>
              </div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;