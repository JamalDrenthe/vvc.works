import { Link } from "react-router"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <img
          src="/vvc-logo.svg"
          alt="VVC Logo"
          className="w-20 h-20 mx-auto mb-6 drop-shadow-[0_10px_25px_rgba(230,0,126,0.35)]"
        />
        <div className="text-magenta text-[120px] font-black tracking-tighter leading-none mb-4">
          404
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight mb-3">
          Pagina niet gevonden
        </h1>
        <p className="text-[#888888] mb-8">
          De route die je probeert te bereiken bestaat niet (meer). Misschien is
          ie verplaatst of nog niet uitgerold.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-magenta hover:bg-white hover:text-black text-white font-black uppercase tracking-widest text-xs py-3 px-8 transition-colors"
        >
          Terug naar Dashboard
        </Link>
      </div>
    </div>
  )
}
