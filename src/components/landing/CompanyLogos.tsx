import type { FC, SVGProps } from "react"

export interface LogoProps extends SVGProps<SVGSVGElement> {
  className?: string
  showWordmark?: boolean
}

/**
 * Officiële vector logo's voor partners, neobanken en fintech ecosystemen.
 */

// 1. REVOLUT
export const RevolutLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Revolut R icon */}
    <g>
      <rect width="36" height="36" y="2" rx="9" fill="#191C1F" stroke="#33383F" strokeWidth="1.2" />
      <path
        d="M13 10H20C23.3137 10 26 12.6863 26 16C26 19.3137 23.3137 22 20 22H17V30H13V10Z"
        fill="#FFFFFF"
      />
      <path
        d="M20 20L25 30H20.5L16.2 21.5H19C19.35 21.5 19.68 21.4 20 21.2"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="16" r="2.5" fill="#191C1F" />
    </g>
    {/* Wordmark */}
    <text x="46" y="26" fill="#FFFFFF" fontSize="19" fontWeight="800" letterSpacing="-0.04em" fontFamily="Inter, sans-serif">
      Revolut
    </text>
  </svg>
)

// 2. BUNQ
export const BunqLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* bunq rainbow spectrum dots */}
    <g transform="translate(2, 8)">
      <circle cx="6" cy="12" r="5" fill="#30D158" />
      <circle cx="15" cy="7" r="5" fill="#0A84FF" />
      <circle cx="24" cy="12" r="5" fill="#FF453A" />
      <circle cx="15" cy="17" r="4.5" fill="#FFD60A" />
    </g>
    {/* Wordmark */}
    <text x="40" y="26" fill="#FFFFFF" fontSize="21" fontWeight="700" letterSpacing="-0.02em" fontFamily="Inter, sans-serif">
      bunq
    </text>
  </svg>
)

// 3. BARCLAYS
export const BarclaysLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Barclays Eagle Emblem */}
    <g transform="translate(0, 4)">
      <path
        d="M18 4L7 12C9 14 11 17 11 20C11 24 8 27 5 28C10 29 16 28 20 24C21 27 24 30 29 31C28 26 25 22 25 18C27 15 29 12 31 8L18 4Z"
        fill="#00AEEF"
      />
      <circle cx="18" cy="16" r="3" fill="#FFFFFF" />
    </g>
    {/* Wordmark */}
    <text x="40" y="26" fill="#00AEEF" fontSize="18" fontWeight="800" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
      BARCLAYS
    </text>
  </svg>
)

// 4. MONZO
export const MonzoLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Monzo multicolored M badge */}
    <g transform="translate(2, 6)">
      <rect x="0" y="4" width="7" height="20" rx="3.5" fill="#FF3657" />
      <path d="M7 7.5L14 17L21 7.5" stroke="#FFBC00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="21" y="4" width="7" height="20" rx="3.5" fill="#00A699" />
    </g>
    {/* Wordmark */}
    <text x="38" y="26" fill="#FFFFFF" fontSize="20" fontWeight="800" letterSpacing="-0.03em" fontFamily="Inter, sans-serif">
      monzo
    </text>
  </svg>
)

// 5. STRIPE
export const StripeLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <g transform="translate(0, 4)">
      <rect width="32" height="32" rx="8" fill="#635BFF" fillOpacity="0.15" stroke="#635BFF" strokeWidth="1.2" />
      <text x="16" y="22" fill="#635BFF" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">
        S
      </text>
    </g>
    <text x="42" y="26" fill="#FFFFFF" fontSize="20" fontWeight="800" letterSpacing="-0.03em" fontFamily="Inter, sans-serif">
      stripe
    </text>
  </svg>
)

// 6. ADYEN
export const AdyenLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <g transform="translate(0, 5)">
      <rect width="30" height="30" rx="7" fill="#0ABF53" />
      <path d="M12 11L18 15L12 19" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="38" y="26" fill="#FFFFFF" fontSize="19" fontWeight="800" letterSpacing="-0.02em" fontFamily="Inter, sans-serif">
      adyen
    </text>
  </svg>
)

