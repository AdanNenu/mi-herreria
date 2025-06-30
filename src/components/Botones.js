import React, { useState, useEffect } from "react";
import "./Botones.css";

// Variables configurables
const telefonoWA = "+524772243644";
const telefonoMovil = "+524772533987";
const correoGmail = "julio7adolfo7@gmail.com";
const urlMaps = "https://maps.app.goo.gl/xTeKmCXKqoGAip1x7";
const urlCalendy = "";
const mensajeWhats = encodeURIComponent("¡Hola!, me gustaría obtener una cotización de...");
const mensajeCompartir = encodeURIComponent("Transforma tu hogar, transforma tu vida.");
const mensajeGmail = encodeURIComponent("¡Hola!, me gustaría obtener una cotización de...");

// Cargar imágenes sin que truene si no existen
let iconRewind, iconPlay, iconPause, iconForward, iconMute, iconVol;
let iconGmail, iconWhats, iconMaps, iconPhone, iconShare, iconCalendy, iconReport;
let iconGallery1, iconGallery2, iconGallery3, iconGallery4, iconGallery5;

try { iconRewind = require('../assets/preview.png'); } catch {}
try { iconPlay = require('../assets/play.png'); } catch {}
try { iconPause = require('../assets/pause.png'); } catch {}
try { iconForward = require('../assets/next.png'); } catch {}
try { iconMute = require('../assets/silencio.png'); } catch {}
try { iconVol = require('../assets/volumen.png'); } catch {}

try { iconGmail = require('../assets/gmail.png'); } catch {}
try { iconWhats = require('../assets/wa.png'); } catch {}
try { iconMaps = require('../assets/ubicacion.png'); } catch {}
try { iconPhone = require('../assets/telefono.png'); } catch {}
try { iconShare = require('../assets/compartir.png'); } catch {}
try { iconCalendy = require('../assets/calendy.png'); } catch {}
try { iconReport = require('../assets/informes.png'); } catch {}
try { iconGallery1 = require('../assets/galeria1.png'); } catch {}
try { iconGallery2 = require('../assets/galeria2.png'); } catch {}
try { iconGallery3 = require('../assets/galeria3.png'); } catch {}
try { iconGallery4 = require('../assets/galeria4.png'); } catch {}
try { iconGallery5 = require('../assets/galeria5.png'); } catch {}

