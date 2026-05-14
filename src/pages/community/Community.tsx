import { Users } from "lucide-react"
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage"

export default function CommunityPage() {
  return (
    <PlaceholderPage
      title="Community"
      icon={<Users size={48} className="text-[#333333]" />}
      description="Het hart van de club. Double Team-matching, event roster en de directe lijn met je medepartners."
    />
  )
}
