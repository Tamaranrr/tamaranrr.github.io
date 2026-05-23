// DemoBlog.jsx — Demo autónomo del sistema de blogs con datos quemados
import React, { useState, useMemo } from "react";
import "@iconscout/unicons/css/line.css";
import "./css/dashboard_Blog.css";

// ─── DATOS DEMO ────────────────────────────────────────────────────────────────

const DEMO_CURRENT_USER = {
  id: "user-1",
  name: "Ana García",
  first_name: "Ana",
  last_name: "García",
  email: "ana@redactoria.com",
};

const DEMO_USERS = [
  { id: "user-1", name: "Ana García", email: "ana@redactoria.com" },
  { id: "user-2", name: "Carlos López", email: "carlos@redactoria.com" },
  { id: "user-3", name: "María Torres", email: "maria@redactoria.com" },
];

const INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "Guía completa de arriendo de carros en Colombia 2024",
    categoria: "Arriendo",
    estado: "published",
    prioridad: "Alta",
    assigned_to: "user-1",
    last_modified: "2024-05-01T10:30:00",
    keywords: "arriendo carros, colombia, 2024, requisitos",
    idioma: "Español",
    tecnica: "Guía de Trámites",
    tono: "Profesional",
    acento: "Colombia",
    estimated_word_count: 1450,
  },
  {
    id: "blog-2",
    title: "5 destinos imperdibles para tus vacaciones en Europa",
    categoria: "Viajemos",
    estado: "generated",
    prioridad: "Alta",
    assigned_to: "user-2",
    last_modified: "2024-05-02T14:20:00",
    keywords: "europa, viajes, vacaciones, turismo internacional",
    idioma: "Español",
    tecnica: "Top y Curiosidades",
    tono: "Cercano y Entusiasta",
    acento: "Neutral",
    estimated_word_count: 1280,
  },
  {
    id: "blog-3",
    title: "¿Qué debes saber antes de firmar un contrato de arrendamiento?",
    categoria: "Guia legal",
    estado: "review",
    prioridad: "Media",
    assigned_to: "user-3",
    last_modified: "2024-05-03T09:15:00",
    keywords: "contrato arrendamiento, derechos inquilino, colombia",
    idioma: "Español",
    tecnica: "Explicativa Educativa",
    tono: "Formal",
    acento: "Neutral",
    estimated_word_count: 1100,
  },
  {
    id: "blog-4",
    title: "Tendencias de viaje en Latinoamérica para 2025",
    categoria: "Viajemos",
    estado: "draft",
    prioridad: "Baja",
    assigned_to: null,
    last_modified: "2024-05-04T16:45:00",
    keywords: "tendencias turismo, latinoamérica 2025",
    idioma: "Español",
    tecnica: "SEO Narrativo",
    tono: "Inspirador",
    acento: "Colombia",
    estimated_word_count: 0,
  },
  {
    id: "blog-5",
    title: "Requisitos legales para arrendar una propiedad en Colombia",
    categoria: "Guia legal",
    estado: "approved",
    prioridad: "Media",
    assigned_to: "user-2",
    last_modified: "2024-04-28T11:30:00",
    keywords: "requisitos legales, arrendamiento, colombia",
    idioma: "Español",
    tecnica: "Análisis de Normativas",
    tono: "Analítico",
    acento: "Colombia",
    estimated_word_count: 1320,
  },
  {
    id: "blog-6",
    title: "Las mejores playas del Pacífico colombiano: guía viajera",
    categoria: "Viajemos",
    estado: "published",
    prioridad: "Alta",
    assigned_to: "user-3",
    last_modified: "2024-04-25T08:00:00",
    keywords: "playas colombia, pacífico, turismo nacional",
    idioma: "Español",
    tecnica: "Guía de Destino",
    tono: "Amigable",
    acento: "Colombia",
    estimated_word_count: 1600,
  },
  {
    id: "blog-7",
    title: "Arriendo a largo plazo vs. compra de vivienda: ¿qué conviene?",
    categoria: "Arriendo",
    estado: "ajusted",
    prioridad: "Media",
    assigned_to: "user-1",
    last_modified: "2024-04-22T15:20:00",
    keywords: "arriendo largo plazo, compra vivienda, inversión",
    idioma: "Español",
    tecnica: "Comparativa de Precios",
    tono: "Directo",
    acento: "Neutral",
    estimated_word_count: 980,
  },
  {
    id: "blog-8",
    title: "Guía legal para extranjeros que quieren arrendar en Colombia",
    categoria: "Guia legal",
    estado: "draft",
    prioridad: "Baja",
    assigned_to: null,
    last_modified: "2024-04-20T10:00:00",
    keywords: "extranjeros colombia, arrendamiento, visa, permisos",
    idioma: "Español",
    tecnica: "Explicativa Educativa",
    tono: "Profesional",
    acento: "Neutral",
    estimated_word_count: 0,
  },
];

