import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Layout, Shield, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful analytics dashboard. Monitor key metrics and track performance in real-time.",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "User Management",
    description: "Efficiently manage users, roles, and permissions. Keep track of user activities and access controls.",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Custom Layouts",
    description: "Personalize your dashboard with drag-and-drop widgets and customizable layouts.",
    icon: Layout,
    color: "text-purple-500",
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security features to protect your data with end-to-end encryption.",
    icon: Shield,
    color: "text-red-500",
  },
];

export default function DashboardFeatures() {
  return (
    <Container>
      <div className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Dashboard Features
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Powerful Tools for Your Business
            </h1>
            <p className="text-lg leading-8 text-muted-foreground mb-12">
              Experience the next generation of business intelligence with our comprehensive dashboard solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {features.map((feature) => (
              <Card key={feature.title} className="p-8 transition-all hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-2 rounded-lg ${feature.color} bg-opacity-10`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Try the Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