// 7. TRADE REPUBLIC
export const TradeRepublicLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 190 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Interlocking minimalist TR badge */}
    <g transform="translate(2, 6)">
      <rect width="28" height="28" rx="6" fill="#141416" stroke="#444" strokeWidth="1" />
      <path d="M8 10H20M14 10V20M17 14H21C22 14 22 17 21 17H17M19 17L22 21" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="38" y="24" fill="#FFFFFF" fontSize="14" fontWeight="800" letterSpacing="0.08em" fontFamily="Inter, sans-serif">
      TRADE REPUBLIC
    </text>
  </svg>
)

// 8. BINANCE
export const BinanceLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    {/* Binance 4-diamond mark */}
    <g transform="translate(4, 8)">
      <path d="M12 0L16 4L12 8L8 4L12 0Z" fill="#F3BA2F" />
      <path d="M4 8L8 12L4 16L0 12L4 8Z" fill="#F3BA2F" />
      <path d="M20 8L24 12L20 16L16 12L20 8Z" fill="#F3BA2F" />
      <path d="M12 16L16 20L12 24L8 20L12 16Z" fill="#F3BA2F" />
      <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="#F3BA2F" />
    </g>
    <text x="38" y="25" fill="#FFFFFF" fontSize="17" fontWeight="800" letterSpacing="0.04em" fontFamily="Inter, sans-serif">
      BINANCE
    </text>
  </svg>
)

// 9. BOOSTPLUG
export const BoostplugLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <g transform="translate(0, 5)">
      <rect width="30" height="30" rx="7" fill="#180B22" stroke="#e6007e" strokeWidth="1.2" />
      <path d="M16 6L9 16H16L14 24L22 13H15L17 6H16Z" fill="#e6007e" />
    </g>
    <text x="38" y="25" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="0.05em" fontFamily="Space Grotesk, sans-serif">
      BOOSTPLUG<tspan fill="#e6007e">.ONE</tspan>
    </text>
  </svg>
)

// 10. CRMOS
export const CrmosLogo: FC<LogoProps> = ({ className = "h-6 w-auto", ...props }) => (
  <svg viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <g transform="translate(0, 5)">
      <rect width="30" height="30" rx="7" fill="#0B1522" stroke="#00d2ff" strokeWidth="1.2" />
      <circle cx="15" cy="15" r="4.5" fill="#00d2ff" />
      <circle cx="9" cy="9" r="2" fill="#FFFFFF" />
      <circle cx="21" cy="9" r="2" fill="#FFFFFF" />
      <circle cx="9" cy="21" r="2" fill="#FFFFFF" />
      <circle cx="21" cy="21" r="2" fill="#FFFFFF" />
      <path d="M9 9L15 15M21 9L15 15M9 21L15 15M21 21L15 15" stroke="#00d2ff" strokeWidth="1.2" strokeOpacity="0.6" />
    </g>
    <text x="38" y="25" fill="#FFFFFF" fontSize="17" fontWeight="900" letterSpacing="0.06em" fontFamily="Space Grotesk, sans-serif">
      CRMos<tspan fill="#00d2ff">.LIVE</tspan>
    </text>
  </svg>
)

/**
 * Helper component die het juiste logo rendert op basis van partner type.
 */
export const CompanyLogoRenderer: FC<{ type: string; className?: string }> = ({
  type,
  className = "h-6 w-auto",
}) => {
  switch (type.toLowerCase()) {
    case "revolut":
      return <RevolutLogo className={className} />
    case "bunq":
      return <BunqLogo className={className} />
    case "barclays":
      return <BarclaysLogo className={className} />
    case "monzo":
      return <MonzoLogo className={className} />
    case "stripe":
      return <StripeLogo className={className} />
    case "adyen":
      return <AdyenLogo className={className} />
    case "traderepublic":
    case "trade-republic":
      return <TradeRepublicLogo className={className} />
    case "binance":
      return <BinanceLogo className={className} />
    case "boostplug":
      return <BoostplugLogo className={className} />
    case "crmos":
      return <CrmosLogo className={className} />
    default:
      return null
  }
}