// Contenido HTML generado (simulado) por blog
const FAKE_CONTENT = {
  "blog-1": `
    <h1>Guía completa de arriendo de carros en Colombia 2024</h1>
    <p>Arrendar un carro en Colombia es una de las formas más convenientes de movilizarse por el país, ya sea para vacaciones, viajes de negocios o simplemente para explorar nuevos destinos. Sin embargo, el proceso puede generar dudas si no estás familiarizado con los requisitos y procedimientos locales.</p>
    <h2>¿Qué documentos necesitas?</h2>
    <p>Para arrendar un vehículo en Colombia, generalmente deberás presentar los siguientes documentos:</p>
    <ul>
      <li><strong>Licencia de conducción vigente:</strong> Colombiana o internacional, según tu origen.</li>
      <li><strong>Documento de identidad:</strong> Cédula de ciudadanía o pasaporte.</li>
      <li><strong>Tarjeta de crédito:</strong> La mayoría de arrendadoras la requieren como garantía.</li>
      <li><strong>Mayoría de edad:</strong> Debes tener mínimo 18 años; algunas empresas exigen 21.</li>
    </ul>
    <h2>Costos y tarifas en 2024</h2>
    <p>Los precios del arriendo varían según el tipo de vehículo, la duración y la temporada. En promedio, un vehículo compacto puede costar entre <strong>$120.000 y $180.000 COP por día</strong>, mientras que los SUV de gama alta pueden superar los $350.000 COP diarios.</p>
    <h2>Consejos antes de firmar el contrato</h2>
    <p>Antes de retirar el vehículo, realiza una inspección detallada y documenta con fotos cualquier daño preexistente. Revisa las coberturas de seguro incluidas y pregunta por las condiciones de devolución del combustible.</p>
    <h2>Conclusión</h2>
    <p>Con la documentación correcta y la empresa adecuada, arrendar un carro en Colombia es un proceso sencillo que te abrirá las puertas a una movilidad total en el país. ¡Explora Colombia a tu propio ritmo!</p>
  `,
  "blog-2": `
    <h1>5 destinos imperdibles para tus vacaciones en Europa</h1>
    <p>Europa es un continente que nunca deja de sorprender. Desde sus majestuosas ciudades medievales hasta sus playas cristalinas del Mediterráneo, el Viejo Continente ofrece experiencias únicas para cada tipo de viajero. Aquí te presentamos los 5 destinos que no puedes dejar de visitar.</p>
    <h2>1. Barcelona, España: Arte, Diseño y Vida Mediterránea</h2>
    <p>Barcelona combina a la perfección la arquitectura modernista de Gaudí, el animado barrio Gótico y las playas urbanas del Mediterráneo. No te pierdas la Sagrada Familia, el Parque Güell ni el mercado de La Boqueria. La gastronomía catalana y la vida nocturna en el barrio del Born son el complemento perfecto.</p>
    <h2>2. Praga, República Checa: La Ciudad de las Cien Torres</h2>
    <p>Con su castillo medieval que domina el horizonte y su famoso Puente de Carlos, Praga es un sueño para los amantes de la historia. Caminar por el casco histórico declarado Patrimonio de la Humanidad es como viajar al pasado.</p>
    <h2>3. Santorini, Grecia: El Paraíso del Egeo</h2>
    <p>Las icónicas casas blancas con cúpulas azules de Oia son uno de los paisajes más fotografiados del mundo. Santorini ofrece atardeceres incomparables, vinos locales únicos cultivados en suelo volcánico y aguas cristalinas para el buceo.</p>
    <h2>4. Ámsterdam, Países Bajos: Canales, Cultura y Diversidad</h2>
    <p>Ámsterdam enamora con su red de canales, sus casas angostas del siglo XVII y su extraordinaria oferta museística. El Rijksmuseum, el Museo Van Gogh y la Casa de Ana Frank son visitas obligadas para quienes buscan arte e historia.</p>
    <h2>5. Lisboa, Portugal: Fado, Sol y Mar</h2>
    <p>Lisboa es quizás la capital europea más auténtica y asequible. Sus tranvías históricos, los miradores (miradouros), la arquitectura Manuelina y los pastéis de Belém la convierten en una ciudad con alma propia que conquista a cada viajero.</p>
    <h2>Consejos Prácticos</h2>
    <p>Para optimizar tu viaje, te recomendamos viajar en temporada baja (octubre a abril) para evitar las multitudes y obtener mejores tarifas. Reserva con antelación tus alojamientos en las ciudades más demandadas como Barcelona y Santorini.</p>
  `,
  "blog-3": `
    <h1>¿Qué debes saber antes de firmar un contrato de arrendamiento?</h1>
    <p>El contrato de arrendamiento es el documento legal que establece los derechos y obligaciones de arrendador e inquilino. Conocer sus cláusulas esenciales puede evitarte costosos malentendidos y proteger tus intereses desde el primer día.</p>
    <h2>Elementos esenciales del contrato</h2>
    <p>Todo contrato de arrendamiento válido en Colombia debe contener:</p>
    <ul>
      <li>Identificación completa de las partes (arrendador e inquilino)</li>
      <li>Descripción detallada del inmueble y su estado</li>
      <li>Canon mensual de arrendamiento y forma de pago</li>
      <li>Duración del contrato y condiciones de renovación</li>
      <li>Depósito de garantía o fianza</li>
    </ul>
    <h2>Derechos del inquilino según la Ley 820 de 2003</h2>
    <p>La normativa colombiana protege al arrendatario con derechos fundamentales como el preaviso mínimo de tres meses para desahucio, la limitación de incrementos anuales del canon al IPC, y el derecho a recibir el inmueble en condiciones habitables.</p>
    <h2>Cláusulas que debes revisar con especial atención</h2>
    <p>Presta especial atención a las cláusulas sobre servicios públicos, mascotas, subarrendamiento y las condiciones de restitución del depósito. Cualquier ambigüedad en estas secciones puede generar conflictos al momento de terminar el contrato.</p>
    <h2>Recomendaciones antes de firmar</h2>
    <p>Si tienes dudas sobre alguna cláusula, consulta con un abogado especialista antes de firmar. Fotografía el estado del inmueble el día del ingreso y guarda todos los comprobantes de pago durante la vigencia del contrato.</p>
  `,
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────

const STATUS_META = {
  draft:     { label: "Borrador",           icon: "uil-edit-alt",     cls: "status-draft"      },
  generated: { label: "Estructura Generada",icon: "uil-layer-group",  cls: "status-generated"  },
  review:    { label: "En Revisión",         icon: "uil-clock",        cls: "status-review"     },
  approved:  { label: "Aprobado",            icon: "uil-check-circle", cls: "status-approved"   },
  published: { label: "Publicado",           icon: "uil-rocket",       cls: "status-published"  },
  ajusted:   { label: "Ajustes Aplicados",   icon: "uil-sync",         cls: "status-ajusted"    },
};

const formatDate = (str) => {
  if (!str) return "N/A";
  return new Date(str).toLocaleDateString("es-ES", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });
};

