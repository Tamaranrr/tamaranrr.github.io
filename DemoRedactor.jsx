// DemoRedactor.jsx — Demo autónomo del Redactor de Landing Pages con datos quemados
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save, Download, ArrowLeft, CheckCircle2, Clock, Eye, Edit3,
  FileText, ThumbsUp, MessageSquare, Upload,
} from "lucide-react";

// ─── DATOS DEMO ────────────────────────────────────────────────────────────────

const DEMO_PROYECTO = {
  id: "p-1",
  name: "LP Las Vegas - Alquiler de Autos",
  template: "LP Autos Las Vegas",
  proyecto: "Miles Car Rental",
  dominio: "milescarkental.com",
  status: "in_progress",
  assignedTo: "Carlos López",
  priority: "high",
};

// Columna 6 → revisado por / fecha
const DEMO_ROWS = [
  // Bloque 1 (H1)
  { id: "0-0", block: "Bloque 1",  element: "H1",                 es: "Alquiler de Autos en Las Vegas | Miles Car Rental",               en: "Car Rental in Las Vegas | Miles Car Rental",                     pt: "Aluguel de Carros em Las Vegas | Miles Car Rental",              rev: "Ana García · 02/05" },
  { id: "1-0", block: "",          element: "Descripción H1",     es: "Descubre las mejores ofertas de alquiler de autos en Las Vegas. Reserva hoy con Miles Car Rental y viaja con total libertad.", en: "Discover the best car rental deals in Las Vegas. Book today with Miles Car Rental and travel with total freedom.", pt: "Descubra as melhores ofertas de aluguel de carros em Las Vegas.", rev: "" },

  // Bloque 2 (Hero/Navegación)
  { id: "2-0", block: "Bloque 2",  element: "H2",                 es: "Alquila un Auto en Las Vegas desde $25/día",                      en: "Rent a Car in Las Vegas from $25/day",                           pt: "Alugue um Carro em Las Vegas a partir de $25/dia",              rev: "Ana García · 02/05" },
  { id: "3-0", block: "",          element: "Descripción H2",     es: "Explora la ciudad del entretenimiento con total comodidad a bordo de nuestros vehículos premium.", en: "Explore the entertainment capital of the world in total comfort with our premium vehicles.", pt: "", rev: "" },
  { id: "4-0", block: "",          element: "Texto alt (imagen)", es: "Pareja sonriente conduciendo un convertible por el Strip de Las Vegas al atardecer", en: "Smiling couple driving a convertible along the Las Vegas Strip at sunset", pt: "", rev: "" },
  { id: "5-0", block: "",          element: "IP USA",             es: "¿Buscas alquiler de autos en Las Vegas, NV? ¡Tenemos la mejor flota al mejor precio!", en: "Looking for car rental in Las Vegas, NV? We have the best fleet at the best price!", pt: "", rev: "" },
  { id: "6-0", block: "",          element: "Texto alt (imagen)", es: "Vista panorámica del Strip de Las Vegas de noche con los casinos iluminados", en: "Panoramic view of the Las Vegas Strip at night with illuminated casinos", pt: "", rev: "" },
  { id: "7-0", block: "",          element: "IP BR",              es: "Alugar carro em Las Vegas nunca foi tão fácil. Reserve agora e garanta o melhor preço!", en: "", pt: "Alugar carro em Las Vegas nunca foi tão fácil. Reserve agora e garanta o melhor preço!", rev: "" },

  // Bloque 3 (Proceso)
  { id: "8-0", block: "Bloque 3",  element: "H2",                 es: "Cómo Alquilar un Auto en Las Vegas en 3 Pasos",                   en: "How to Rent a Car in Las Vegas in 3 Steps",                      pt: "Como Alugar um Carro em Las Vegas em 3 Passos",                 rev: "María Torres · 01/05" },
  { id: "9-0", block: "",          element: "Descripción H2",     es: "Reservar tu vehículo en Miles Car Rental es rápido, seguro y completamente en línea.", en: "Booking your vehicle at Miles Car Rental is fast, secure and completely online.", pt: "Reservar seu veículo na Miles Car Rental é rápido, seguro e completamente online.", rev: "" },
  { id: "10-0", block: "",         element: "Descripción H3",     es: "Paso 1: Elige fechas y categoría. Paso 2: Selecciona tu vehículo ideal. Paso 3: Confirma la reserva y listo.", en: "Step 1: Choose dates and category. Step 2: Select your ideal vehicle. Step 3: Confirm your booking.", pt: "", rev: "" },
  { id: "11-0", block: "",         element: "Disclaimer",         es: "*Los precios pueden variar según disponibilidad y temporada. Aplican términos y condiciones.", en: "*Prices may vary depending on availability and season. Terms and conditions apply.", pt: "*Os preços podem variar conforme disponibilidade e temporada.", rev: "" },

  // Bloque 4 (FAQ)
  { id: "12-0", block: "Bloque 4", element: "H2",                 es: "Preguntas Frecuentes sobre Alquiler de Autos en Las Vegas",       en: "Frequently Asked Questions About Car Rental in Las Vegas",       pt: "Perguntas Frequentes sobre Aluguel de Carros em Las Vegas",     rev: "" },
  { id: "14-0", block: "",         element: "H3 FAQ",             es: "¿Qué documentos necesito para alquilar un auto en Las Vegas?",    en: "What documents do I need to rent a car in Las Vegas?",           pt: "Quais documentos preciso para alugar um carro em Las Vegas?",   rev: "" },
  { id: "13-0", block: "",         element: "Descripción H2",     es: "Resolvemos todas tus dudas sobre el proceso de alquiler en Las Vegas.", en: "We answer all your questions about the car rental process in Las Vegas.", pt: "", rev: "" },
  { id: "15-0", block: "",         element: "Desc. H3 FAQ",       es: "Para alquilar un auto en Las Vegas necesitas: licencia de conducir vigente, pasaporte o documento de identidad, tarjeta de crédito a tu nombre y tener al menos 21 años.", en: "To rent a car in Las Vegas you need: a valid driver's license, passport or ID, a credit card in your name, and be at least 21 years old.", pt: "", rev: "" },
  { id: "16-0", block: "",         element: "H3 FAQ",             es: "¿Es posible alquilar un auto sin tarjeta de crédito?",            en: "Is it possible to rent a car without a credit card?",            pt: "É possível alugar um carro sem cartão de crédito?",             rev: "" },
  { id: "17-0", block: "",         element: "Desc. H3 FAQ",       es: "La mayoría de las agencias requieren tarjeta de crédito como garantía. Algunas aceptan tarjetas de débito con requisitos adicionales.", en: "Most agencies require a credit card as a deposit. Some accept debit cards with additional requirements.", pt: "", rev: "" },
  { id: "18-0", block: "",         element: "H3 FAQ",             es: "¿Cuál es la edad mínima para alquilar un auto en Las Vegas?",     en: "What is the minimum age to rent a car in Las Vegas?",            pt: "Qual é a idade mínima para alugar um carro em Las Vegas?",      rev: "" },
  { id: "19-0", block: "",         element: "Desc. H3 FAQ",       es: "La edad mínima es 21 años. Los conductores entre 21 y 24 años pueden estar sujetos a un cargo adicional por conductor joven.", en: "The minimum age is 21 years. Drivers between 21 and 24 may be subject to an additional young driver fee.", pt: "", rev: "" },
  { id: "20-0", block: "",         element: "Disclaimer",         es: "*Información sujeta a cambios según políticas de cada arrendadora.", en: "*Information subject to change per each agency's policies.",     pt: "",                                                             rev: "" },

  // Bloque 5 (Por qué alquilar en LV)
  { id: "21-0", block: "Bloque 5", element: "H2",                 es: "¿Por Qué Alquilar un Auto para Explorar Las Vegas?",              en: "Why Rent a Car to Explore Las Vegas?",                           pt: "Por que Alugar um Carro para Explorar Las Vegas?",             rev: "" },
  { id: "22-0", block: "",         element: "Descripción H2",     es: "Las Vegas ofrece mucho más que el Strip. Con tu propio vehículo podrás descubrir el Parque Nacional del Gran Cañón, la Represa Hoover y el Valle de la Muerte.", en: "Las Vegas offers much more than the Strip. With your own vehicle you can discover the Grand Canyon National Park, Hoover Dam, and Death Valley.", pt: "", rev: "" },
  { id: "23-0", block: "",         element: "H3",                 es: "Mejores Destinos Cerca de Las Vegas",                             en: "Best Destinations Near Las Vegas",                               pt: "Melhores Destinos Perto de Las Vegas",                          rev: "" },
  { id: "24-0", block: "",         element: "Descripción H3",     es: "Gran Cañón (4h), Valle de la Muerte (2h), Parque Zion (2.5h), Area 51 (1.5h), Lake Mead (30min). Cada destino es una aventura única.", en: "Grand Canyon (4h), Death Valley (2h), Zion National Park (2.5h), Area 51 (1.5h), Lake Mead (30min).", pt: "", rev: "" },

  // Bloque 6 (CTA)
  { id: "25-0", block: "Bloque 6", element: "H2 CTA",             es: "Reserva tu Auto en Las Vegas Hoy y Ahorra",                       en: "Book Your Las Vegas Car Today and Save",                         pt: "Reserve seu Carro em Las Vegas Hoje e Economize",              rev: "" },
  { id: "26-0", block: "",         element: "Texto CTA",          es: "Aprovecha nuestras tarifas especiales y comienza tu aventura en Las Vegas con Miles Car Rental. Sin cargos ocultos, sin sorpresas.", en: "Take advantage of our special rates and start your Las Vegas adventure with Miles Car Rental. No hidden charges, no surprises.", pt: "Aproveite nossas tarifas especiais e comece sua aventura em Las Vegas.", rev: "" },
  { id: "27-0", block: "",         element: "Disclaimer final",   es: "*Tarifas sujetas a disponibilidad. Precio final puede incluir impuestos y cargos locales. Condiciones de la oferta disponibles en el sitio web.", en: "*Rates subject to availability. Final price may include taxes and local fees.", pt: "*Tarifas sujeitas à disponibilidade. Condições disponíveis no site.", rev: "" },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "review",       label: "Pendiente de Redacción" },
  { value: "in_progress",  label: "En Redacción"           },
  { value: "pen_review",   label: "Pendiente de Revisión"  },
  { value: "pen_ajuste",   label: "Pendiente de Ajuste"    },
  { value: "ajuste_aplicado", label: "Ajuste Aplicado"     },
  { value: "approved",     label: "Aprobado"               },
  { value: "rev_kws",      label: "Pendiente KWS"          },
  { value: "cargue",       label: "Cargue"                 },
  { value: "en_it",        label: "En IT"                  },
  { value: "test",         label: "Test"                   },
  { value: "completed",    label: "Publicado"              },
];

const STATUS_COLOR = {
  in_progress: "#3b82f6", completed: "#10b981", review: "#8b5cf6", pen_review: "#f59e0b",
  pen_ajuste: "#ef4444",  approved: "#059669",  draft: "#6b7280",
  ajuste_aplicado: "#8044ef", rev_kws: "#E3AAAA", cargue: "#0ea5e9", en_it: "#6366f1", test: "#f97316",
};

const BLOCK_COLORS = {
  "Bloque 1": "#dbeafe",
  "Bloque 2": "#dcfce7",
  "Bloque 3": "#fef9c3",
  "Bloque 4": "#fce7f3",
  "Bloque 5": "#ede9fe",
  "Bloque 6": "#ffedd5",
};

function getCellBg(blockLabel) {
  return BLOCK_COLORS[blockLabel] || "white";
}

// ─── COMPONENTES PEQUEÑOS ──────────────────────────────────────────────────────

function Toast({ msg, type }) {
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999, background: type === "error" ? "#fee2e2" : "#dcfce7", color: type === "error" ? "#dc2626" : "#15803d", padding: "0.75rem 1.25rem", borderRadius: "0.75rem", fontWeight: 600, fontSize: "0.875rem", boxShadow: "0 4px 12px rgba(0,0,0,.15)", display: "flex", alignItems: "center", gap: 8 }}>
      {type === "error" ? "✕" : "✓"} {msg}
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLOR[status] || "#6b7280";
  const label = STATUS_OPTIONS.find((s) => s.value === status)?.label || status;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.3rem 0.75rem", background: `${c}20`, color: c, borderRadius: 9999, fontSize: "0.8rem", fontWeight: 600, border: `1px solid ${c}40` }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }}></span>
      {label}
    </div>
  );
}

