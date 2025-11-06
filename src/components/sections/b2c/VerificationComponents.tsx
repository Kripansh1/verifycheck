import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  GraduationCap, 
  Building, 
  Shield, 
  Award, 
  Clock,
  CheckCircle,
  FileText
} from "lucide-react";

const VerificationComponents = () => {
  const components = [
    {
      icon: User,
      title: "Identity Verification",
      description: "Comprehensive identity validation including government-issued ID verification, biometric authentication, and address confirmation.",
      features: ["Government ID Check", "Biometric Verification", "Address Validation", "Social Security Verification"],
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "Educational Background Check",
      description: "Thorough verification of academic credentials, degrees, certifications, and educational achievements from recognized institutions.",
      features: ["Degree Verification", "Institution Authentication", "GPA Validation", "Certification Checks"],
      color: "bg-green-500"
    },
    {
      icon: Building,
      title: "Employment History Verification",
      description: "Complete employment background screening including job titles, employment dates, salary verification, and performance records.",
      features: ["Employment Dates", "Position Verification", "Salary Confirmation", "Performance Records"],
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Criminal Background Screening",
      description: "Comprehensive criminal history checks including local, national, and international databases for complete peace of mind.",
      features: ["Criminal Records", "Court Records", "International Checks", "Watchlist Screening"],
      color: "bg-red-500"
    },
    {
      icon: Award,
      title: "Professional License Validation",
      description: "Verification of professional licenses, certifications, and regulatory compliance across various industries and jurisdictions.",
      features: ["License Verification", "Regulatory Compliance", "Certification Status", "Renewal Tracking"],
      color: "bg-yellow-500"
    },
    {
      icon: FileText,
      title: "Reference Checks",
      description: "Professional reference verification including supervisor contacts, peer reviews, and character assessments from previous employers.",
      features: ["Supervisor Contacts", "Peer Reviews", "Character Assessment", "Performance Feedback"],
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]">
      {/* Decorative blobs to match other sections */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Comprehensive <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Verification</span> Components
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            Our multi-layered approach ensures thorough verification across all aspects 
            of a candidate's background and credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <Card 
              key={index} 
              className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group animate-fade-up h-full overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-8 h-full flex flex-col">
                <div className="space-y-4 flex-grow">
                  {/* Header */}
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <component.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {component.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {component.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {component.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end pt-4 mt-6 border-t border-border/60">
                  <div className="flex items-center space-x-1">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-emerald-600 font-medium">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerificationComponents;