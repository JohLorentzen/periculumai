import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EvervaultCard } from "@/components/ui/animated-beam"

export default function KIPage() {
  return (
    <Container>
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <EvervaultCard text="KI-Agent" />
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              Vår KI-Agent
            </h1>
            
            <div className="grid gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Hovedfunksjoner</h2>
                <div className="grid gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        {i + 1}
                      </div>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Bruksområder</h2>
                <div className="grid gap-4">
                  {useCases.map((useCase, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                        {i + 1}
                      </div>
                      <p>{useCase}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Button size="lg" className="w-full">
                Prøv vår KI-Agent nå
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const features = [
  "Naturlig språkforståelse og kommunikasjon på norsk",
  "Rask og presis informasjonsbehandling",
  "Tilpasset norsk kontekst og kultur",
  "Sikker og pålitelig databehandling",
  "24/7 tilgjengelighet"
]

const useCases = [
  "Kundeservice og support",
  "Informasjonssøk og analyse",
  "Automatisering av rutineoppgaver",
  "Beslutningsstøtte",
  "Personlig assistanse"
]
