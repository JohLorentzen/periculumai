import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Feature2 = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
        <div>
          <Badge>Hvorfor bygger vi dette?</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            Alle godene!
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            Personlig formue forvaltning for deg.
          </p>
        </div>
        <div className="flex gap-10 pt-12 flex-col w-full">
          <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
            <div className="flex flex-row gap-6 w-full items-start">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Full oversikt</p>
                <p className="text-muted-foreground text-sm">
                  Vi samler alle dine konti og formue på ett sted.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
               <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Rask oppstart</p>
                <p className="text-muted-foreground text-sm">
                  Logg inn med og samle din kontoinformasjon på ETT sted
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
               <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Vakkert og intuitvt desing</p>
                <p className="text-muted-foreground text-sm">
                  Vi har laget en vakker og intuitiv plattform.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 w-full items-start">
               <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Fremtidig funksjonalitet</p>
                <p className="text-muted-foreground text-sm">
                  Vi utvikler en KI agent som kan bidra deg til å ta bedre avgjørelser.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
               <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Sikkerhet på det høyeste</p>
                <p className="text-muted-foreground text-sm">
                  Vi prioriterer sikkerhet og personvern.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
               <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Kost effektivt</p>
                <p className="text-muted-foreground text-sm">
                  Gratis oppstart for privatpersoner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);