"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Account } from "@/lib/types/account"

interface AccountTableProps {
  accounts: Account[];
}

// Map platform names to Tailwind classes
const getPlatformClass = (platform: string): string => {
  const platformMap: Record<string, string> = {
    "Nordnet": "bg-platform-nordnet text-white",
    "Kron": "bg-platform-kron text-black",
    "DNB": "bg-platform-dnb text-white",
    "Sparebank 1": "bg-platform-sparebank1 text-white",
    "Firi": "bg-platform-firi text-white",
  };
  
  return platformMap[platform] || "bg-platform-default text-white";
};

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
          <TableHead>Allokering</TableHead>
          <TableHead className="text-right">Avkastning</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={`${account.name}-${account.platform}`}>
            <TableCell className="font-medium">{account.name}</TableCell>
            <TableCell>
              <Badge 
                variant="outline" 
                className={`font-normal ${getPlatformClass(account.platform)}`}
              >
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
            <TableCell className="font-medium">
              {account.allocation}%
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