const getUserName = (userId) =>
  DEMO_USERS.find((u) => u.id === userId)?.name || "Sin asignar";

// ─── MODALES ───────────────────────────────────────────────────────────────────

function ModalCreacion({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "", categoria: "", keywords: "",
    idioma: "Español", prioridad: "Baja",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      ...form,
      id: `blog-demo-${Date.now()}`,
      estado: "draft",
      assigned_to: null,
      last_modified: new Date().toISOString(),
      tecnica: "", tono: "", acento: "",
      estimated_word_count: 0,
    };
    onSave(newBlog);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Generar Idea y Borrador Inicial</h2>
          <button className="btn-close" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }}>
            <i className="uil uil-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Título del Blog / Tema Central</label>
            <input
              type="text" required placeholder="Ej: Tendencias de arriendo en 2024"
              value={form.title} onChange={(e) => set("title", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Categoría</label>
            <select required value={form.categoria} onChange={(e) => set("categoria", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
              <option value="">Seleccionar...</option>
              <option value="Arriendo">Arriendo</option>
              <option value="Viajemos">Viajemos</option>
              <option value="Guia legal">Guía Legal</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Keywords Secundarias</label>
            <textarea rows="2" placeholder="Separa con comas (ej: impuestos, contrato)"
              value={form.keywords} onChange={(e) => set("keywords", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Idioma</label>
              <select value={form.idioma} onChange={(e) => set("idioma", e.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
                <option value="Español">Español</option>
                <option value="Inglés">Inglés</option>
                <option value="Portugués">Portugués</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Prioridad</label>
              <select value={form.prioridad} onChange={(e) => set("prioridad", e.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <button type="button" onClick={onClose}
              style={{ padding: "0.6rem 1.25rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", background: "white", cursor: "pointer" }}>
              Cancelar
            </button>
            <button type="submit" disabled={!form.categoria}
              style={{ padding: "0.6rem 1.25rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
              Crear Borrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalEdicion({ blog, onClose, onSave }) {
  const [form, setForm] = useState({
    title: blog.title, categoria: blog.categoria,
    estado: blog.estado, prioridad: blog.prioridad, keywords: blog.keywords,
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Blog</h2>
          <button className="btn-close" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }}>
            <i className="uil uil-times"></i>
          </button>
        </div>
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Título</label>
            <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Keywords</label>
            <textarea rows="2" value={form.keywords} onChange={(e) => set("keywords", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Categoría</label>
              <select value={form.categoria} onChange={(e) => set("categoria", e.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
                <option value="Arriendo">Arriendo</option>
                <option value="Viajemos">Viajemos</option>
                <option value="Guia legal">Guía Legal</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Estado</label>
              <select value={form.estado} onChange={(e) => set("estado", e.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
                <option value="draft">Borrador</option>
                <option value="generated">Estructura Generada</option>
                <option value="review">En Revisión</option>
                <option value="approved">Aprobado</option>
                <option value="published">Publicado</option>
                <option value="ajusted">Ajustes Aplicados</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Prioridad</label>
            <select value={form.prioridad} onChange={(e) => set("prioridad", e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <button onClick={onClose}
              style={{ padding: "0.6rem 1.25rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", background: "white", cursor: "pointer" }}>
              Cancelar
            </button>
            <button onClick={() => { onSave(blog.id, form); onClose(); }}
              style={{ padding: "0.6rem 1.25rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAsignacion({ blog, onClose, onSave }) {
  const [selected, setSelected] = useState(blog.assigned_to || "");
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Asignar Usuario</h2>
          <button className="btn-close" onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.4rem" }}>
            <i className="uil uil-times"></i>
          </button>
        </div>
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ color: "#64748b", margin: 0 }}>Blog: <strong>{blog.title}</strong></p>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Asignar a</label>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}
              style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem" }}>
              <option value="">Sin asignar</option>
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button onClick={onClose}
              style={{ padding: "0.6rem 1.25rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", background: "white", cursor: "pointer" }}>
              Cancelar
            </button>
            <button onClick={() => { onSave(blog.id, selected || null); onClose(); }}
              style={{ padding: "0.6rem 1.25rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VISTA EDITOR ──────────────────────────────────────────────────────────────

function VistaEditor({ blog, onBack, onEstadoChange }) {
  const [estado, setEstado] = useState(blog.estado);
  const [generando, setGenerando] = useState(false);
  const [generado, setGenerado] = useState(!!FAKE_CONTENT[blog.id]);

  const content = FAKE_CONTENT[blog.id];

  const handleGenerar = () => {
    setGenerando(true);
    setTimeout(() => {
      setGenerando(false);
      setGenerado(true);
      setEstado("generated");
      onEstadoChange(blog.id, "generated");
    }, 2200);
  };

  const handleEstadoChange = (nuevoEstado) => {
    setEstado(nuevoEstado);
    onEstadoChange(blog.id, nuevoEstado);
  };

  const meta = STATUS_META[estado] || STATUS_META.draft;

  return (
    <div style={{ background: "#e6e6e6", minHeight: "100vh", fontFamily: "Inter, Segoe UI, system-ui, sans-serif" }}>
      {/* Navbar */}
      <header style={{
        background: "white", borderBottom: "1px solid #e2e8f0",
        padding: "0.75rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
            Editor <span style={{ color: "#3b82f6" }}>Blog</span>
          </h1>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", fontWeight: 500, maxWidth: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {blog.title}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className={`badge ${meta.cls}`}>
            <i className={`uil ${meta.icon}`}></i> {meta.label}
          </span>
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.6rem 1.2rem", background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: "0.75rem", cursor: "pointer", fontWeight: 700, color: "#475569", fontSize: "0.85rem",
          }}>
            <i className="uil uil-arrow-left" style={{ fontSize: "1.1rem" }}></i> Volver al Dashboard
          </button>
        </div>
      </header>

      {/* Cuerpo: Editor + Sidebar */}
      <div style={{ display: "flex", gap: "1.5rem", padding: "1.5rem 2rem", maxWidth: 1440, margin: "0 auto" }}>

        {/* Panel izquierdo: Contenido generado */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            {/* Barra de herramientas (decorativa en demo) */}
            <div style={{
              borderBottom: "1px solid #e2e8f0", padding: "0.6rem 1rem",
              display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center",
              background: "#f8fafc",
            }}>
              {["B", "I", "U", "🔗", "H1", "H2", "• Lista", "1. Lista", "«»"].map((t, i) => (
                <button key={i} style={{
                  padding: "0.3rem 0.6rem", background: "white", border: "1px solid #e2e8f0",
                  borderRadius: "0.4rem", cursor: "not-allowed", fontSize: "0.75rem", color: "#64748b",
                }} title="Barra de edición (demo)">{t}</button>
              ))}
              <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#94a3b8" }}>
                {blog.estimated_word_count > 0 ? `~${blog.estimated_word_count} palabras` : ""}
              </div>
            </div>

            {/* Área de contenido */}
            <div style={{ padding: "2rem 2.5rem", minHeight: 500 }}>
              {generando && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: "1rem" }}>
                  <div style={{
                    width: 48, height: 48, border: "4px solid #e2e8f0", borderTopColor: "#3b82f6",
                    borderRadius: "50%", animation: "spin 0.8s linear infinite",
                  }}></div>
                  <p style={{ color: "#64748b", fontWeight: 500 }}>Generando estructura del blog con IA...</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Esto puede tardar unos segundos</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {!generando && generado && content && (
                <div
                  style={{ lineHeight: 1.8, color: "#1e293b" }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}

              {!generando && generado && !content && (
                <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>
                  <i className="uil uil-file-alt" style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}></i>
                  <p>Contenido generado disponible</p>
                  <p style={{ fontSize: "0.8rem" }}>Este blog ya tiene estructura generada en el sistema.</p>
                </div>
              )}

              {!generando && !generado && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: "1rem", textAlign: "center" }}>
                  <div style={{ background: "#eff6ff", borderRadius: "50%", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="uil uil-robot" style={{ fontSize: "2.5rem", color: "#3b82f6" }}></i>
                  </div>
                  <h3 style={{ margin: 0, color: "#1e293b" }}>Borrador sin contenido</h3>
                  <p style={{ color: "#64748b", maxWidth: 380, margin: 0 }}>
                    Este blog está en estado de borrador. Usa el botón "Generar con IA" para crear la estructura del artículo automáticamente.
                  </p>
                  <button onClick={handleGenerar} style={{
                    padding: "0.75rem 1.75rem", background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "white", border: "none", borderRadius: "0.75rem", cursor: "pointer",
                    fontWeight: 700, fontSize: "0.95rem", marginTop: "0.5rem",
                    boxShadow: "0 4px 12px rgba(59,130,246,0.35)",
                  }}>
                    <i className="uil uil-rocket" style={{ marginRight: 6 }}></i>
                    Generar con IA
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Barra de acciones inferior */}
          {generado && (
            <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1rem 1.5rem", marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button onClick={handleGenerar} style={{
                padding: "0.6rem 1.2rem", background: "#eff6ff", color: "#2563eb",
                border: "1px solid #bfdbfe", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
              }}>
                <i className="uil uil-redo" style={{ marginRight: 4 }}></i> Regenerar
              </button>
              <button style={{
                padding: "0.6rem 1.2rem", background: "#f0fdf4", color: "#15803d",
                border: "1px solid #bbf7d0", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
              }}>
                <i className="uil uil-save" style={{ marginRight: 4 }}></i> Guardar
              </button>
              <div style={{ marginLeft: "auto" }}>
                <select value={estado} onChange={(e) => handleEstadoChange(e.target.value)}
                  style={{ padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "0.5rem", fontWeight: 600 }}>
                  <option value="draft">Borrador</option>
                  <option value="generated">Estructura Generada</option>
                  <option value="review">En Revisión</option>
                  <option value="approved">Aprobado</option>
                  <option value="published">Publicado</option>
                  <option value="ajusted">Ajustes Aplicados</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar derecho: Parámetros */}
        <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Parámetros del blog */}
          <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="uil uil-setting" style={{ color: "#3b82f6" }}></i> Parámetros del Blog
            </h3>
            {[
              { label: "Categoría",  value: blog.categoria, icon: "uil-folder" },
              { label: "Idioma",     value: blog.idioma,    icon: "uil-globe"  },
              { label: "Técnica",    value: blog.tecnica,   icon: "uil-lightbulb-alt" },
              { label: "Tono",       value: blog.tono,      icon: "uil-comment-alt" },
              { label: "Acento",     value: blog.acento,    icon: "uil-map-pin" },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ padding: "0.6rem 0", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <i className={`uil ${icon}`}></i> {label}
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b", textAlign: "right", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="uil uil-tag-alt" style={{ color: "#3b82f6" }}></i> Keywords
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {(blog.keywords || "").split(",").map((kw, i) => kw.trim() && (
                <span key={i} style={{ background: "#eff6ff", color: "#2563eb", padding: "0.25rem 0.6rem", borderRadius: "2rem", fontSize: "0.75rem", fontWeight: 600 }}>
                  {kw.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Asignación */}
          <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="uil uil-user-circle" style={{ color: "#3b82f6" }}></i> Asignación
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: 36, height: 36, background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "0.85rem",
              }}>
                {getUserName(blog.assigned_to)?.[0] || "?"}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{getUserName(blog.assigned_to)}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  {DEMO_USERS.find((u) => u.id === blog.assigned_to)?.email || "Sin asignar"}
                </div>
              </div>
            </div>
          </div>

          {/* Log de actividad (demo) */}
          <div style={{ background: "white", borderRadius: "1rem", border: "1px solid #e2e8f0", padding: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <i className="uil uil-history" style={{ color: "#3b82f6" }}></i> Actividad Reciente
            </h3>
            {[
              { accion: "Blog creado como borrador", fecha: "hace 5 días", icono: "uil-plus-circle", color: "#3b82f6" },
              { accion: "Estructura generada con IA", fecha: "hace 3 días", icono: "uil-robot", color: "#8b5cf6" },
              { accion: "Enviado a revisión", fecha: "hace 1 día", icono: "uil-clock", color: "#f59e0b" },
            ].slice(0, generado ? 3 : 1).map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ width: 28, height: 28, background: `${item.color}18`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className={`uil ${item.icono}`} style={{ color: item.color, fontSize: "0.9rem" }}></i>
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "#334155" }}>{item.accion}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{item.fecha}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PRINCIPAL ───────────────────────────────────────────────────────

export default function DemoBlog() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [vista, setVista] = useState("dashboard"); // "dashboard" | "editor"
  const [blogActivo, setBlogActivo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ estado: "", assigned_to: "", prioridad: "" });
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalAsignar, setModalAsignar] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Operaciones sobre datos
  const handleCrear = (newBlog) => { setBlogs((b) => [newBlog, ...b]); showToast("Blog creado exitosamente"); };
  const handleEditar = (id, data) => {
    setBlogs((b) => b.map((blog) => blog.id === id ? { ...blog, ...data, last_modified: new Date().toISOString() } : blog));
    showToast("Cambios guardados");
  };
  const handleAsignar = (id, userId) => {
    setBlogs((b) => b.map((blog) => blog.id === id ? { ...blog, assigned_to: userId } : blog));
    showToast(userId ? `Asignado a ${getUserName(userId)}` : "Asignación removida");
  };
  const handleEliminar = (id) => {
    if (!window.confirm("¿Eliminar este blog?")) return;
    setBlogs((b) => b.filter((blog) => blog.id !== id));
    showToast("Blog eliminado", "error");
  };
  const handleEstadoChange = (id, estado) => {
    setBlogs((b) => b.map((blog) => blog.id === id ? { ...blog, estado, last_modified: new Date().toISOString() } : blog));
  };

  const handleVer = (blog) => { setBlogActivo(blog); setVista("editor"); };
  const handleVolverDashboard = () => { setVista("dashboard"); setBlogActivo(null); };

  // Filtrado
  const blogsVisibles = useMemo(() => {
    let result = [...blogs];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q) || b.categoria.toLowerCase().includes(q));
    }
    if (filters.estado) result = result.filter((b) => b.estado === filters.estado);
    if (filters.prioridad) result = result.filter((b) => b.prioridad === filters.prioridad);
    if (filters.assigned_to) {
      if (filters.assigned_to === "unassigned") result = result.filter((b) => !b.assigned_to);
      else result = result.filter((b) => b.assigned_to === filters.assigned_to);
    }
    return result;
  }, [blogs, searchTerm, filters]);

  const stats = useMemo(() => ([
    { label: "Artículos Totales",   value: blogs.length,                                        icon: "uil-files-landscapes" },
    { label: "Publicados",          value: blogs.filter((b) => b.estado === "published").length, icon: "uil-check-circle"     },
    { label: "Sin Asignar",         value: blogs.filter((b) => !b.assigned_to).length,           icon: "uil-user-exclamation" },
    { label: "En Progreso",         value: blogs.filter((b) => b.estado === "generated" || b.estado === "review").length, icon: "uil-sync" },
  ]), [blogs]);

  const hayFiltros = searchTerm || Object.values(filters).some(Boolean);

  // Renderizar vista del editor si está activa
  if (vista === "editor" && blogActivo) {
    const blogActualizado = blogs.find((b) => b.id === blogActivo.id) || blogActivo;
    return (
      <VistaEditor
        blog={blogActualizado}
        onBack={handleVolverDashboard}
        onEstadoChange={handleEstadoChange}
      />
    );
  }

  return (
    <div style={{ background: "#e6e6e6", minHeight: "100vh" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999,
          background: toast.type === "error" ? "#fee2e2" : "#dcfce7",
          color: toast.type === "error" ? "#dc2626" : "#15803d",
          padding: "0.75rem 1.25rem", borderRadius: "0.75rem",
          fontWeight: 600, fontSize: "0.875rem", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}>
          <i className={`uil ${toast.type === "error" ? "uil-times-circle" : "uil-check-circle"}`}></i>
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0.75rem 2rem", backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.80rem", fontWeight: 800, color: "#0f172a" }}>
            Dashboard <span style={{ color: "#3b82f6" }}>Blogs</span>
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>
            Sistema de gestión de contenido · <span style={{ color: "#f59e0b", fontWeight: 700 }}>DEMO</span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.75rem",
            padding: "0.5rem 1rem", fontSize: "0.8rem", fontWeight: 600, color: "#92400e",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}>
            <i className="uil uil-info-circle"></i>
            Modo demo — datos de muestra
          </div>
          {/* Avatar usuario demo */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.4rem 1rem 0.4rem 0.4rem", background: "white",
            borderRadius: "9999px", border: "1px solid #e2e8f0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}>
            <div style={{
              width: "2.5rem", height: "2.5rem",
              background: "linear-gradient(135deg,#3b82f6,#2563eb)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "0.9rem",
            }}>AG</div>
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.1 }}>Ana García</div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#2b76ef", textTransform: "uppercase", letterSpacing: "0.025em" }}>Administrador</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Stats */}
        <section className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon"><i className={`uil ${s.icon}`}></i></div>
              <div>
                <p>{s.label}</p>
                <h2>{s.value}</h2>
              </div>
            </div>
          ))}
        </section>

        {/* Tabla */}
        <section className="table-section">
          <div className="table-header-flex">
            <h3>Últimos Archivos Generados</h3>
            <div className="table-actions-top">
              <div className="search-container">
                <div className="search-wrapper">
                  <i className="uil uil-search"></i>
                  <input
                    type="text" placeholder="Buscar por título o categoría..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="controls-container">
                <div className="filters-row">
                  <select className="filter-select" value={filters.estado}
                    onChange={(e) => setFilters((f) => ({ ...f, estado: e.target.value }))}>
                    <option value="">Estado</option>
                    <option value="draft">Borrador</option>
                    <option value="generated">Generado</option>
                    <option value="review">En Revisión</option>
                    <option value="approved">Aprobado</option>
                    <option value="published">Publicado</option>
                    <option value="ajusted">Ajustado</option>
                  </select>
                  <select className="filter-select" value={filters.assigned_to}
                    onChange={(e) => setFilters((f) => ({ ...f, assigned_to: e.target.value }))}>
                    <option value="">Asignado</option>
                    <option value="unassigned">Sin asignar</option>
                    {DEMO_USERS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  <select className="filter-select" value={filters.prioridad}
                    onChange={(e) => setFilters((f) => ({ ...f, prioridad: e.target.value }))}>
                    <option value="">Prioridad</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div className="button-group">
                  {hayFiltros && (
                    <button className="btn-clear-filters" onClick={() => { setFilters({ estado: "", assigned_to: "", prioridad: "" }); setSearchTerm(""); }} title="Limpiar filtros">
                      <i className="uil uil-refresh"></i>
                    </button>
                  )}
                  <button className="btn-create-new" onClick={() => setModalCrear(true)}>
                    <i className="uil uil-plus"></i> Nuevo Blog
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="table-container shadow-sm">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Título del Contenido</th>
                  <th>Categoría</th>
                  <th>Asignado</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Modificación</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {blogsVisibles.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
                {blogsVisibles.map((blog) => {
                  const meta = STATUS_META[blog.estado] || STATUS_META.draft;
                  const assignedName = getUserName(blog.assigned_to);
                  return (
                    <tr key={blog.id}>
                      <td style={{ fontWeight: 600, color: "#1e293b" }}>{blog.title}</td>
                      <td>
                        <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                          <i className="uil uil-folder" style={{ marginRight: 4 }}></i>
                          {blog.categoria}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>
                            <i className="uil uil-user"></i>
                          </div>
                          <span style={{ fontSize: "0.85rem" }}>{assignedName}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${meta.cls}`}>
                          <i className={`uil ${meta.icon}`} style={{ fontSize: "0.9rem" }}></i>
                          {meta.label}
                        </span>
                      </td>
                      <td>
                        <span className={`badge priority-${blog.prioridad}`}>
                          <span className="dot" style={{
                            display: "inline-block", width: 6, height: 6, borderRadius: "50%", marginRight: 4,
                            background: blog.prioridad === "Alta" ? "#dc3545" : blog.prioridad === "Media" ? "#ffc107" : "#28a745",
                          }}></span>
                          {blog.prioridad}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{formatDate(blog.last_modified)}</td>
                      <td>
                        <div className="options-container">
                          <button className="btn-action view" title="Ver / Editar" onClick={() => handleVer(blog)}>
                            <i className="uil uil-eye"></i>
                          </button>
                          <button className="btn-action assign" title="Asignar usuario" onClick={() => setModalAsignar(blog)}>
                            <i className="uil uil-user-plus"></i>
                          </button>
                          <button className="btn-action edit" title="Editar configuración" onClick={() => setModalEditar(blog)}>
                            <i className="uil uil-setting"></i>
                          </button>
                          <button className="btn-action delete" title="Eliminar" onClick={() => handleEliminar(blog.id)}>
                            <i className="uil uil-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modales */}
      {modalCrear && <ModalCreacion onClose={() => setModalCrear(false)} onSave={handleCrear} />}
      {modalEditar && <ModalEdicion blog={modalEditar} onClose={() => setModalEditar(null)} onSave={handleEditar} />}
      {modalAsignar && <ModalAsignacion blog={modalAsignar} onClose={() => setModalAsignar(null)} onSave={handleAsignar} />}
    </div>
  );
}
