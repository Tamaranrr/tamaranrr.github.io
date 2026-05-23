// DemoBlog_Generacion.jsx — Demo autónomo de la página de generación de blog
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "@iconscout/unicons/css/line.css";
import "./css/blog_Generacion.css";

// ─── DATOS DEMO ────────────────────────────────────────────────────────────────

const DEMO_BLOG = {
  id: "blog-2",
  title: "5 destinos imperdibles para tus vacaciones en Europa",
  categoria: "Viajemos",
  estado: "generated",
  prioridad: "Alta",
  assigned_to: "user-2",
  keywords: "europa, viajes, vacaciones, turismo internacional, destinos",
  idioma: "Español",
  tecnica: "Top y Curiosidades",
  tono: "Cercano y Entusiasta",
  acento: "Neutral",
  estimated_word_count: 1280,
};

const DEMO_URLS = [
  "https://www.viajeros.com/europa-destinos-imperdibles",
  "https://www.traveler.es/viajes/articulos/destinos-europeos",
  "https://www.lonelyplanet.com/articles/best-europe-destinations",
];

const INITIAL_STRUCTURE = `[H1 - 0] 5 destinos imperdibles para tus vacaciones en Europa
[CONTENIDO]
Europa es un continente que nunca deja de sorprender. Desde sus majestuosas ciudades medievales hasta sus playas cristalinas del Mediterráneo, el Viejo Continente ofrece experiencias únicas para cada tipo de viajero. En esta guía te presentamos los 5 destinos que no puedes perderte.

[H2 - 1] Barcelona: Arte, Diseño y Vida Mediterránea
[MULTIMEDIA: FOTO | Panorámica de la Sagrada Familia al atardecer con la ciudad de fondo]
[CONTENIDO]
Barcelona es una ciudad que lo tiene todo. La arquitectura modernista de Antoni Gaudí, el animado barrio Gótico y las playas urbanas del Mediterráneo la convierten en un destino incomparable. El Mercat de la Boqueria y la icónica avenida de La Rambla completan una oferta turística que seduce a millones de visitantes cada año.

[H3 - 1.1] Atracciones principales
[CONTENIDO]
No te vayas sin visitar la Sagrada Familia, obra maestra de Gaudí con más de 140 años en construcción. El Parque Güell ofrece vistas panorámicas y mosaicos de colores únicos. El barrio del Born y el Palau de la Música Catalana son imprescindibles para los amantes del arte y la arquitectura modernista.

[H3 - 1.2] Gastronomía catalana
[CONTENIDO]
La cocina catalana es tan sofisticada como variada. El pan con tomate (pa amb tomàquet), las tapas del barrio de Gràcia y los mariscos frescos de la Barceloneta son experiencias que no debes perderte. La ciudad cuenta con varios restaurantes con estrella Michelin.

[H2 - 2] Praga: La Ciudad de las Cien Torres
[CONTENIDO]
Con su castillo medieval que domina el horizonte y su famoso Puente de Carlos del siglo XIV, Praga es un sueño para los amantes de la historia. Declarada Patrimonio de la Humanidad por la UNESCO, la ciudad vieja es un laberinto de callejuelas adoquinadas donde cada rincón esconde siglos de historia.

[H3 - 2.1] El Puente de Carlos y el Casco Histórico
[CONTENIDO]
El Puente de Carlos, construido en 1357, está flanqueado por 30 estatuas barrocas y ofrece vistas inigualables del río Vltava. El famoso Reloj Astronómico de la Plaza de la Ciudad Vieja es uno de los conjuntos medievales mejor conservados de Europa.

[H2 - 3] Santorini: El Paraíso del Egeo
[CONTENIDO]
Las icónicas casas blancas con cúpulas azules de Oia son uno de los paisajes más fotografiados del mundo. Santorini es una isla volcánica con acantilados de hasta 400 metros sobre el mar. Sus vinos Assyrtiko, cultivados en suelo volcánico, son únicos en el mundo.

[H3 - 3.1] Los mejores atardeceres del mundo
[CONTENIDO]
El pueblo de Oia es reconocido universalmente como uno de los mejores lugares para ver el atardecer. Cada noche, cientos de turistas se concentran en sus terrazas para contemplar cómo el sol se sumerge en el mar Egeo tiñendo el cielo de tonos anaranjados y rosados.

[H2 - 4] Ámsterdam: Canales, Arte y Diversidad Cultural
[CONTENIDO]
La capital neerlandesa enamora con su red de 165 canales, sus 1.500 puentes y sus características casas del siglo XVII. La ciudad es un paraíso para los amantes del arte y la historia, con museos de talla mundial a pasos de distancia entre sí.

[H3 - 4.1] Museos de clase mundial
[CONTENIDO]
El Rijksmuseum alberga la colección de arte holandés más importante del mundo, con obras de Rembrandt y Vermeer. El Museo Van Gogh exhibe la mayor colección del artista. La Casa de Ana Frank es una visita profundamente conmovedora e ineludible.

[H2 - 5] Lisboa: Fado, Sol y Mar
[CONTENIDO]
Lisboa es quizás la capital europea más auténtica y asequible. Sus tranvías históricos, los miradores sobre el río Tajo y el barrio de Alfama son iconos inalterables. Los pastéis de Belém y el bacalao como protagonista hacen de la gastronomía lisboeta una aventura culinaria en sí misma.

[H2 - 6] Consejos Prácticos para tu Viaje
[CONTENIDO]
Viaja en temporada baja (octubre a abril) para evitar aglomeraciones y encontrar mejores tarifas. Reserva con antelación las entradas a los museos más populares. Considera tarjetas de transporte urbano en cada ciudad para moverte con total libertad y comodidad.
`;

