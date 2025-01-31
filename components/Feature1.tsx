import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const Feature1 = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div className="flex gap-4 flex-col flex-1">
          <div>
            <Badge>Hvorfor betale mer, for mindre?</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
              En ny era for personlig formue forvaltning
            </h2>
            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
              Ved hjelp av KI og vår plattform kan du samle alle tall og data på ett sted, og få en oversikt over din formue.
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1 relative flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 opacity-60"
          >
            <rect width="100%" height="100%" fill="#a8a29e" rx="10" />
            <path
              d="M 80 30 L 80 170 M 80 80 L 120 40 M 80 120 L 120 80"
              stroke="black"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#shadow)"
            />
            <defs>
              <filter id="shadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.5" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
);
