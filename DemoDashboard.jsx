// DemoDashboard.jsx — Demo autónomo del Dashboard de Landing Pages con datos quemados
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, Edit3, Eye, Trash2, CheckCircle2, Clock, AlertCircle,
  UserPlus, FileText, AlertTriangle, ThumbsUp, Hash, Upload, TestTube,
  BarChart3, Home,
} from "lucide-react";

// ─── DATOS DEMO ────────────────────────────────────────────────────────────────

const DEMO_USER = {
  id: "admin-1",
  name: "Ana García",
  first_name: "Ana",
  last_name: "García",
  email: "ana@redactoria.com",
  role: "admin",
};

const DEMO_USERS = [
  { id: "user-1", name: "Carlos López",   role: "editor", email: "carlos@redactoria.com" },
  { id: "user-2", name: "María Torres",   role: "editor", email: "maria@redactoria.com"  },
  { id: "user-3", name: "Pedro Ramírez",  role: "editor", email: "pedro@redactoria.com"  },
];

const DEMO_TEMPLATES = [
  { id: "tpl-1", name: "LP Autos Las Vegas",       proyecto: "mcr",      categoria: "autos",     dominio: "milescarkental.com" },
  { id: "tpl-2", name: "LP Autos Cancún",          proyecto: "viajemos", categoria: "autos",     dominio: "viajemos.com"       },
  { id: "tpl-3", name: "LP Agencias Bogotá",       proyecto: "mcr",      categoria: "agencias",  dominio: "milescarkental.com" },
  { id: "tpl-4", name: "LP Agencias Miami",        proyecto: "mcr",      categoria: "agencias",  dominio: "milescarkental.com" },
  { id: "tpl-5", name: "LP Ciudad Barranquilla",   proyecto: "arriendo", categoria: "ciudad",    dominio: "arriendo.com.co"    },
  { id: "tpl-6", name: "LP Ciudad México DF",      proyecto: "viajemos", categoria: "ciudad",    dominio: "viajemos.com"       },
  { id: "tpl-7", name: "LP Localidad Miraflores",  proyecto: "outlet",   categoria: "localidad", dominio: "outletrentalcars.com"},
];

const makeDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

const INITIAL_PROYECTOS = [
  { id: "p-1", name: "LP Las Vegas - Alquiler de Autos",      templateId: "tpl-1", assignedTo: "user-1", status: "in_progress",    priority: "high",   assignedAt: makeDate(15), lastModified: makeDate(2)  },
  { id: "p-2", name: "LP Cancún - Autos Económicos",          templateId: "tpl-2", assignedTo: "user-2", status: "pen_review",     priority: "medium", assignedAt: makeDate(12), lastModified: makeDate(3)  },
  { id: "p-3", name: "LP Bogotá - Agencias de Carros",        templateId: "tpl-3", assignedTo: null,     status: "review",         priority: "high",   assignedAt: null,         lastModified: makeDate(6)  },
  { id: "p-4", name: "LP Miami - Rental Cars Agencies",       templateId: "tpl-4", assignedTo: "user-3", status: "approved",       priority: "low",    assignedAt: makeDate(25), lastModified: makeDate(8)  },
  { id: "p-5", name: "LP Barranquilla - Arriendo Carros",     templateId: "tpl-5", assignedTo: "user-1", status: "completed",      priority: "medium", assignedAt: makeDate(30), lastModified: makeDate(10) },
  { id: "p-6", name: "LP México DF - Turismo Viajeros",       templateId: "tpl-6", assignedTo: null,     status: "draft",          priority: "low",    assignedAt: null,         lastModified: makeDate(1)  },
  { id: "p-7", name: "LP Miraflores - Localidad Lima",        templateId: "tpl-7", assignedTo: "user-2", status: "pen_ajuste",     priority: "high",   assignedAt: makeDate(18), lastModified: makeDate(4)  },
  { id: "p-8", name: "LP Orlando - Car Rental Deals",         templateId: "tpl-1", assignedTo: "user-3", status: "cargue",         priority: "medium", assignedAt: makeDate(20), lastModified: makeDate(5)  },
];

