import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Zap, Euro, Check, X, Pencil, Trash2 } from "lucide-react";
import { a as loadAppliances, l as loadSettings, b as calcMonthlyKwh, C as CATEGORY_LABELS, d as CATEGORY_COLORS, e as saveAppliances } from "./energy-3QFumchV.js";
const CATEGORIES = Object.keys(CATEGORY_LABELS);
const PRESETS = [{
  name: "Réfrigérateur",
  wattage: 150,
  hoursPerDay: 24,
  category: "cuisine"
}, {
  name: "Congélateur",
  wattage: 120,
  hoursPerDay: 24,
  category: "cuisine"
}, {
  name: "Lave-linge",
  wattage: 2e3,
  hoursPerDay: 1,
  category: "lavage"
}, {
  name: "Sèche-linge",
  wattage: 3e3,
  hoursPerDay: 0.5,
  category: "lavage"
}, {
  name: "Lave-vaisselle",
  wattage: 1800,
  hoursPerDay: 0.7,
  category: "cuisine"
}, {
  name: "Four électrique",
  wattage: 2e3,
  hoursPerDay: 0.5,
  category: "cuisine"
}, {
  name: "Micro-ondes",
  wattage: 900,
  hoursPerDay: 0.3,
  category: "cuisine"
}, {
  name: "Téléviseur",
  wattage: 100,
  hoursPerDay: 4,
  category: "electronique"
}, {
  name: "Ordinateur de bureau",
  wattage: 200,
  hoursPerDay: 4,
  category: "electronique"
}, {
  name: "Ordinateur portable",
  wattage: 50,
  hoursPerDay: 4,
  category: "electronique"
}, {
  name: "Climatiseur",
  wattage: 1500,
  hoursPerDay: 4,
  category: "climatisation"
}, {
  name: "Radiateur électrique",
  wattage: 1500,
  hoursPerDay: 6,
  category: "chauffage"
}, {
  name: "Chauffe-eau",
  wattage: 2e3,
  hoursPerDay: 2,
  category: "chauffage"
}, {
  name: "Éclairage LED (total)",
  wattage: 100,
  hoursPerDay: 6,
  category: "eclairage"
}, {
  name: "Box internet",
  wattage: 15,
  hoursPerDay: 24,
  category: "electronique"
}];
const EMPTY_FORM = {
  name: "",
  wattage: "",
  hoursPerDay: "",
  category: "electronique"
};
function AppliancesPage() {
  const [appliances, setAppliances] = useState(loadAppliances);
  const settings = loadSettings();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [showPresets, setShowPresets] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const persist = (updated) => {
    setAppliances(updated);
    saveAppliances(updated);
  };
  const handleAdd = () => {
    if (!form.name || !form.wattage || !form.hoursPerDay) return;
    const newAppliance = {
      id: Date.now().toString(),
      name: form.name,
      wattage: Number(form.wattage),
      hoursPerDay: Number(form.hoursPerDay),
      category: form.category
    };
    persist([...appliances, newAppliance]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };
  const handleDelete = (id) => {
    persist(appliances.filter((a) => a.id !== id));
  };
  const startEdit = (a) => {
    setEditId(a.id);
    setEditForm({
      name: a.name,
      wattage: String(a.wattage),
      hoursPerDay: String(a.hoursPerDay),
      category: a.category
    });
  };
  const saveEdit = () => {
    if (!editId) return;
    persist(appliances.map((a) => a.id === editId ? {
      ...a,
      name: editForm.name,
      wattage: Number(editForm.wattage),
      hoursPerDay: Number(editForm.hoursPerDay),
      category: editForm.category
    } : a));
    setEditId(null);
  };
  const addPreset = (preset) => {
    const newAppliance = {
      ...preset,
      id: Date.now().toString()
    };
    persist([...appliances, newAppliance]);
  };
  const totalKwh = appliances.reduce((s, a) => s + calcMonthlyKwh(a), 0);
  const totalCost = totalKwh * settings.electricityRate;
  const grouped = {};
  for (const a of appliances) {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Mes appareils" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "Gérez vos appareils électriques pour estimer votre consommation" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowPresets(!showPresets), className: "text-sm px-3 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors", children: "Appareils types" }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setShowForm(!showForm), className: "flex items-center gap-1.5 text-sm px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors", children: [
          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
          " Ajouter"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-blue-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Total mensuel" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-gray-900", children: [
            Math.round(totalKwh),
            " kWh"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-emerald-100 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Euro, { className: "w-5 h-5 text-emerald-600" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Coût mensuel estimé" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-gray-900", children: [
            totalCost.toFixed(2),
            " €"
          ] })
        ] })
      ] })
    ] }),
    showPresets && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 mb-3 text-sm", children: "Ajouter un appareil type" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: PRESETS.map((p) => /* @__PURE__ */ jsxs("button", { onClick: () => addPreset(p), className: "text-left text-xs p-2.5 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-800", children: p.name }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-500 mt-0.5", children: [
          p.wattage,
          "W · ",
          p.hoursPerDay,
          "h/j"
        ] })
      ] }, p.name)) })
    ] }),
    showForm && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5 mb-6 border border-green-200", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 mb-4 text-sm", children: "Nouvel appareil" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-gray-700 block mb-1", children: "Nom" }),
          /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Ex: Climatiseur salon", value: form.name, onChange: (e) => setForm({
            ...form,
            name: e.target.value
          }), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-gray-700 block mb-1", children: "Puissance (Watts)" }),
          /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Ex: 1500", min: "0", value: form.wattage, onChange: (e) => setForm({
            ...form,
            wattage: e.target.value
          }), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-gray-700 block mb-1", children: "Heures d'utilisation/jour" }),
          /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Ex: 4", min: "0", max: "24", step: "0.5", value: form.hoursPerDay, onChange: (e) => setForm({
            ...form,
            hoursPerDay: e.target.value
          }), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-gray-700 block mb-1", children: "Catégorie" }),
          /* @__PURE__ */ jsx("select", { value: form.category, onChange: (e) => setForm({
            ...form,
            category: e.target.value
          }), className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: CATEGORY_LABELS[c] }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
        /* @__PURE__ */ jsxs("button", { onClick: handleAdd, className: "flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
          " Ajouter"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setShowForm(false);
          setForm(EMPTY_FORM);
        }, className: "px-4 py-2 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors", children: "Annuler" })
      ] })
    ] }),
    CATEGORIES.filter((c) => grouped[c]?.length).map((cat) => /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full", style: {
          backgroundColor: CATEGORY_COLORS[cat].replace("0.8", "1")
        } }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-700", children: CATEGORY_LABELS[cat] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { className: "text-xs text-gray-500", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Appareil" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Puissance" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "Heures/j" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-4 py-3 font-medium", children: "kWh/mois" }),
          /* @__PURE__ */ jsx("th", { className: "text-right px-4 py-3 font-medium hidden sm:table-cell", children: "€/mois" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: grouped[cat].map((a) => {
          const kwh = calcMonthlyKwh(a);
          const cost = kwh * settings.electricityRate;
          return /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-50 last:border-0 hover:bg-gray-50", children: editId === a.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx("input", { value: editForm.name, onChange: (e) => setEditForm({
              ...editForm,
              name: e.target.value
            }), className: "border border-gray-200 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-400" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsx("input", { type: "number", value: editForm.wattage, onChange: (e) => setEditForm({
              ...editForm,
              wattage: e.target.value
            }), className: "border border-gray-200 rounded px-2 py-1 text-sm w-20 text-right focus:outline-none focus:ring-1 focus:ring-green-400" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2 hidden sm:table-cell", children: /* @__PURE__ */ jsx("input", { type: "number", value: editForm.hoursPerDay, onChange: (e) => setEditForm({
              ...editForm,
              hoursPerDay: e.target.value
            }), className: "border border-gray-200 rounded px-2 py-1 text-sm w-16 text-right focus:outline-none focus:ring-1 focus:ring-green-400" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-right text-gray-400", children: "—" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2 hidden sm:table-cell" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ jsx("button", { onClick: saveEdit, className: "p-1 text-green-600 hover:bg-green-50 rounded", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => setEditId(null), className: "p-1 text-gray-400 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
            ] }) })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-800", children: a.name }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right text-gray-600", children: [
              a.wattage,
              " W"
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right text-gray-600 hidden sm:table-cell", children: [
              a.hoursPerDay,
              " h"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right font-medium text-gray-800", children: Math.round(kwh) }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right text-gray-600 hidden sm:table-cell", children: [
              cost.toFixed(2),
              " €"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1 justify-end", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => startEdit(a), className: "p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded", children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(a.id), className: "p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }) })
            ] }) })
          ] }) }, a.id);
        }) })
      ] }) })
    ] }, cat)),
    appliances.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-gray-400", children: [
      /* @__PURE__ */ jsx(Zap, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Aucun appareil ajouté. Commencez par ajouter vos appareils électriques." })
    ] })
  ] });
}
export {
  AppliancesPage as component
};