// ─── PARSING ──────────────────────────────────────────────────────────────────

const parseMarkdownStructure = (markdown) => {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const structure = [];
  let lastH2 = null;
  let lastH3 = null;
  let itemActual = null;
  let leyendoContenido = false;

  const structuredRegex = /^\[(H\d+)\s*-\s*([\d.]*)[\]>]\s*(.*)/i;
  const separateMediaRegex = /^\[MULTIMEDIA:\s*(VIDEO|FOTO|MAPA|GRAFICO|IMAGEN|IMAGE)\s*\|\s*(.*?)\]\s*$/i;
  const contentStartRegex = /^(?:\[CONTENIDO\]\s*|CONTENIDO:\s*)(.*)$/i;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const matchStructured = trimmedLine.match(structuredRegex);
    const matchMedia = trimmedLine.match(separateMediaRegex);
    const matchContentStart = trimmedLine.match(contentStartRegex);

    if (matchStructured) {
      leyendoContenido = false;
      const level = matchStructured[1].toLowerCase();
      const enumeration = matchStructured[2];
      const text = matchStructured[3].trim();
      const newItem = { level, enumeration, text, multimedia: null, multimediaDescription: null, content: null, children: [], uniqueId: `${level}-${enumeration}` };

      if (level === "h1") { structure.push(newItem); lastH2 = null; lastH3 = null; itemActual = newItem; }
      else if (level === "h2") { structure.push(newItem); lastH2 = newItem; lastH3 = null; itemActual = newItem; }
      else if (level === "h3" && lastH2) { lastH2.children.push(newItem); lastH3 = newItem; itemActual = newItem; }
      else if (level === "h4" && lastH3) { if (!lastH3.children) lastH3.children = []; lastH3.children.push(newItem); itemActual = newItem; }
    } else if (matchMedia && itemActual) {
      itemActual.multimedia = matchMedia[1].toUpperCase();
      itemActual.multimediaDescription = matchMedia[2].trim();
    } else if (matchContentStart) {
      leyendoContenido = true;
      const firstLine = matchContentStart[1].trim();
      if (itemActual) itemActual.content = firstLine ? firstLine : "";
    } else if (leyendoContenido && itemActual) {
      if (trimmedLine === "") { leyendoContenido = false; }
      else { itemActual.content = (itemActual.content ? itemActual.content + "\n" : "") + trimmedLine; }
    }
  }

  // Re-enumerate
  if (structure.length > 0) {
    let h2Idx = 1;
    structure.forEach((item) => {
      if (item.level === "h1") { item.enumeration = "0"; item.uniqueId = "h1-0"; }
      if (item.level === "h2") {
        const e = `${h2Idx}`;
        item.enumeration = e; item.uniqueId = `h2-${e}`;
        let h3Idx = 1;
        (item.children || []).forEach((h3) => {
          const e3 = `${e}.${h3Idx}`; h3.enumeration = e3; h3.uniqueId = `h3-${e3}`;
          let h4Idx = 1;
          (h3.children || []).forEach((h4) => { const e4 = `${e3}.${h4Idx}`; h4.enumeration = e4; h4.uniqueId = `h4-${e4}`; h4Idx++; });
          h3Idx++;
        });
        h2Idx++;
      }
    });
  }
  return structure;
};

const convertStructureToMarkdown = (structure) => {
  let lines = [];
  let h2Counter = 0;
  structure.forEach((item) => {
    if (item.level === "h1") {
      lines.push(`[H1 - ${item.enumeration}] ${(item.text || "").replace(/<[^>]*>/g, "")}`);
      if (item.multimedia) lines.push(`[MULTIMEDIA: ${item.multimedia} | ${item.multimediaDescription}]`);
      if (item.content) { lines.push("[CONTENIDO]"); lines.push(item.content); lines.push(""); }
      return;
    }
    h2Counter++;
    const h2e = `${h2Counter}`;
    lines.push(`[H2 - ${h2e}] ${(item.text || "").replace(/<[^>]*>/g, "")}`);
    if (item.multimedia) lines.push(`[MULTIMEDIA: ${item.multimedia} | ${item.multimediaDescription}]`);
    if (item.content) { lines.push("[CONTENIDO]"); lines.push(item.content); lines.push(""); }
    let h3Counter = 0;
    (item.children || []).forEach((h3) => {
      h3Counter++;
      const h3e = `${h2e}.${h3Counter}`;
      lines.push(`[H3 - ${h3e}] ${(h3.text || "").replace(/<[^>]*>/g, "")}`);
      if (h3.content) { lines.push("[CONTENIDO]"); lines.push(h3.content); lines.push(""); }
    });
    if (lines[lines.length - 1] !== "") lines.push("");
  });
  return lines.join("\n");
};

const contarPalabras = (texto) => {
  if (!texto) return 0;
  const div = document.createElement("div");
  div.innerHTML = texto;
  return ((div.textContent || div.innerText || "").replace(/\s+/g, " ").trim().split(" ").filter((p) => p.length > 0)).length;
};

// ─── TOAST ────────────────────────────────────────────────────────────────────

const ToastNotification = ({ toast }) => {
  if (!toast) return null;
  const map = { success: ["toast-success", "uil-check-circle"], error: ["toast-error", "uil-times-circle"], warning: ["toast-warning", "uil-exclamation-triangle"], info: ["toast-info", "uil-info-circle"] };
  const [cls, icon] = map[toast.type] || map.info;
  return (
    <div className={`toast-notification ${cls}`}>
      <i className={`uil ${icon}`}></i>
      <span>{toast.message}</span>
    </div>
  );
};

// ─── STRUCTURE RENDERER ───────────────────────────────────────────────────────