const Botones = ({
  onPlayPause,
  onRewind,
  onForward,
  onToggleMute,
  isMuted,
  isPlaying,
}) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [urlMiAnuncio, setUrlMiAnuncio] = useState("");
  const [galeriaActual, setGaleriaActual] = useState("");
  const [urlsGalerias, setUrlsGalerias] = useState({});

  const abrirGmail = () => {
    const subject = encodeURIComponent("Cotización");
    window.location.href = `mailto:${correoGmail}?subject=${subject}&body=${mensajeGmail}`;
  };

  const abrirWhatsApp = () => {
    window.open(`https://wa.me/${telefonoWA}?text=${mensajeWhats}`, "_blank");
  };

  const abrirMaps = () => {
    window.open(urlMaps, "_blank");
  };

  const llamar = () => {
    window.location.href = `tel:${telefonoMovil}`;
  };

  const compartir = async () => {
    const shareData = {
      title: "T.A.C",
      text: decodeURIComponent(mensajeCompartir),
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      alert("La función de compartir no está disponible en este dispositivo.");
    }
  };

  const abrirCalendy = () => {
    window.open(urlCalendy, "_blank");
  };

  const abrirModalMiAnuncio = () => {
    setGaleriaActual(urlMiAnuncio);
    setModalAbierto(true);
  };

  const abrirGaleria = (indice) => {
    setGaleriaActual(urlsGalerias[`galeria${indice}`] || "");
    setModalAbierto(true);
  };

  useEffect(() => {
    const fetchAndSetVariables = () => {
      fetch('https://yotepromociono.com/variablesCanva.php')
        .then(response => response.json())
        .then(data => {
          const esVertical = window.innerHeight > window.innerWidth;
          const sufijo = esVertical ? 'V' : 'H';

          const nuevaUrlMiAnuncio = data[`urlMiAnuncioCanva${sufijo}`] || "";
          setUrlMiAnuncio(nuevaUrlMiAnuncio);

          const defaults = {
            V: {
              galeria1: "https://www.canva.com/design/DAGrUaYlJA4/qTH4WUc1zEoWvFKiCPTGXg/watch?embed",
              galeria2: "",
              galeria3: "",
              galeria4: "",
              galeria5: "",
            },
            H: {
              galeria1: "https://www.canva.com/design/DAGrURPsG3Q/607AN9E_0rjb73mDzNc-Mw/watch?embed",
              galeria2: "",
              galeria3: "",
              galeria4: "",
              galeria5: "",
            },
          };

          const nuevasGalerias = {
            galeria1: data[`urlGallery1${sufijo}`] || defaults[sufijo].galeria1,
            galeria2: data[`urlGallery2${sufijo}`] || defaults[sufijo].galeria2,
            galeria3: data[`urlGallery3${sufijo}`] || defaults[sufijo].galeria3,
            galeria4: data[`urlGallery4${sufijo}`] || defaults[sufijo].galeria4,
            galeria5: data[`urlGallery5${sufijo}`] || defaults[sufijo].galeria5,
          };

          setUrlsGalerias(nuevasGalerias);

          // ✅ Actualizar el modal si está abierto
          if (modalAbierto) {
            if (galeriaActual === urlMiAnuncio) {
              setGaleriaActual(nuevaUrlMiAnuncio);
            } else {
              Object.entries(urlsGalerias).forEach(([key, url]) => {
                if (galeriaActual === url) {
                  setGaleriaActual(nuevasGalerias[key]);
                }
              });
            }
          }
        })
        .catch(error => console.error('Error:', error));
    };

    fetchAndSetVariables();

    const handleResize = () => {
      fetchAndSetVariables();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [modalAbierto, galeriaActual, urlMiAnuncio, urlsGalerias]);

  return (
    <>
      <div className="botones-container">
        <div className="apps">
          {iconGmail && <button onClick={abrirGmail}><img src={iconGmail} alt="Gmail" /></button>}
          {iconWhats && <button onClick={abrirWhatsApp}><img src={iconWhats} alt="WhatsApp" /></button>}
          {iconPhone && <button onClick={llamar}><img src={iconPhone} alt="Teléfono" /></button>}
          {iconMaps && <button onClick={abrirMaps}><img src={iconMaps} alt="Ubicación" /></button>}
          {iconShare && <button onClick={compartir}><img src={iconShare} alt="Compartir" /></button>}
          {iconCalendy && <button onClick={abrirCalendy}><img src={iconCalendy} alt="Calendly" /></button>}
        </div>

        <div className="reproductor">
          {iconReport && <button onClick={abrirModalMiAnuncio}><img src={iconReport} alt="Anuncio" /></button>}
          {iconGallery1 && <button onClick={() => abrirGaleria(1)}><img src={iconGallery1} alt="Galería 1" /></button>}
          {iconGallery2 && <button onClick={() => abrirGaleria(2)}><img src={iconGallery2} alt="Galería 2" /></button>}
          {iconGallery3 && <button onClick={() => abrirGaleria(3)}><img src={iconGallery3} alt="Galería 3" /></button>}
          {iconGallery4 && <button onClick={() => abrirGaleria(4)}><img src={iconGallery4} alt="Galería 4" /></button>}
          {iconGallery5 && <button onClick={() => abrirGaleria(5)}><img src={iconGallery5} alt="Galería 5" /></button>}
        </div>
      </div>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={() => setModalAbierto(false)}>✖</button>
            <div style={{
              width: "100%",
              height: 0,
              paddingTop: "177.7778%",
              overflow: "hidden",
              borderRadius: "8px",
              position: "relative",
            }}>
              <iframe
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  border: "none",
                }}
                src={galeriaActual}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Botones;
