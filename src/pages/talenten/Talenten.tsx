import { UserPlus } from "lucide-react"
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage"

export default function TalentenPage() {
  return (
    <PlaceholderPage
      title="Talenten"
      icon={<UserPlus size={48} className="text-[#333333]" />}
      description="Het portfolio dat het sneeuwbaleffect aandrijft. Track placements, retentie en passieve verdiensten per talent."
    />
  )
}
