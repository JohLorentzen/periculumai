import { AccountTable } from "@/components/AccountTable"
import { Component as PortfolioDonutChart } from "@/components/PortfolioDonutChart"
import { Card } from "@/components/ui/card"

const Dashboard = () => {
  // Mock data for accounts
  const accountsData = [
    {
      name: "Aksjer",
      platform: "Nordnet",
      type: "ASK",
      value: "**********",
      risk: 5,
      return: "+44.3%",
      allocation: 55, // Percentage of portfolio
    },
    {
      name: "Pensjon",
      platform: "Kron",
      type: "IPS",
      value: "**********",
      risk: 3,
      return: "+10.1%",
      allocation: 25, // Percentage of portfolio
    },
    {
      name: "Fond",
      platform: "DNB",
      type: "Fondskonto",
      value: "**********",
      risk: 4,
      return: "+18.7%",
      allocation: 20, // Percentage of portfolio
    },
    {
      name: "BSU",
      platform: "Sparebank 1",
      type: "BSU",
      value: "**********",
      risk: 1,
      return: "+6.3%",
      allocation: 50, // Percentage of portfolio
    }
  ]

  // Prepare simplified data for the chart
  const portfolioData = accountsData.map(account => ({
    category: account.name,
    allocation: account.allocation,
  }))

  // Simple chart config
  const chartConfig = {
    allocation: {
      label: "Allokering",
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Oversikt over dine investeringer og kontoer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-xl border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Porteføljefordeling</h2>
              <PortfolioDonutChart data={portfolioData} config={chartConfig} />
            </div>
          </Card>
          <Card className="rounded-xl border bg-card lg:col-span-2">
            <AccountTable accounts={accountsData} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard