import { Crosshair } from "lucide-react"
import { PlaceholderPage } from "@/pages/_shared/PlaceholderPage"

export default function ProspectsPage() {
  return (
    <PlaceholderPage
      title="Prospects"
      icon={<Crosshair size={48} className="text-[#333333]" />}
      description="Jouw warme netwerk, gestructureerd. Beheer leads, scoor cases en track je pipeline van eerste touch tot plaatsing."
    />
  )
}