const StructureRenderer = ({ structure, onSelect, selectedSection, onAction }) => {
  if (!structure || structure.length === 0) return null;

  return (
    <ul className="structure-list">
      {structure.map((item) => {
        const isSelected = selectedSection?.uniqueId === item.uniqueId;
        const isH1 = item.level === "h1";

        return (
          <li key={item.uniqueId} className={`structure-item structure-item-${item.level} ${isSelected ? "structure-item-selected" : ""}`}>
            <div className="structure-content-wrapper">
              <div className="structure-text-area" onClick={(e) => onSelect(item, e)}>
                <span className="structure-icon-wrapper">
                  <i className={`uil ${isH1 ? "uil-heading" : item.level === "h2" ? "uil-align-left-h" : item.level === "h3" ? "uil-corner-down-right" : "uil-list-ui-alt"}`}></i>
                </span>
                <span className="structure-enumeration">{item.enumeration}</span>
                <span className="structure-title-text" dangerouslySetInnerHTML={{ __html: item.text || "Sin título" }} />
                {item.wordCount > 0 && <span className="structure-word-count">({item.wordCount} palabras)</span>}
              </div>

              {!isH1 && (
                <div className="structure-buttons-group">
                  <button onClick={(e) => { e.stopPropagation(); onAction("move", item, "UP"); }} title="Mover Arriba"><i className="uil uil-arrow-up"></i></button>
                  <button onClick={(e) => { e.stopPropagation(); onAction("move", item, "DOWN"); }} title="Mover Abajo"><i className="uil uil-arrow-down"></i></button>
                  <button onClick={(e) => { e.stopPropagation(); onAction("delete", item); }} title="Eliminar"><i className="uil uil-trash-alt"></i></button>
                </div>
              )}
            </div>

            {item.content && item.content.replace(/<[^>]*>/g, "").trim().length > 0 && (
              <div className={`content-preview-block preview-level-${item.level}`}>
                <strong className="preview-content-label">CONTENIDO {item.level.toUpperCase()}:</strong>
                <div className="preview-content-text" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 160) + (item.content.length > 160 ? "..." : "") }} />
              </div>
            )}

            {item.multimediaDescription && (
              <div className={`multimedia-recommendation-seo seo-level-${item.level}`}>
                <div className="seo-recommendation-header">
                  <i className={`uil ${item.multimedia?.includes("VIDEO") ? "uil-video" : "uil-camera"}`}></i>
                  <strong className="seo-recommendation-label">RECOMENDACIÓN SEO:</strong>
                </div>
                <p className="seo-recommendation-text">{item.multimediaDescription}</p>
              </div>
            )}

            {item.children && item.children.length > 0 && (
              <div className="structure-children-container">
                <StructureRenderer structure={item.children} onSelect={onSelect} selectedSection={selectedSection} onAction={onAction} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function DemoBlog_Generacion() {
  const navigate = useNavigate();

  // Estados principales
  const [tablaEstructuraFinal, setTablaEstructuraFinal] = useState(INITIAL_STRUCTURE);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditingStructure, setIsEditingStructure] = useState(true);
  const [selectedSectionForRegen, setSelectedSectionForRegen] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [blogStatus, setBlogStatus] = useState(DEMO_BLOG.estado);
  const [blogPriority, setBlogPriority] = useState(DEMO_BLOG.prioridad);
  const [toast, setToast] = useState(null);
  const [contentType, setContentType] = useState("ia_libre");
  const [cardVisibility, setCardVisibility] = useState({ preconfiguracionUnificada: false });
  const [cargandoIA, setCargandoIA] = useState(false);
  const [cargandoScraping, setCargandoScraping] = useState(false);
  const [googleFaqs, setGoogleFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [faqKeyword, setFaqKeyword] = useState(DEMO_BLOG.title);

  // Edición local de sección
  const [regenTextareaValue, setRegenTextareaValue] = useState("");
  const [sectionContentValue, setSectionContentValue] = useState("");
  const [estadosUrls] = useState({ 0: "exito", 1: "exito", 2: "exito" });

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markAsChanged = useCallback(() => setHasUnsavedChanges(true), []);

  // Efecto modo oscuro
  useEffect(() => {
    if (isDarkMode) { document.body.style.backgroundColor = "#0f172a"; }
    else { document.body.style.backgroundColor = "#f8fafc"; }
    return () => { document.body.style.backgroundColor = ""; };
  }, [isDarkMode]);

  // Estructura parseada con wordCount
  const structureWithCount = useMemo(() => {
    const arr = parseMarkdownStructure(tablaEstructuraFinal);
    if (!arr || arr.length === 0) return [];
    const processLevel = (item) => ({ ...item, wordCount: contarPalabras(item.content || ""), children: (item.children || []).map(processLevel) });
    return arr.map(processLevel);
  }, [tablaEstructuraFinal]);

  const totalGeneratedWords = useMemo(() => {
    const countAll = (items) => items.reduce((acc, item) => acc + contarPalabras(item.content || "") + countAll(item.children || []), 0);
    return countAll(structureWithCount);
  }, [structureWithCount]);

  const mainTitle = DEMO_BLOG.title;

  // ─── HANDLERS ───────────────────────────────────────────────────────────────

  const seleccionarSeccionEdicion = (section) => {
    setSelectedSectionForRegen(section);
    setRegenTextareaValue(section.text?.replace(/<[^>]*>/g, "") || "");
    setSectionContentValue(section.content || "");
  };

  const guardarCambiosTitulo = () => {
    if (!selectedSectionForRegen || !regenTextareaValue.trim()) {
      showToast("El título está vacío.", "error"); return;
    }
    let nuevaEstructura = parseMarkdownStructure(tablaEstructuraFinal);
    const { level, enumeration } = selectedSectionForRegen;
    const parts = enumeration.split(".");

    if (level === "h1") {
      const h1 = nuevaEstructura.find((i) => i.level === "h1");
      if (h1) h1.text = regenTextareaValue;
    } else {
      const h2 = nuevaEstructura.find((i) => i.enumeration === parts[0]);
      if (h2 && level === "h2") h2.text = regenTextareaValue;
      else if (h2 && level === "h3") {
        const h3 = h2.children?.find((c) => c.enumeration === enumeration);
        if (h3) h3.text = regenTextareaValue;
      }
    }
    setTablaEstructuraFinal(convertStructureToMarkdown(nuevaEstructura));
    setSelectedSectionForRegen((prev) => ({ ...prev, text: regenTextareaValue }));
    markAsChanged();
    showToast("Título guardado exitosamente.", "success");
  };

  const guardarContenidoLocal = () => {
    if (!selectedSectionForRegen) return;
    let nuevaEstructura = parseMarkdownStructure(tablaEstructuraFinal);
    const { level, enumeration } = selectedSectionForRegen;
    const parts = enumeration.split(".");

    if (level === "h1") {
      const h1 = nuevaEstructura.find((i) => i.level === "h1");
      if (h1) h1.content = sectionContentValue;
    } else {
      const h2 = nuevaEstructura.find((i) => i.enumeration === parts[0]);
      if (h2 && level === "h2") h2.content = sectionContentValue;
      else if (h2 && level === "h3") {
        const h3 = h2.children?.find((c) => c.enumeration === enumeration);
        if (h3) h3.content = sectionContentValue;
      }
    }
    setTablaEstructuraFinal(convertStructureToMarkdown(nuevaEstructura));
    setSelectedSectionForRegen(null);
    markAsChanged();
    showToast("Contenido guardado.", "success");
  };

  const moverSeccion = (section, direction) => {
    let estructura = parseMarkdownStructure(tablaEstructuraFinal);
    const level = section.level.toLowerCase();
    const parts = section.enumeration.split(".");

    if (level === "h1" || level === "h2") {
      const idx = estructura.findIndex((i) => i.uniqueId === section.uniqueId);
      if (idx === -1 || (level === "h2" && idx <= 0)) return;
      const newIdx = direction === "UP" ? idx - 1 : idx + 1;
      if (newIdx < (level === "h2" ? 1 : 0) || newIdx >= estructura.length) return;
      const [moved] = estructura.splice(idx, 1);
      estructura.splice(newIdx, 0, moved);
    } else if (level === "h3") {
      const h2 = estructura.find((i) => i.enumeration === parts[0]);
      if (!h2) return;
      const idx = h2.children.findIndex((i) => i.uniqueId === section.uniqueId);
      const newIdx = direction === "UP" ? idx - 1 : idx + 1;
      if (idx === -1 || newIdx < 0 || newIdx >= h2.children.length) return;
      const [moved] = h2.children.splice(idx, 1);
      h2.children.splice(newIdx, 0, moved);
    }
    setTablaEstructuraFinal(convertStructureToMarkdown(estructura));
    markAsChanged();
    showToast(`Sección movida ${direction === "UP" ? "arriba" : "abajo"}.`, "info");
  };

  const eliminarSeccion = (section) => {
    if (!window.confirm(`¿Eliminar "${section.text?.replace(/<[^>]*>/g, "")}" y todas sus subsecciones?`)) return;
    let estructura = parseMarkdownStructure(tablaEstructuraFinal);
    const level = section.level.toLowerCase();
    const parts = section.enumeration.split(".");

    if (level === "h1" || level === "h2") {
      estructura = estructura.filter((i) => i.uniqueId !== section.uniqueId);
    } else if (level === "h3") {
      estructura = estructura.map((h2) => {
        if (h2.enumeration === parts[0]) return { ...h2, children: h2.children.filter((h3) => h3.uniqueId !== section.uniqueId) };
        return h2;
      });
    }
    setTablaEstructuraFinal(convertStructureToMarkdown(estructura));
    setSelectedSectionForRegen(null);
    markAsChanged();
    showToast(`Sección eliminada.`, "success");
  };

  const gestionarAccionDeSeccion = (action, section, direction = null) => {
    if (action === "move") moverSeccion(section, direction);
    if (action === "delete") eliminarSeccion(section);
  };

  const agregarSeccionH2 = () => {
    const estructura = parseMarkdownStructure(tablaEstructuraFinal);
    estructura.push({ id: `new-${Date.now()}`, text: "Nuevo Título de Sección (H2)", level: "h2", enumeration: "0", multimedia: null, multimediaDescription: null, content: null, children: [] });
    setTablaEstructuraFinal(convertStructureToMarkdown(estructura));
    markAsChanged();
    showToast("Sección H2 añadida al final.", "success");
  };

  const agregarSubseccionH3 = () => {
    if (!selectedSectionForRegen) { showToast("Selecciona un H2 primero.", "error"); return; }
    const estructura = parseMarkdownStructure(tablaEstructuraFinal);
    const idH2 = selectedSectionForRegen.enumeration.split(".")[0];
    const h2 = estructura.find((i) => i.enumeration === idH2);
    if (!h2) { showToast("No se encontró el H2 padre.", "error"); return; }
    h2.children.push({ level: "h3", uniqueId: `h3-${Date.now()}`, text: "Nueva Subsección H3", multimedia: null, multimediaDescription: null, content: null, children: [] });
    setTablaEstructuraFinal(convertStructureToMarkdown(estructura));
    markAsChanged();
    showToast("Subsección H3 agregada.", "success");
  };

  const guardarArticulo = async () => {
    if (isSaving) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSaving(false);
    setHasUnsavedChanges(false);
    showToast("¡Proyecto guardado con éxito!", "success");
  };

  const limpiarTodoElContenido = () => {
    if (!window.confirm("¿Borrar TODO el contenido generado? Los títulos se mantendrán.")) return;
    const estructura = parseMarkdownStructure(tablaEstructuraFinal);
    const clean = (items) => items.map((i) => ({ ...i, content: null, children: clean(i.children || []) }));
    setTablaEstructuraFinal(convertStructureToMarkdown(clean(estructura)));
    markAsChanged();
    showToast("Contenido borrado exitosamente.", "success");
  };

  // Simulación de "Generar Estructura (IA)" — recarga el INITIAL_STRUCTURE
  const generarEsquemaDelArticulo = async () => {
    setCargandoIA(true);
    setTablaEstructuraFinal("");
    await new Promise((r) => setTimeout(r, 2000));
    setTablaEstructuraFinal(INITIAL_STRUCTURE.split("\n").filter((l) => !l.includes("[CONTENIDO]") && !l.startsWith("Europa") && !l.startsWith("Barcelona") && !l.startsWith("Con su") && !l.startsWith("Las icónicas") && !l.startsWith("La capital") && !l.startsWith("Lisboa") && !l.startsWith("Viaja") && !l.startsWith("No te") && !l.startsWith("La cocina") && !l.startsWith("El Puente") && !l.startsWith("El pueblo") && !l.startsWith("El Rijksmuseum") && !l.includes("CONTENIDO")).join("\n").trim());
    setCargandoIA(false);
    markAsChanged();
    showToast("✨ Estructura generada correctamente.", "success");
  };

  // Simulación de "Generar Contenido Completo"
  const generarContenidoCompleto = async () => {
    setCargandoIA(true);
    showToast("Iniciando generación de contenido...", "info");
    await new Promise((r) => setTimeout(r, 3000));
    setTablaEstructuraFinal(INITIAL_STRUCTURE);
    setCargandoIA(false);
    markAsChanged();
    showToast("¡Blog generado y guardado correctamente!", "success");
  };

  // Simulación de "Generar por sección"
  const generarContenidoSeccion = async () => {
    if (!selectedSectionForRegen) { showToast("Selecciona una sección primero.", "error"); return; }
    setCargandoIA(true);
    await new Promise((r) => setTimeout(r, 1500));
    const fakeContent = `Contenido generado automáticamente para la sección "${selectedSectionForRegen.text?.replace(/<[^>]*>/g, "")}". Este párrafo fue creado por la IA utilizando las fuentes de referencia y los parámetros configurados (técnica: ${DEMO_BLOG.tecnica}, tono: ${DEMO_BLOG.tono}).`;
    setSectionContentValue(fakeContent);
    setCargandoIA(false);
    showToast("Contenido de sección generado.", "success");
  };

  // Simulación de regenerar título
  const regenerarSeccion = async () => {
    setCargandoIA(true);
    await new Promise((r) => setTimeout(r, 1200));
    const sugerencias = [
      `${selectedSectionForRegen?.text?.replace(/<[^>]*>/g, "")} — Versión 2024`,
      `Descubre ${selectedSectionForRegen?.text?.replace(/<[^>]*>/g, "")}`,
      `Todo lo que necesitas saber sobre ${selectedSectionForRegen?.text?.replace(/<[^>]*>/g, "")}`,
    ];
    setCargandoIA(false);
    showToast("Sugerencias de título generadas (demo).", "success");
    setRegenTextareaValue(sugerencias[0]);
  };

  // Simulación de FAQs
  const generarFaqsDesdeEstructura = async () => {
    setLoadingFaqs(true);
    await new Promise((r) => setTimeout(r, 1800));
    setGoogleFaqs([
      "¿Cuál es el mejor momento para viajar a Europa?",
      "¿Cuánto dinero necesito para viajar a Barcelona?",
      "¿Es Santorini cara para los turistas latinoamericanos?",
      "¿Qué visa necesito para entrar a Europa desde Colombia?",
      "¿Cómo moverse entre ciudades europeas de forma económica?",
    ]);
    setLoadingFaqs(false);
    showToast("FAQs generadas con IA.", "success");
  };

  // Vista de documento (HTML renderizado)
  const renderizarContenidoDelBlog = (structure) => {
    if (!structure || structure.length === 0) return <div className="blog-view-placeholder"><p>Aún no hay estructura o contenido generado para mostrar.</p></div>;
    const hasContent = (html) => html && html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim().length > 0;
    return (
      <div className="tiptap-render">
        {structure.map((item) => (
          <React.Fragment key={item.uniqueId}>
            {hasContent(item.text) && <div className={item.level === "h1" ? "blog-title" : "section-h2"} dangerouslySetInnerHTML={{ __html: item.text }} />}
            {hasContent(item.content) && <div className="content-block" dangerouslySetInnerHTML={{ __html: item.content }} />}
            {(item.children || []).map((h3) => (
              <React.Fragment key={h3.uniqueId}>
                {hasContent(h3.text) && <div className="subsection-h3" dangerouslySetInnerHTML={{ __html: h3.text }} />}
                {hasContent(h3.content) && <div className="content-block" dangerouslySetInnerHTML={{ __html: h3.content }} />}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────

  return (
    <>
      <ToastNotification toast={toast} />
      <div className={`blog-generation-page ${isDarkMode ? "dark-mode" : ""}`}>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <header className="navbar-custom">
          <div className="header-brand">
            <h1>Generación <span>Blogs</span></h1>
            <p>Sistema de gestión de contenido &nbsp;·&nbsp; <span style={{ color: "#f59e0b", fontWeight: 700 }}>DEMO</span></p>
          </div>
          <div className="header-actions">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/demo-blog"); }} className="nav-link nav-link-dashboard">
              <i className="uil uil-dashboard" style={{ fontSize: "1.1rem" }}></i>
              <span>Dashboard Blog</span>
            </a>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn-mode-toggle" title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}>
              <i className={`uil ${isDarkMode ? "uil-sun" : "uil-moon"}`}></i>
            </button>
            <div className="user-pill">
              <div className="user-avatar">CL</div>
              <div className="user-info">
                <span className="user-name">Carlos López</span>
                <span className="user-role">Editor</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── FUENTES DE REFERENCIA ──────────────────────────────── */}
        <section className="preconfig">
          <div className="analysis-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #e0e6ec", paddingBottom: 10, marginBottom: 20 }}>
            <h2 style={{ color: "#007bff", margin: 0, fontSize: "1.2rem" }}>Fuentes de Referencia</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="status-text pending" style={{ fontSize: "0.8rem" }}>Añadir fuente</span>
              <button type="button" className="btn-remove-url" style={{ background: "#e8f5e9", color: "#28a745", border: "1px solid #c8e6c9", fontSize: 16 }} title="Añadir URL (demo)">+</button>
            </div>
          </div>
          <div className="config-cards-wrapper">
            {DEMO_URLS.map((url, i) => (
              <div key={i} className="url-container">
                <div className="url-input-group">
                  <input type="text" value={url} readOnly className="auto-expand exito" />
                  <button type="button" className="btn-remove-url" disabled title="Eliminar URL">✕</button>
                </div>
                <div className="url-status-label">
                  <span className="status-text success">✅ Analizado</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => { setCargandoScraping(true); showToast("Simulando análisis de fuentes...", "info"); setTimeout(() => { setCargandoScraping(false); showToast("Fuentes analizadas correctamente (demo).", "success"); }, 1800); }}
              className={`btn-generate ${cargandoScraping ? "btn-cancel" : ""}`}
              disabled={cargandoScraping}
            >
              {cargandoScraping ? "Analizando..." : "Analizar Google"}
            </button>
          </div>
        </section>

        {/* ── PARÁMETROS DE GENERACIÓN ───────────────────────────── */}
        <section className="analysis-result info-card">
          <h2 className="analysis-title collapsable-header" onClick={() => setCardVisibility((v) => ({ ...v, preconfiguracionUnificada: !v.preconfiguracionUnificada }))}>
            <div className="structure-buttons-group">
              <i className="uil uil-setting"></i>
              <span>Parámetros de Generación</span>
            </div>
            <i className={`uil ${cardVisibility.preconfiguracionUnificada ? "uil-angle-up" : "uil-angle-down"}`}></i>
          </h2>
          {cardVisibility.preconfiguracionUnificada && (
            <div className="config-cards-wrapper">
              <div className="project-header-group">
                <span className="status-text pending">TÍTULO DEL PROYECTO</span>
                <p className="project-display-title">{mainTitle}</p>
              </div>
              <div className="config-grid-layout">
                <div className="log-card">
                  <span className="analysis-title"><i className="uil uil-key-skeleton"></i> Keywords</span>
                  <div className="keywords-flex-container">
                    {DEMO_BLOG.keywords.split(",").map((k, i) => k.trim() && <span key={i} className="keyword-tag">{k.trim()}</span>)}
                  </div>
                </div>
                <div className="log-card">
                  <span className="analysis-title"><i className="uil uil-globe"></i> Regional</span>
                  <div className="regional-config-list">
                    <div className="config-item"><span className="label">Idioma:</span><span className="count-badge remaining">{DEMO_BLOG.idioma}</span></div>
                    <div className="config-item"><span className="label">Categoría:</span><span className="count-badge total">{DEMO_BLOG.categoria}</span></div>
                    <div className="config-item"><span className="label">Técnica:</span><span className="count-badge remaining">{DEMO_BLOG.tecnica}</span></div>
                    <div className="config-item"><span className="label">Tono:</span><span className="count-badge total">{DEMO_BLOG.tono}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── CONTENEDORES PRINCIPALES ───────────────────────────── */}
        <div className="generadores-container">

          {/* ────────────────── COLUMNA IZQUIERDA ─────────────────── */}
          <div className="generadores-izquierda">

            {/* Botones de acción principales */}
            {tablaEstructuraFinal && (
              <>
                <div style={{ marginBottom: 15, display: "flex", gap: 10 }}>
                  {cargandoIA ? (
                    <button onClick={() => setCargandoIA(false)} className="btn-regenerar"><i className="uil uil-times-circle"></i> Cancelar Generación</button>
                  ) : (
                    <>
                      <button onClick={generarEsquemaDelArticulo} className="btn-estructura" disabled={cargandoIA}>Volver a Generar Estructura (IA)</button>
                      <button onClick={generarContenidoCompleto} className="btn-contenido" disabled={cargandoIA}>Generar Contenido COMPLETO</button>
                    </>
                  )}
                </div>
                <div style={{ marginBottom: 15, display: "flex", gap: 10 }}>
                  <button onClick={limpiarTodoElContenido} className="btn-estructura" style={{ flex: 1, backgroundColor: "#e74c3c" }}>
                    <i className="uil uil-trash-alt"></i> Borrar Todo el Contenido
                  </button>
                  <button
                    className={`btn-estructura ${hasUnsavedChanges && !isSaving ? "btn-active-save" : "btn-disabled"}`}
                    onClick={guardarArticulo}
                    disabled={isSaving || !hasUnsavedChanges}
                    style={{ flex: 1 }}
                  >
                    {isSaving ? <><i className="uil uil-spinner uil-spin"></i> Guardando...</> : <><i className="uil uil-save"></i> Guardar Estructura</>}
                  </button>
                </div>
              </>
            )}

            {/* Botones H2/H3/H4 */}
            <div className="add-section-controls">
              <button onClick={agregarSeccionH2} className="btn-add-h2" disabled={!tablaEstructuraFinal} title="Agregar sección principal"><i className="uil uil-plus-circle"></i> Agregar H2</button>
              <button onClick={agregarSubseccionH3} className="btn-add-h3" disabled={!selectedSectionForRegen || !tablaEstructuraFinal} title="Selecciona un H2 para agregar H3"><i className="uil uil-plus-circle"></i> Agregar H3</button>
              <button className="btn-add-h4" disabled title="Selecciona un H3 para agregar H4"><i className="uil uil-plus-circle"></i> Agregar H4</button>
            </div>

            {/* FAQs sugeridas */}
            {tablaEstructuraFinal && (
              <section className="analysis-result fade-in" style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                  <h2 className="analysis-title">Preguntas Frecuentes Sugeridas</h2>
                  <button className="btn-generate" onClick={generarFaqsDesdeEstructura} disabled={loadingFaqs} style={{ width: "auto" }}>
                    {loadingFaqs ? "Generando..." : "Generar con IA"}
                  </button>
                </div>
                {googleFaqs.length > 0 && (
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {googleFaqs.map((faq, i) => (
                      <li key={i} style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "0.5rem", padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#0369a1", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <i className="uil uil-question-circle" style={{ marginTop: 1, flexShrink: 0 }}></i>
                        {faq}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Panel edición de título */}
            <section className="analysis-result fade-in" style={{ marginTop: 20 }}>
              {selectedSectionForRegen ? (
                <>
                  <h2 className="analysis-title">
                    Editar/Regenerar: "{selectedSectionForRegen.text?.replace(/<[^>]*>/g, "")}" ({selectedSectionForRegen.level.toUpperCase()})
                  </h2>
                  <p className="result-text">Edita el texto directamente o usa IA para regenerar el título.</p>
                  <div className="regen-input-area">
                    <div className="tiptap-container titulo-editor">
                      <div style={{ borderBottom: "1px solid #e2e8f0", padding: "6px 8px", background: "#f8fafc", display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {["B", "I", "U", "H2", "H3", "🔗"].map((t, i) => (
                          <button key={i} type="button" style={{ padding: "2px 8px", border: "1px solid #e2e8f0", borderRadius: 4, background: "white", cursor: "default", fontSize: "0.75rem", color: "#64748b" }}>{t}</button>
                        ))}
                      </div>
                      <textarea
                        value={regenTextareaValue}
                        onChange={(e) => setRegenTextareaValue(e.target.value)}
                        rows={3}
                        style={{ width: "100%", padding: "0.75rem", border: "none", outline: "none", resize: "vertical", fontFamily: "inherit", fontSize: "0.9rem" }}
                        placeholder="Edita el título aquí..."
                      />
                    </div>
                  </div>
                  <div className="idea-buttons">
                    <button onClick={guardarCambiosTitulo} className="btn-generate" style={{ flexGrow: 1 }}><i className="uil uil-save"></i> Guardar Edición Local</button>
                    <button onClick={regenerarSeccion} disabled={cargandoIA} className="btn-generate btn-regenerar" style={{ flexGrow: 1 }}>
                      {cargandoIA ? `Regenerando...` : `Regenerar ${selectedSectionForRegen.level.toUpperCase()} por IA`}
                    </button>
                  </div>
                  <button onClick={() => setSelectedSectionForRegen(null)} className="btn btn-cancel" style={{ marginTop: 10, width: "100%", height: 45 }}>
                    <i className="uil uil-times"></i> Cancelar Edición
                  </button>
                </>
              ) : (
                <div className="analysis-result">
                  <h2 className="analysis-title">Panel de Edición y Regeneración de Ideas</h2>
                  <p className="text-gray-500 result-text">Selecciona un título o subtítulo de la estructura de la derecha para editarlo o regenerarlo individualmente.</p>
                </div>
              )}
            </section>

            {/* Panel edición de contenido */}
            {selectedSectionForRegen && (
              <section className="analysis-result fade-in" style={{ marginTop: 20 }}>
                <h2 className="analysis-title">
                  Editar Contenido: "{selectedSectionForRegen.text?.replace(/<[^>]*>/g, "")}" ({selectedSectionForRegen.level.toUpperCase()})
                </h2>
                <p className="result-text">Selecciona el enfoque estratégico para esta sección del blog.</p>
                <div className="select-container">
                  <label htmlFor="content-type" className="select-label"><i className="uil uil-setting"></i> ¿Qué quieres que haga la IA?</label>
                  <select id="content-type" className="select-estrategia" value={contentType} onChange={(e) => setContentType(e.target.value)} disabled={cargandoIA}>
                    <optgroup label="TEXTO GENERAL">
                      <option value="parrafo_narrativo">Escribir párrafos normales</option>
                      <option value="ia_libre">Darle libertad creativa a la IA</option>
                    </optgroup>
                    <optgroup label="FORMATOS ESPECIALES">
                      <option value="guia_paso_a_paso">Crear una guía paso a paso</option>
                      <option value="lista_beneficios_valor">Hacer una lista de puntos clave</option>
                      <option value="comparativa_pros_contras">Analizar pros y contras</option>
                      <option value="faq_seccion">Generar preguntas frecuentes (FAQ)</option>
                    </optgroup>
                    <optgroup label="PARTES DEL ARTÍCULO">
                      <option value="introduccion_gancho">Escribir una introducción interesante</option>
                      <option value="definicion_seo">Dar una definición clara y directa</option>
                      <option value="conclusion_llamada_accion">Escribir un cierre o conclusión</option>
                    </optgroup>
                    <optgroup label="TABLAS (HTML)">
                      <option value="tabla_tecnica">Tabla de Datos Técnicos</option>
                      <option value="tabla_pros_contras">Tabla de Pros y Contras</option>
                      <option value="tabla_comparativa_antes_despues">Tabla Antes vs. Después</option>
                    </optgroup>
                  </select>
                </div>
                <div className="tiptap-container contenido-editor">
                  <div style={{ borderBottom: "1px solid #e2e8f0", padding: "6px 8px", background: "#f8fafc", display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {["B", "I", "U", "H2", "H3", "• Lista", "Tabla", "🔗"].map((t, i) => (
                      <button key={i} type="button" style={{ padding: "2px 8px", border: "1px solid #e2e8f0", borderRadius: 4, background: "white", cursor: "default", fontSize: "0.75rem", color: "#64748b" }}>{t}</button>
                    ))}
                  </div>
                  <textarea
                    value={sectionContentValue}
                    onChange={(e) => setSectionContentValue(e.target.value)}
                    rows={8}
                    style={{ width: "100%", padding: "0.75rem", border: "none", outline: "none", resize: "vertical", fontFamily: "inherit", fontSize: "0.875rem" }}
                    placeholder="El contenido de esta sección aparecerá aquí después de generarlo con IA, o escríbelo manualmente..."
                  />
                </div>
                <div className="idea-buttons">
                  <button onClick={guardarContenidoLocal} className="btn-generate" disabled={cargandoIA}><i className="uil uil-save"></i> Guardar Contenido Local</button>
                  <button onClick={generarContenidoSeccion} className="btn btn-generate" disabled={cargandoIA}>
                    {cargandoIA ? <><i className="uil uil-spinner uil-spin"></i> Generando...</> : <><i className="uil uil-robot"></i> Generar Contenido (IA)</>}
                  </button>
                </div>
                <button onClick={() => { setSelectedSectionForRegen(null); setSectionContentValue(""); }} className="btn btn-cancel" style={{ marginTop: 10, width: "100%", height: 45 }} disabled={cargandoIA}>
                  <i className="uil uil-times"></i> Cancelar Edición
                </button>
              </section>
            )}
          </div>

          {/* ────────────────── COLUMNA DERECHA ───────────────────── */}
          <div className="generadores-derecha">
            <section className="idea-generator">
              <h2 className="card-title structure-title-with-toggle">
                {isEditingStructure ? <><i className="uil uil-sitemap"></i> Estructura del Blog</> : <><i className="uil uil-file-alt"></i> Vista de Documento</>}
                <div className="action-buttons-container">
                  <button className="btn-action-square" onClick={() => setIsEditingStructure(!isEditingStructure)} title={isEditingStructure ? "Ver como Documento" : "Volver a Estructura"}>
                    <i className={`uil ${isEditingStructure ? "uil-eye" : "uil-sitemap"}`}></i>
                    <span>{isEditingStructure ? "Ver Doc" : "Estructura"}</span>
                  </button>
                  <button className="btn-action-square btn-blue" onClick={() => showToast("Descarga de Word no disponible en demo.", "info")} title="Descargar Word">
                    <i className="uil uil-file-download"></i><span>Descargar</span>
                  </button>
                  <button className="btn-action-square btn-gray" onClick={() => showToast("Contenido copiado al portapapeles (demo).", "success")} title="Copiar al portapapeles">
                    <i className="uil uil-copy"></i><span>Copiar</span>
                  </button>
                </div>
              </h2>

              <div className="card-body">
                {/* Título H1 */}
                <h1 className="text-center" style={{ marginBottom: 25, fontSize: "2rem" }}>{mainTitle}</h1>

                {/* Indicador de palabras */}
                {totalGeneratedWords > 0 && (
                  <div style={{ marginBottom: 15, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span className="count-badge generated"><i className="uil uil-pen"></i> Generadas: {totalGeneratedWords} palabras</span>
                    <span className="count-badge total"><i className="uil uil-layer-group"></i> Secciones: {structureWithCount.filter((i) => i.level !== "h1").length}</span>
                  </div>
                )}

                {/* Selectores de estado / prioridad */}
                <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Estado:</span>
                    <select value={blogStatus} onChange={(e) => { setBlogStatus(e.target.value); markAsChanged(); }}
                      style={{ padding: "0.3rem 0.5rem", border: "1px solid #cbd5e1", borderRadius: "0.4rem", fontSize: "0.8rem" }}>
                      <option value="draft">Borrador</option>
                      <option value="generated">Estructura Generada</option>
                      <option value="review">En Revisión</option>
                      <option value="approved">Aprobado</option>
                      <option value="published">Publicado</option>
                      <option value="ajusted">Ajustes Aplicados</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Prioridad:</span>
                    <select value={blogPriority} onChange={(e) => { setBlogPriority(e.target.value); markAsChanged(); }}
                      style={{ padding: "0.3rem 0.5rem", border: "1px solid #cbd5e1", borderRadius: "0.4rem", fontSize: "0.8rem" }}>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>

                {/* Vista de estructura o documento */}
                {cargandoIA ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem", gap: "1rem" }}>
                    <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}></div>
                    <p style={{ color: "#64748b" }}>Generando con IA...</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                ) : isEditingStructure ? (
                  structureWithCount.length > 0
                    ? <StructureRenderer structure={structureWithCount} onSelect={seleccionarSeccionEdicion} selectedSection={selectedSectionForRegen} onAction={gestionarAccionDeSeccion} />
                    : <div className="blog-view-placeholder"><p>No hay estructura generada. Usa los botones de arriba.</p></div>
                ) : (
                  renderizarContenidoDelBlog(structureWithCount)
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  );
}
