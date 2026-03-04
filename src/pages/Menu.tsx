import { useNavigate, useParams } from "react-router-dom";
import flagPt from "@/assets/flag-pt.png";
import flagEn from "@/assets/flag-en.png";
import homeIcon from "@/assets/home-icon.png";
import xIcon from "@/assets/x-icon.png";

const menuItems = {
  pt: {
    alugueres: "ALUGUERES",
    oficina: "OFICINA",
    usados: "USADOS",
    tours: "TOURS",
  },
  en: {
    alugueres: "RENTALS",
    oficina: "BIKE REPAIR",
    usados: "USED BIKES",
    tours: "TOURS",
  },
};

const Menu = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang === "en" ? "en" : "pt") as "pt" | "en";
  const labels = menuItems[currentLang];

  const openPopup = (url: string) => {
    window.open(url, "_blank", "fullscreen=yes,scrollbars=yes,resizable=yes");
  };

  const handleButton = (key: string) => {
    switch (key) {
      case "alugueres":
        openPopup("https://dashboard.bikesultoursgest.com/reservar");
        break;
      case "oficina":
        navigate(`/${currentLang}/oficina`);
        break;
      case "usados":
        openPopup("https://bikesultoursgest.com/" + (currentLang === "en" ? "en/used-bikes/" : "usados/"));
        break;
      case "tours":
        openPopup("https://bikesultoursgest.com/" + (currentLang === "en" ? "en/tours/" : "tours/"));
        break;
    }
  };

  return (
    <div className="fixed inset-0 flex font-varela">
      {/* Red Column */}
      <div className="w-[68%] h-full bg-primary relative">
        {/* Buttons */}
        <div className="absolute top-1/2 left-[48%] -translate-x-[40%] -translate-y-1/2 flex flex-col gap-5 w-1/2 z-10">
          {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
            <button
              key={key}
              onClick={() => handleButton(key)}
              className="totem-button"
            >
              {labels[key]}
            </button>
          ))}
        </div>
      </div>

      {/* White Column */}
      <div className="w-[32%] h-full bg-background relative">
        {/* Language Flags */}
        <div className="absolute top-10 right-10 flex gap-5 z-20">
          <button onClick={() => navigate("/en/menu")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagEn} alt="English" className="flag-button-lg" />
          </button>
          <button onClick={() => navigate("/pt/menu")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagPt} alt="Português" className="flag-button-lg" />
          </button>
        </div>

        {/* Footer Icons */}
        <div className="absolute bottom-[50px] w-full flex justify-around items-center px-[10%] box-border">
          <button onClick={() => navigate(`/${currentLang}`)} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={homeIcon} alt="Home" className="w-[85px] h-auto cursor-pointer transition-transform duration-200 hover:scale-110" />
          </button>
          <button onClick={() => navigate(`/${currentLang}`)} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={xIcon} alt="Close" className="w-[85px] h-auto cursor-pointer transition-transform duration-200 hover:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
