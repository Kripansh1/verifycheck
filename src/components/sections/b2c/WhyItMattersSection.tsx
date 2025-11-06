import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, DollarSign, TrendingDown, Users } from "lucide-react";

const WhyItMattersSection = () => {
  const risks = [
    {
      icon: AlertTriangle,
      title: "Stand Out Instantly",
      stat: "Instant",
      description: "Recruiters can trust your credentials at a glance with a verified profile."
    },
    {
      icon: DollarSign,
      title: "Faster Shortlists",
      stat: "Faster",
      description: "Skip background‑check delays and move to interviews sooner."
    },
    {
      icon: TrendingDown,
      title: "Built‑In Trust",
      stat: "Trusted",
      description: "Prove identity, education, and work history up front—no back‑and‑forth."
    },
    {
      icon: Users,
      title: "Global Mobility",
      stat: "Global",
      description: "Use one certificate across jobs, visas, and remote roles worldwide."
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
            Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Profile Verification</span> Matters for Your Career
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            Turn your credentials into verified proof. Build trust fast, reduce paperwork, and get shortlisted sooner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {risks.map((risk, index) => (
            <Card 
              key={index} 
              className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group animate-fade-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <risk.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">
                      {risk.stat}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {risk.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {risk.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Mitigation Points */}
        <div className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-xl p-10 overflow-hidden">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            What You Gain with Verification
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground">Get Shortlisted Sooner</h4>
              <p className="text-muted-foreground">
                Move ahead when your documents are already verified.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground">Save Time & Cost</h4>
              <p className="text-muted-foreground">
                Fewer notarizations, fewer follow‑ups, less paperwork.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400 via-sky-400 to-indigo-400 flex items-center justify-center mx-auto shadow-lg">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground">Stronger Offers</h4>
              <p className="text-muted-foreground">
                Stand out as low‑risk, high‑trust—negotiate with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMattersSection;