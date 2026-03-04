import { useNavigate, useParams } from "react-router-dom";
import flagPt from "@/assets/flag-pt.png";
import flagEn from "@/assets/flag-en.png";
import homeIcon from "@/assets/home-icon.png";

const Oficina = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang === "en" ? "en" : "pt";

  const iframeUrl = "https://bikesul.blump.in/c/workshop/WorkshopFirst";

  return (
    <div className="fixed inset-0 bg-background font-varela flex flex-col">
      {/* Top bar with flags */}
      <div className="relative z-[10] flex justify-end items-center px-10 py-4 bg-background shrink-0">
        <div className="flex gap-5">
          <button onClick={() => navigate("/en/oficina")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagEn} alt="English" className="flag-button-lg" />
          </button>
          <button onClick={() => navigate("/pt/oficina")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagPt} alt="Português" className="flag-button-lg" />
          </button>
        </div>
      </div>

      {/* Iframe - takes remaining space */}
      <div className="flex-1 min-h-0 relative z-[1]">
        <iframe
          src={iframeUrl}
          className="w-full h-full border-none"
          title="Oficina"
          allow="geolocation *"
        />
      </div>

      {/* Bottom bar with home button */}
      <div className="relative z-[10] flex justify-center py-4 bg-background shrink-0">
        <button onClick={() => navigate(`/${currentLang}/menu`)} className="bg-transparent border-none p-0 cursor-pointer">
          <img
            src={homeIcon}
            alt="Home"
            className="w-[100px] h-auto cursor-pointer drop-shadow-lg transition-transform duration-200"
            onMouseDown={(e) => ((e.target as HTMLImageElement).style.transform = "scale(0.9)")}
            onMouseUp={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
          />
        </button>
      </div>
    </div>
  );
};

export default Oficina;