// ─── HELPERS DE ESTADO ─────────────────────────────────────────────────────────

const STATUS_COLOR = {
  completed:      "#10b981", in_progress:  "#3b82f6", review:       "#8b5cf6",
  draft:          "#6b7280", pen_review:   "#f59e0b", pen_ajuste:   "#ef4444",
  ajuste_aplicado:"#8044ef", approved:     "#059669", rev_kws:      "#E3AAAA",
  cargue:         "#0ea5e9", en_it:        "#6366f1", test:         "#f97316",
};
const STATUS_TEXT = {
  draft: "Borrador",         review: "Pend. Redacción",  in_progress: "En Redacción",
  pen_review: "Pend. Revisión", pen_ajuste: "Pend. Ajuste", ajuste_aplicado: "Ajuste Aplicado",
  approved: "Aprobado",      rev_kws: "Pend. KWS",       cargue: "Cargue",
  en_it: "En IT",            test: "Test",               completed: "Publicado",
};
const STATUS_ICON = {
  completed: <CheckCircle2 size={14}/>, in_progress: <Clock size={14}/>,
  review: <Eye size={14}/>, draft: <Edit3 size={14}/>, pen_review: <FileText size={14}/>,
  pen_ajuste: <AlertTriangle size={14}/>, ajuste_aplicado: <AlertTriangle size={14}/>,
  approved: <ThumbsUp size={14}/>, rev_kws: <Hash size={14}/>, cargue: <Upload size={14}/>,
  en_it: <Clock size={14}/>, test: <TestTube size={14}/>,
};
const PRIORITY_COLOR = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
const PRIORITY_TEXT = { high: "Alta", medium: "Media", low: "Baja" };

const formatDate = (str) => str ? new Date(str).toLocaleDateString("es-ES") : "-";

