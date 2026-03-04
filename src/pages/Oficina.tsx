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
    <div className="fixed inset-0 bg-background font-varela grid place-items-center">
      {/* Iframe */}
      <iframe
        src={iframeUrl}
        className="absolute inset-0 w-full h-full border-none z-[1]"
        title="Oficina"
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 z-[99999] pointer-events-none">
        {/* Flags */}
        <div className="absolute top-10 right-10 flex gap-5 pointer-events-auto">
          <button onClick={() => navigate("/en/oficina")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagEn} alt="English" className="flag-button-lg" />
          </button>
          <button onClick={() => navigate("/pt/oficina")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagPt} alt="Português" className="flag-button-lg" />
          </button>
        </div>

        {/* Home icon */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
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
    </div>
  );
};

export default Oficina;
