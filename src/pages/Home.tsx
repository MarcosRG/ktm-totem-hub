import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ktmLogo from "@/assets/ktm-logo.png";
import menuIcon from "@/assets/menu-icon.png";
import flagPt from "@/assets/flag-pt.png";
import flagEn from "@/assets/flag-en.png";

/* =============================================================
   🖼️ CONFIGURAÇÃO DO SLIDESHOW — EDITAR AQUI
   =============================================================
   Para adicionar ou remover imagens:
   1. Adicione a URL da imagem na lista abaixo
   2. Pode usar URLs externas ou importar imagens locais
   3. Suporta quantas imagens quiser (1 a 20+)
   
   Para alterar a velocidade:
   - Mude SLIDE_INTERVAL (em milissegundos)
   - 5000 = 5 segundos, 3000 = 3 segundos
   ============================================================= */

const slides: string[] = [
  "https://bikesultoursgest.com/wp-content/uploads/2026/03/03.png",
  // "https://exemplo.com/imagem2.png",
  // "https://exemplo.com/imagem3.png",
  // "https://exemplo.com/imagem4.png",
  // "https://exemplo.com/imagem5.png",
  // "https://exemplo.com/imagem6.png",
];

const SLIDE_INTERVAL = 5000; // ⏱️ Tempo entre slides (ms)

const Home = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "pt";
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const openPopup = (url: string) => {
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    const specs = `width=${width},height=${height},top=0,left=0,fullscreen=yes,scrollbars=yes,resizable=yes,status=no,location=no`;
    const newWin = window.open(url, "_blank", specs);
    if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
      alert("Por favor, permite los popups para ver el catálogo.");
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground">
      {/* Background Slider */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === currentSlide ? 1 : 0,
            transitionDuration: "var(--totem-transition)",
          }}
        />
      ))}

      {/* UI Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {/* KTM Logo */}
        <button
          onClick={() => openPopup("https://ktm-bike.pt/pt/pt/")}
          className="absolute top-10 left-10 w-[180px] pointer-events-auto cursor-pointer bg-transparent border-none p-0"
        >
          <img src={ktmLogo} alt="KTM Logo" className="w-full h-auto" />
        </button>

        {/* Language Flags */}
        <div className="absolute top-10 right-10 flex gap-5 pointer-events-auto">
          <button onClick={() => navigate("/en")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagEn} alt="English" className="flag-button" />
          </button>
          <button onClick={() => navigate("/pt")} className="bg-transparent border-none p-0 cursor-pointer">
            <img src={flagPt} alt="Português" className="flag-button" />
          </button>
        </div>

        {/* Menu Icon with animation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <motion.button
            onClick={() => navigate(`/${currentLang}/menu`)}
            className="bg-transparent border-none p-0 cursor-pointer"
            whileTap={{ scale: 0.85, rotate: 90 }}
            whileHover={{ scale: 1.15 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img
              src={menuIcon}
              alt="Menu"
              className="w-[50px] h-auto drop-shadow-lg"
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
