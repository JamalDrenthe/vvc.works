import { Activity } from "lucide-react"
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage"

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="Analytics"
      icon={<Activity size={48} className="text-[#333333]" />}
      description="Real-time inzicht in je executie. Conversie funnels, plaatsings-velocity en partner-leaderboards. Module in audit."
    />
  )
}
