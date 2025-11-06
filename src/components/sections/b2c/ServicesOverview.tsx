import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, FileCheck } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Highest Qualification Check",
      description: "Comprehensive verification of educational credentials, degrees, and certifications from accredited institutions worldwide.",
      features: ["Degree Authentication", "Institution Verification", "Grade Validation"]
    },
    {
      icon: Building,
      title: "Previous Employment Verification",
      description: "Thorough validation of work history, job titles, employment dates, and professional references.",
      features: ["Employment History", "Position Verification", "Reference Checks"]
    },
    {
      icon: FileCheck,
      title: "Passport & Identity Verification",
      description: "Secure identity verification including passport authentication and government document validation.",
      features: ["Identity Confirmation", "Document Authentication", "Biometric Verification"]
    }
  ];

  return (
    <section
      id="services"
      className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Key Verification</span> Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            Comprehensive background screening solutions designed to meet global employment standards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group animate-fade-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-8 lg:p-10">
                <div className="text-center space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
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

export default ServicesOverview;