function getUserName(userId) {
  return DEMO_USERS.find((u) => u.id === userId)?.name || "Sin asignar";
}
function getUserInitials(userId) {
  const u = DEMO_USERS.find((u) => u.id === userId);
  if (!u) return "?";
  return u.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
function getTemplateById(id) {
  return DEMO_TEMPLATES.find((t) => t.id === id);
}
function formatCategoria(cat) {
  if (!cat) return "Sin tipo";
  const n = cat.toLowerCase();
  if (n.includes("auto"))    return "Autos";
  if (n.includes("agenc"))   return "Agencias";
  if (n.includes("ofert"))   return "Ofertas";
  if (n.includes("local"))   return "Localidad";
  if (n.includes("ciudad"))  return "Ciudad";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

// ─── COMPONENTES AUXILIARES ────────────────────────────────────────────────────

function StatCard({ icon, value, label, color, bgColor }) {
  return (
    <div style={{ background: "white", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 1px 3px rgba(0,0,0,.1)", border: "1px solid #e2e8f0", flex: "1 1 200px", minWidth: 200 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: "3rem", height: "3rem", backgroundColor: bgColor, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: "1.875rem", fontWeight: 700, color: "#1e293b" }}>{value}</p>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>{label}</p>
        </div>
      </div>
    </div>
  );
}

function Toast({ msg, type }) {
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999, background: type === "error" ? "#fee2e2" : "#dcfce7", color: type === "error" ? "#dc2626" : "#15803d", padding: "0.75rem 1.25rem", borderRadius: "0.75rem", fontWeight: 600, fontSize: "0.875rem", boxShadow: "0 4px 12px rgba(0,0,0,.15)" }}>
      {msg}
    </div>
  );
}

// ─── MODALES ───────────────────────────────────────────────────────────────────

function ModalCrear({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", description: "", template_id: "", priority: "medium" });
  const [expanded, setExpanded] = useState(new Set());

  const grouped = useMemo(() => {
    const g = {};
    DEMO_TEMPLATES.forEach((t) => {
      if (!g[t.proyecto]) g[t.proyecto] = {};
      if (!g[t.proyecto][t.dominio]) g[t.proyecto][t.dominio] = [];
      g[t.proyecto][t.dominio].push(t);
    });
    return g;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.template_id || !form.name.trim()) return;
    onSave({ ...form, id: `p-demo-${Date.now()}`, status: "review", assignedTo: null, assignedAt: null, lastModified: new Date().toISOString(), templateId: form.template_id });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: "0.75rem", padding: "2rem", width: 560, maxHeight: "90vh", overflowY: "auto" }}>
        <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.25rem", fontWeight: 700 }}>Crear Nuevo Proyecto</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Nombre *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="LP Ciudad - Tipo de página" style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Descripción</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", resize: "vertical", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Template *</label>
            <div style={{ border: "1px solid #d1d5db", borderRadius: "0.375rem", maxHeight: 260, overflowY: "auto" }}>
              {Object.entries(grouped).map(([proy, dominios]) => (
                <div key={proy} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <div onClick={() => setExpanded((s) => { const n = new Set(s); n.has(proy) ? n.delete(proy) : n.add(proy); return n; })} style={{ padding: "0.6rem 0.75rem", background: "#f8fafc", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                    <span>📁 {proy.toUpperCase()}</span>
                    <span style={{ transform: expanded.has(proy) ? "rotate(90deg)" : "none", transition: "transform 0.15s", fontSize: "0.75rem", color: "#6b7280" }}>▶</span>
                  </div>
                  {expanded.has(proy) && Object.entries(dominios).map(([dom, tpls]) => (
                    <div key={dom} style={{ paddingLeft: "1rem" }}>
                      <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem", color: "#6b7280", background: "#fafafa" }}>🌐 {dom}</div>
                      {tpls.map((t) => (
                        <label key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.5rem 0.75rem 0.5rem 2rem", cursor: "pointer", background: form.template_id === t.id ? "#dbeafe" : "transparent" }}>
                          <input type="radio" name="template" value={t.id} checked={form.template_id === t.id} onChange={(e) => setForm({ ...form, template_id: e.target.value })} />
                          <div>
                            <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{t.name}</div>
                            <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{t.categoria}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Prioridad</label>
            <select required value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }}>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
            <button type="button" onClick={onClose} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", background: "white", cursor: "pointer" }}>Cancelar</button>
            <button type="submit" disabled={!form.name.trim() || !form.template_id} style={{ padding: "0.5rem 1rem", border: "none", borderRadius: "0.375rem", background: !form.name.trim() || !form.template_id ? "#94a3b8" : "#3b82f6", color: "white", cursor: !form.name.trim() || !form.template_id ? "not-allowed" : "pointer", fontWeight: 600 }}>Crear Proyecto</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalEditar({ proyecto, onClose, onSave }) {
  const [form, setForm] = useState({ status: proyecto.status, priority: proyecto.priority, description: proyecto.description || "" });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: "0.75rem", padding: "2rem", width: 480 }}>
        <h2 style={{ margin: "0 0 1.5rem 0", fontSize: "1.25rem", fontWeight: 700 }}>Editar Proyecto</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Nombre</label>
            <input value={proyecto.name} readOnly style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", background: "#f9fafb", color: "#6b7280", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Estado</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }}>
              {Object.entries(STATUS_TEXT).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Prioridad</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }}>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", paddingTop: "0.5rem" }}>
            <button onClick={onClose} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", background: "white", cursor: "pointer" }}>Cancelar</button>
            <button onClick={() => { onSave(proyecto.id, { ...form, lastModified: new Date().toISOString() }); onClose(); }} style={{ padding: "0.5rem 1rem", border: "none", borderRadius: "0.375rem", background: "#3b82f6", color: "white", cursor: "pointer", fontWeight: 600 }}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalAsignar({ proyecto, onClose, onSave }) {
  const [selected, setSelected] = useState(proyecto.assignedTo || "");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", borderRadius: "0.75rem", padding: "2rem", width: 400 }}>
        <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem", fontWeight: 700 }}>Asignar Usuario</h2>
        <p style={{ margin: "0 0 1rem 0", color: "#64748b", fontSize: "0.875rem" }}>Proyecto: <strong>{proyecto.name}</strong></p>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 4, fontSize: "0.875rem" }}>Asignar a</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }}>
            <option value="">Sin asignar</option>
            {DEMO_USERS.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", background: "white", cursor: "pointer" }}>Cancelar</button>
          <button onClick={() => { onSave(proyecto.id, selected || null); onClose(); }} style={{ padding: "0.5rem 1rem", border: "none", borderRadius: "0.375rem", background: "#10b981", color: "white", cursor: "pointer", fontWeight: 600 }}>Asignar</button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PRINCIPAL ───────────────────────────────────────────────────────

export default function DemoDashboard() {
  const navigate = useNavigate();
  const [proyectos, setProyectos] = useState(INITIAL_PROYECTOS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "", priority: "", assignee: "" });
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalAsignar, setModalAsignar] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleCrear    = (p)     => { setProyectos((prev) => [p, ...prev]); showToast("Proyecto creado exitosamente"); };
  const handleEditar   = (id, d) => { setProyectos((prev) => prev.map((p) => p.id === id ? { ...p, ...d } : p)); showToast("Cambios guardados"); };
  const handleAsignar  = (id, u) => { setProyectos((prev) => prev.map((p) => p.id === id ? { ...p, assignedTo: u, assignedAt: u ? new Date().toISOString() : null } : p)); showToast(u ? `Asignado a ${getUserName(u)}` : "Asignación removida"); };
  const handleEliminar = (id)    => { if (!window.confirm("¿Eliminar este proyecto?")) return; setProyectos((prev) => prev.filter((p) => p.id !== id)); showToast("Proyecto eliminado", "error"); };

  const visible = useMemo(() => {
    let r = [...proyectos];
    if (searchTerm) { const q = searchTerm.toLowerCase(); r = r.filter((p) => p.name.toLowerCase().includes(q)); }
    if (filters.status)   r = r.filter((p) => p.status === filters.status);
    if (filters.priority) r = r.filter((p) => p.priority === filters.priority);
    if (filters.assignee === "unassigned") r = r.filter((p) => !p.assignedTo);
    else if (filters.assignee) r = r.filter((p) => p.assignedTo === filters.assignee);
    return r.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
  }, [proyectos, searchTerm, filters]);

  const stats = useMemo(() => ({
    total:      proyectos.length,
    completed:  proyectos.filter((p) => p.status === "completed").length,
    inProgress: proyectos.filter((p) => p.status !== "completed").length,
    unassigned: proyectos.filter((p) => !p.assignedTo).length,
  }), [proyectos]);

  const hayFiltros = searchTerm || Object.values(filters).some(Boolean);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, Segoe UI, system-ui, sans-serif" }}>
      {toast && <Toast {...toast} />}

      {/* Header */}
      <header style={{ backgroundColor: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 2rem", boxShadow: "0 1px 3px rgba(0,0,0,.1)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.75rem", fontWeight: 700, color: "#3b82f6" }}>Dashboard Redactoria</h1>
            <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Gestiona y supervisa todos los proyectos de Landing Pages</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Demo badge */}
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "0.75rem", padding: "0.4rem 0.9rem", fontSize: "0.8rem", fontWeight: 700, color: "#92400e" }}>
              DEMO — datos de muestra
            </div>
            {/* Home */}
            <button onClick={() => navigate("/home")} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
              <Home size={16}/> Home
            </button>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#f1f5f9", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
              <div style={{ width: "2rem", height: "2rem", background: "#3b82f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.8rem", fontWeight: 700 }}>AG</div>
              <div>
                <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "#1e293b" }}>{DEMO_USER.name}</p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: "2rem", maxWidth: 1400, margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <StatCard icon={<Edit3 size={20}/>}      value={stats.total}      label="Proyectos Totales" color="#3b82f6" bgColor="#dbeafe"/>
          <StatCard icon={<CheckCircle2 size={20}/>} value={stats.completed} label="Publicados"        color="#3b82f6" bgColor="#dbeafe"/>
          <StatCard icon={<Clock size={20}/>}      value={stats.inProgress} label="En Proceso"        color="#f59e0b" bgColor="#fef3c7"/>
          <StatCard icon={<AlertCircle size={20}/>} value={stats.unassigned} label="Sin Asignar"       color="#ef4444" bgColor="#fee2e2"/>
        </div>

        {/* Filtros */}
        <div style={{ background: "white", padding: "1.25rem", borderRadius: "0.75rem", boxShadow: "0 1px 3px rgba(0,0,0,.1)", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "2 1 200px" }}>
              <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}/>
              <input type="text" placeholder="Buscar proyectos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem 0.5rem 2.25rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem", boxSizing: "border-box" }}/>
            </div>
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={{ flex: "1 1 160px", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }}>
              <option value="">Todos los estados</option>
              {Object.entries(STATUS_TEXT).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })} style={{ flex: "1 1 140px", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }}>
              <option value="">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
            <select value={filters.assignee} onChange={(e) => setFilters({ ...filters, assignee: e.target.value })} style={{ flex: "1 1 160px", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }}>
              <option value="">Todos los asignados</option>
              <option value="unassigned">Sin asignar</option>
              {DEMO_USERS.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            {hayFiltros && (
              <button onClick={() => { setSearchTerm(""); setFilters({ status: "", priority: "", assignee: "" }); }} style={{ padding: "0.5rem 0.75rem", border: "1px solid #e2e8f0", borderRadius: "0.375rem", background: "#f8fafc", cursor: "pointer", fontSize: "0.8rem", color: "#64748b" }}>
                Limpiar filtros
              </button>
            )}
            <button onClick={() => setModalCrear(true)} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}>
              <Plus size={16}/> Nuevo Proyecto
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div style={{ background: "white", borderRadius: "0.75rem", boxShadow: "0 1px 3px rgba(0,0,0,.1)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  {["Nombre","Template usado","Asignado a","Estado","Prioridad","Fecha Asignada","Última Modificación","Acciones"].map((h, i) => (
                    <th key={h} style={{ padding: "0.75rem 1rem", textAlign: i === 7 ? "right" : "left", fontSize: "0.75rem", fontWeight: 600, color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.length === 0 && (
                  <tr><td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                    <AlertCircle size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4, display: "block" }}/>
                    No se encontraron proyectos. Ajusta los filtros o crea uno nuevo.
                  </td></tr>
                )}
                {visible.map((p, idx) => {
                  const tpl = getTemplateById(p.templateId);
                  const sc = STATUS_COLOR[p.status] || "#6b7280";
                  return (
                    <tr key={p.id} style={{ borderTop: idx > 0 ? "1px solid #e2e8f0" : "none" }}>
                      {/* Nombre */}
                      <td style={{ padding: "1rem" }}>
                        <p style={{ margin: 0, fontWeight: 600, color: "#1e293b", fontSize: "0.875rem" }}>{p.name}</p>
                      </td>
                      {/* Template */}
                      <td style={{ padding: "1rem" }}>
                        {tpl ? (
                          <div>
                            <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "#1e293b" }}>{tpl.name}</p>
                            <div style={{ marginTop: "0.25rem", display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#1d4ed8", background: "#dbeafe", padding: "0.1rem 0.4rem", borderRadius: 9999 }}>{tpl.proyecto}</span>
                              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#065f46", background: "#d1fae5", padding: "0.1rem 0.4rem", borderRadius: 9999 }}>{formatCategoria(tpl.categoria)}</span>
                              {tpl.dominio && <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6b21a8", background: "#f3e8ff", padding: "0.1rem 0.4rem", borderRadius: 9999 }}>{tpl.dominio}</span>}
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>Sin template</span>
                        )}
                      </td>
                      {/* Asignado */}
                      <td style={{ padding: "1rem" }}>
                        {p.assignedTo ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 28, background: "#3b82f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: 700 }}>{getUserInitials(p.assignedTo)}</div>
                            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1e293b" }}>{getUserName(p.assignedTo)}</span>
                          </div>
                        ) : (
                          <span style={{ color: "#64748b", fontSize: "0.875rem" }}>Sin asignar</span>
                        )}
                      </td>
                      {/* Estado */}
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0.25rem 0.6rem", background: `${sc}18`, color: sc, borderRadius: 9999, fontSize: "0.75rem", fontWeight: 500 }}>
                          {STATUS_ICON[p.status] || <Clock size={14}/>}
                          {STATUS_TEXT[p.status] || p.status}
                        </div>
                      </td>
                      {/* Prioridad */}
                      <td style={{ padding: "1rem" }}>
                        <span style={{ padding: "0.2rem 0.5rem", background: `${PRIORITY_COLOR[p.priority]}18`, color: PRIORITY_COLOR[p.priority], borderRadius: 4, fontSize: "0.75rem", fontWeight: 500 }}>
                          {PRIORITY_TEXT[p.priority] || p.priority}
                        </span>
                      </td>
                      {/* Fecha asignada */}
                      <td style={{ padding: "1rem" }}><span style={{ fontSize: "0.875rem", color: "#64748b" }}>{formatDate(p.assignedAt)}</span></td>
                      {/* Última mod */}
                      <td style={{ padding: "1rem" }}><span style={{ fontSize: "0.875rem", color: "#64748b" }}>{formatDate(p.lastModified)}</span></td>
                      {/* Acciones */}
                      <td style={{ padding: "1rem", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                          <button onClick={() => setModalEditar(p)} title="Editar" style={{ padding: "0.4rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "0.375rem", cursor: "pointer", display: "flex", alignItems: "center" }}><Edit3 size={14}/></button>
                          <button onClick={() => setModalAsignar(p)} title="Asignar usuario" style={{ padding: "0.4rem", background: "#10b981", color: "white", border: "none", borderRadius: "0.375rem", cursor: "pointer", display: "flex", alignItems: "center" }}><UserPlus size={14}/></button>
                          <button onClick={() => navigate("/demo-redactor")} title="Ver / Editar contenido" style={{ padding: "0.4rem", background: "#f3f4f6", color: "#64748b", border: "none", borderRadius: "0.375rem", cursor: "pointer", display: "flex", alignItems: "center" }}><Eye size={14}/></button>
                          <button onClick={() => handleEliminar(p.id)} title="Eliminar" style={{ padding: "0.4rem", background: "#ef4444", color: "white", border: "none", borderRadius: "0.375rem", cursor: "pointer", display: "flex", alignItems: "center" }}><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          Modo demo — los datos no persisten al recargar la página
        </p>
      </div>

      {/* Modales */}
      {modalCrear   && <ModalCrear   onClose={() => setModalCrear(false)}   onSave={handleCrear}/>}
      {modalEditar  && <ModalEditar  proyecto={modalEditar}  onClose={() => setModalEditar(null)}  onSave={handleEditar}/>}
      {modalAsignar && <ModalAsignar proyecto={modalAsignar} onClose={() => setModalAsignar(null)} onSave={handleAsignar}/>}
    </div>
  );
}
