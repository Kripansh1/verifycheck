import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ShieldCheck, UploadCloud, FileDown, Phone } from "lucide-react";

const WhatsAppVerificationSection = () => {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.12),transparent_60%)]">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-500/25 to-indigo-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/25 via-teal-400/25 to-cyan-400/25 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Start Profile Verification on <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500">WhatsApp</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 mt-4 max-w-2xl mx-auto">
            Begin your verification in a familiar chat interface. Share documents securely
            and receive your Verification Certificate right inside WhatsApp.
          </p>
        </div>

        <Card className="border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] items-stretch">
              {/* Left copy */}
              <div className="p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <p className="text-foreground font-medium">Chat to Initiate</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                    <UploadCloud className="h-5 w-5 text-primary" />
                    <p className="text-foreground font-medium">Share Documents</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <p className="text-foreground font-medium">We verify your identity securely</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                    <FileDown className="h-5 w-5 text-sky-500" />
                    <p className="text-foreground font-medium">Get your Verification Certificate PDF</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/919340128637"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="lg" className="bg-whatsapp text-white hover:opacity-90 shadow-lg ring-1 ring-emerald-400/40 hover:ring-emerald-400/60">
                      Start on WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+919340128637">
                    <Button size="lg" variant="outline" className="gap-2 ring-1 ring-border/50 hover:ring-border/70 shadow-sm">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                  {/* tiny style for WhatsApp brand color without requiring extra CSS */}
                  <style>{`.bg-whatsapp{background-color:#25D366}`}</style>
                </div>
              </div>

              {/* Right image */}
              <div className="relative bg-muted/30 flex items-center justify-center p-6">
                <div className="relative bg-black rounded-[32px] p-3 shadow-2xl ring-1 ring-white/10">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-1.5 w-24 rounded-full bg-white/20" />
                  <img
                    src="/images/Verify Check.png"
                    alt="Verification chat flow on WhatsApp showing document share and certificate download"
                    className="max-h-[560px] w-auto object-contain rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatsAppVerificationSection;
