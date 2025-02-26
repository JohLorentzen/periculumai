import { AccountOverview } from "@/components/AccountOverview"
import { Card } from "@/components/ui/card"

const Dashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Oversikt over dine investeringer og kontoer.
          </p>
        </div>
        
        <Card className="rounded-xl border bg-card">
          <AccountOverview />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard