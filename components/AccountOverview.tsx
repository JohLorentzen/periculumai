"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Simple donut chart using SVG
const DonutChart = ({ percentage = 34.89 }: { percentage?: number }) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="fill-none stroke-muted/20 stroke-[8]"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="fill-none stroke-green-600 stroke-[8]"
          strokeDasharray={strokeDasharray}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-green-600">+{percentage}%</span>
      </div>
    </div>
  )
}

const accounts = [
  {
    name: "Aksjer",
    platform: "Nordnet",
    type: "ASK",
    value: "**********",
    risk: 5,
    return: "+44.3%"
  },
  {
    name: "Pensjon",
    platform: "Kron",
    type: "IPS",
    value: "**********",
    risk: 3,
    return: "+10.1%"
  }
]

export function AccountOverview() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start gap-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Registrerte kontoer</h2>
          <p className="text-muted-foreground">
            Total avkastning på tvers av alle plattformer
          </p>
        </div>
        <DonutChart />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Navn</TableHead>
            <TableHead>Plattform</TableHead>
            <TableHead>Kontotype</TableHead>
            <TableHead>Kontoverdi</TableHead>
            <TableHead>Riskorating</TableHead>
            <TableHead className="text-right">Avkastning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={`${account.name}-${account.platform}`}>
              <TableCell className="font-medium">{account.name}</TableCell>
              <TableCell>
                <Badge variant={account.platform === "Nordnet" ? "default" : "secondary"} className="font-normal">
                  {account.platform}
                </Badge>
              </TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell className="font-mono">{account.value}</TableCell>
              <TableCell>
                <Badge variant={account.risk >= 4 ? "destructive" : "warning"} className="font-normal">
                  {account.risk}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-green-600">
                {account.return}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 