// ─── PANEL DE ANOTACIONES ─────────────────────────────────────────────────────

function AnnotationPanel({ cellId, existingAnnotations, onClose, onSave }) {
  const [text, setText] = useState("");
  const [annotations, setAnnotations] = useState(existingAnnotations || []);

  const handleAdd = () => {
    if (!text.trim()) return;
    const note = { id: Date.now(), text: text.trim(), author: "Ana García", date: new Date().toLocaleString("es-ES", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) };
    const updated = [note, ...annotations];
    setAnnotations(updated);
    onSave(cellId, updated);
    setText("");
  };

  const handleDelete = (id) => {
    const updated = annotations.filter((a) => a.id !== id);
    setAnnotations(updated);
    onSave(cellId, updated);
  };

  return (
    <div style={{ position: "fixed", right: "1.5rem", top: "5rem", zIndex: 1001, background: "#fffbeb", border: "1px solid #f59e0b", borderRadius: "0.75rem", padding: "1rem", boxShadow: "0 8px 24px rgba(0,0,0,.15)", width: 320, maxHeight: "70vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #fbbf24" }}>
        <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#92400e" }}>
          Anotaciones — celda {cellId}
          {annotations.length > 0 && <span style={{ fontWeight: 400, marginLeft: 6 }}>({annotations.length})</span>}
        </h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#92400e", lineHeight: 1 }}>×</button>
      </div>

      {annotations.length > 0 && (
        <div style={{ marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: 6 }}>
          {annotations.map((a, i) => (
            <div key={a.id} style={{ background: i === 0 ? "#fef3c7" : "#fffbeb", border: "1px solid #fbbf24", borderRadius: 6, padding: "0.6rem 0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: "0.72rem", color: "#b45309" }}><strong>{a.author}</strong> · {a.date}{i === 0 && <span style={{ marginLeft: 4, background: "#f59e0b", color: "white", padding: "0 4px", borderRadius: 2, fontSize: "0.65rem" }}>RECIENTE</span>}</span>
                <button onClick={() => handleDelete(a.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: "0.8rem", lineHeight: 1 }}>×</button>
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#78350f", lineHeight: 1.5 }}>{a.text}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p style={{ margin: "0 0 6px 0", fontSize: "0.8rem", fontWeight: 600, color: "#92400e" }}>✏️ Nueva anotación</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu anotación... (Ctrl+Enter para guardar)" rows={3} style={{ width: "100%", padding: "0.5rem", border: "1px solid #d97706", borderRadius: 4, fontSize: "0.8rem", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) { e.preventDefault(); handleAdd(); } }}/>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ padding: "0.4rem 0.75rem", border: "1px solid #d1d5db", borderRadius: 4, background: "white", cursor: "pointer", fontSize: "0.8rem" }}>Cancelar</button>
          <button onClick={handleAdd} disabled={!text.trim()} style={{ padding: "0.4rem 0.75rem", border: "none", borderRadius: 4, background: text.trim() ? "#f59e0b" : "#e5e7eb", color: "white", cursor: text.trim() ? "pointer" : "not-allowed", fontSize: "0.8rem", fontWeight: 600 }}>Agregar</button>
        </div>
      </div>
    </div>
  );
}

// ─── CELDA EDITABLE ────────────────────────────────────────────────────────────

function EditableCell({ value, onChange, lang }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  const startEdit = () => { setDraft(value); setEditing(true); setTimeout(() => ref.current?.focus(), 50); };
  const commit = () => { onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  const langColors = { es: "#dbeafe", en: "#dcfce7", pt: "#fef9c3" };
  const bg = langColors[lang] || "transparent";

  if (editing) {
    return (
      <textarea ref={ref} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => { if (e.key === "Escape") cancel(); if (e.key === "Enter" && e.shiftKey) { e.preventDefault(); commit(); } }} rows={3} style={{ width: "100%", padding: "6px 8px", border: "2px solid #3b82f6", borderRadius: 4, fontSize: "0.8rem", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", background: "white", lineHeight: 1.5, minHeight: 60 }}/>
    );
  }

  return (
    <div onClick={startEdit} title="Clic para editar" style={{ minHeight: 36, padding: "6px 8px", borderRadius: 4, cursor: "text", fontSize: "0.8rem", lineHeight: 1.5, color: value ? "#1e293b" : "#9ca3af", background: value ? bg : "#f9fafb", border: "1px solid transparent", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#93c5fd")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
    >
      {value || <em style={{ color: "#9ca3af" }}>Clic para redactar...</em>}
    </div>
  );
}

// ─── REDACTOR PRINCIPAL ────────────────────────────────────────────────────────

export default function DemoRedactor() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(DEMO_ROWS);
  const [status, setStatus] = useState(DEMO_PROYECTO.status);
  const [annotations, setAnnotations] = useState({});      // { cellId: [{...}] }
  const [annotationPanel, setAnnotationPanel] = useState(null); // cellId
  const [toast, setToast] = useState(null);
  const [saved, setSaved] = useState(false);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };

  const handleCellChange = (rowId, field, value) => {
    setRows((prev) => prev.map((r) => r.id === rowId ? { ...r, [field]: value } : r));
    setSaved(false);
  };

  const handleAnnotationSave = (cellId, notes) => {
    setAnnotations((prev) => ({ ...prev, [cellId]: notes }));
  };

  const handleSave = () => {
    setSaved(true);
    showToast("Cambios guardados exitosamente");
  };

  const handleDownload = () => {
    showToast("Descargando archivo Excel... (simulado en demo)", "success");
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    const label = STATUS_OPTIONS.find((s) => s.value === newStatus)?.label || newStatus;
    showToast(`Estado cambiado a: ${label}`);
  };

  // Agrupar filas por bloque para colspan visual
  const blockGroups = {};
  rows.forEach((r) => {
    if (r.block) {
      blockGroups[r.id] = r.block;
    }
  });

  // Calcular rowspan por bloque
  let currentBlock = null;
  let blockStart = null;
  const blockRowSpan = {};
  rows.forEach((r, i) => {
    if (r.block) {
      if (currentBlock !== null) {
        blockRowSpan[blockStart] = i - blockStart;
      }
      currentBlock = r.block;
      blockStart = i;
    }
    if (i === rows.length - 1 && blockStart !== null) {
      blockRowSpan[blockStart] = i - blockStart + 1;
    }
  });

  const sc = STATUS_COLOR[status] || "#6b7280";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "Inter, Segoe UI, system-ui, sans-serif" }}>
      {toast && <Toast {...toast} />}

      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 4px rgba(0,0,0,.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <button onClick={() => navigate("/demo-dashboard")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 0.875rem", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, color: "#475569", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
            <ArrowLeft size={16}/> Volver
          </button>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {DEMO_PROYECTO.name}
            </h1>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>
              {DEMO_PROYECTO.proyecto} · {DEMO_PROYECTO.template} · {DEMO_PROYECTO.dominio}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          {/* Demo badge */}
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontWeight: 700, color: "#92400e" }}>DEMO</div>

          {/* Status select */}
          <select value={status} onChange={(e) => handleStatusChange(e.target.value)} style={{ padding: "0.4rem 0.75rem", border: `1px solid ${sc}`, borderRadius: 6, fontSize: "0.8rem", fontWeight: 600, color: sc, background: `${sc}12`, cursor: "pointer" }}>
            {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>

          {/* Save */}
          <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", background: saved ? "#10b981" : "#3b82f6", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
            {saved ? <><CheckCircle2 size={15}/> Guardado</> : <><Save size={15}/> Guardar</>}
          </button>

          {/* Download */}
          <button onClick={handleDownload} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1rem", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}>
            <Download size={15}/> Descargar
          </button>
        </div>
      </header>

      {/* Info bar */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0.6rem 2rem", display: "flex", gap: "2rem", alignItems: "center" }}>
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}><strong style={{ color: "#374151" }}>Asignado:</strong> {DEMO_PROYECTO.assignedTo}</div>
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}><strong style={{ color: "#374151" }}>Estado:</strong> <StatusBadge status={status}/></div>
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}><strong style={{ color: "#374151" }}>Proyecto:</strong> {DEMO_PROYECTO.proyecto}</div>
        <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#94a3b8" }}>Haz clic en cualquier celda para editar · 📝 para anotaciones</div>
      </div>

      {/* Tabla principal */}
      <div style={{ padding: "1.5rem 2rem" }}>
        <div style={{ background: "white", borderRadius: "0.75rem", boxShadow: "0 1px 6px rgba(0,0,0,.08)", border: "1px solid #e2e8f0", overflow: "hidden" }}>

          {/* Leyenda de idiomas */}
          <div style={{ padding: "0.75rem 1.5rem", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", gap: "1.5rem", alignItems: "center", fontSize: "0.8rem" }}>
            <span style={{ fontWeight: 700, color: "#374151" }}>Leyenda:</span>
            {[["#dbeafe","Español"],["#dcfce7","Inglés"],["#fef9c3","Portugués"]].map(([bg, lang]) => (
              <span key={lang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 14, height: 14, background: bg, border: "1px solid #d1d5db", borderRadius: 3, display: "inline-block" }}></span>
                {lang}
              </span>
            ))}
            <span style={{ marginLeft: "auto", color: "#94a3b8" }}>Shift+Enter para confirmar edición · Esc para cancelar</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 90  }}/>  {/* Bloque */}
                <col style={{ width: 150 }}/>  {/* Elemento */}
                <col style={{ width: "calc((100% - 240px - 120px - 80px) / 3)" }}/> {/* ES */}
                <col style={{ width: "calc((100% - 240px - 120px - 80px) / 3)" }}/> {/* EN */}
                <col style={{ width: "calc((100% - 240px - 120px - 80px) / 3)" }}/> {/* PT */}
                <col style={{ width: 120 }}/>  {/* Revisado */}
                <col style={{ width: 80  }}/>  {/* Acciones */}
              </colgroup>
              <thead style={{ background: "#1e293b" }}>
                <tr>
                  {["Bloque","Elemento","🇪🇸 Español","🇬🇧 Inglés","🇧🇷 Portugués","Revisado",""].map((h, i) => (
                    <th key={i} style={{ padding: "0.75rem 0.875rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: i < 5 ? "white" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em", borderRight: i < 6 ? "1px solid #334155" : "none" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIdx) => {
                  const isBlockStart = !!row.block;
                  const span = blockRowSpan[rowIdx];
                  const blockBg = isBlockStart ? getCellBg(row.block) : "";
                  const hasAnnotations = (annotations[row.id] || []).length > 0;
                  const isOpen = annotationPanel === row.id;

                  return (
                    <tr key={row.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      {/* Bloque (merged) */}
                      {isBlockStart && (
                        <td rowSpan={span} style={{ padding: "0.5rem", background: blockBg, borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", verticalAlign: "middle", textAlign: "center" }}>
                          <span style={{ display: "inline-block", writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", fontSize: "0.7rem", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {row.block}
                          </span>
                        </td>
                      )}
                      {/* Elemento */}
                      <td style={{ padding: "0.5rem 0.75rem", background: "#fafafa", borderRight: "1px solid #e2e8f0", fontSize: "0.78rem", fontWeight: 600, color: "#374151", verticalAlign: "top", whiteSpace: "nowrap" }}>
                        {row.element}
                      </td>
                      {/* ES */}
                      <td style={{ padding: "0.5rem", borderRight: "1px solid #e2e8f0", verticalAlign: "top" }}>
                        <EditableCell value={row.es} lang="es" onChange={(v) => handleCellChange(row.id, "es", v)}/>
                      </td>
                      {/* EN */}
                      <td style={{ padding: "0.5rem", borderRight: "1px solid #e2e8f0", verticalAlign: "top" }}>
                        <EditableCell value={row.en} lang="en" onChange={(v) => handleCellChange(row.id, "en", v)}/>
                      </td>
                      {/* PT */}
                      <td style={{ padding: "0.5rem", borderRight: "1px solid #e2e8f0", verticalAlign: "top" }}>
                        <EditableCell value={row.pt} lang="pt" onChange={(v) => handleCellChange(row.id, "pt", v)}/>
                      </td>
                      {/* Revisado */}
                      <td style={{ padding: "0.5rem 0.75rem", borderRight: "1px solid #e2e8f0", verticalAlign: "top" }}>
                        {row.rev ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <CheckCircle2 size={13} style={{ color: "#10b981", flexShrink: 0 }}/>
                            <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>{row.rev}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: "0.72rem", color: "#d1d5db" }}>—</span>
                        )}
                      </td>
                      {/* Acciones */}
                      <td style={{ padding: "0.4rem", verticalAlign: "top" }}>
                        <button
                          onClick={() => setAnnotationPanel(isOpen ? null : row.id)}
                          title="Anotaciones"
                          style={{ position: "relative", padding: "0.35rem", background: isOpen ? "#fef3c7" : hasAnnotations ? "#fffbeb" : "#f9fafb", border: `1px solid ${isOpen ? "#f59e0b" : hasAnnotations ? "#fbbf24" : "#e2e8f0"}`, borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <MessageSquare size={14} style={{ color: isOpen ? "#f59e0b" : hasAnnotations ? "#d97706" : "#9ca3af" }}/>
                          {hasAnnotations && (
                            <span style={{ position: "absolute", top: -4, right: -4, background: "#f59e0b", color: "white", borderRadius: "50%", width: 14, height: 14, fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                              {(annotations[row.id] || []).length}
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Barra de acciones inferior */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "1rem 1.5rem", marginTop: "1rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>Cambiar estado:</span>
          {["pen_review","approved","cargue"].map((s) => {
            const opt = STATUS_OPTIONS.find((o) => o.value === s);
            const c = STATUS_COLOR[s] || "#6b7280";
            return (
              <button key={s} onClick={() => handleStatusChange(s)} style={{ padding: "0.4rem 0.875rem", background: `${c}15`, color: c, border: `1px solid ${c}40`, borderRadius: 6, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>
                {opt?.label}
              </button>
            );
          })}
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem" }}>
            <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1.25rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}>
              <Save size={15}/> Guardar cambios
            </button>
            <button onClick={handleDownload} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.5rem 1.25rem", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}>
              <Download size={15}/> Exportar Excel
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          Modo demo — los cambios no persisten al recargar la página
        </p>
      </div>

      {/* Panel de anotaciones */}
      {annotationPanel && (
        <AnnotationPanel
          cellId={annotationPanel}
          existingAnnotations={annotations[annotationPanel] || []}
          onClose={() => setAnnotationPanel(null)}
          onSave={handleAnnotationSave}
        />
      )}
    </div>
  );
}
