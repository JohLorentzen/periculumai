"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Account {
  name: string;
  platform: string;
  type: string;
  value: string;
  risk: number;
  return: string;
  allocation: number;
}

interface AccountTableProps {
  accounts: Account[];
}

export function AccountTable({ accounts }: AccountTableProps) {
  return (
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
              <Badge 
                variant={account.risk >= 4 ? "destructive" : "secondary"} 
                className={`font-normal ${account.risk >= 4 ? "" : "bg-amber-500 hover:bg-amber-500/80"}`}
              >
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
  )
} 