import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calculator, Zap, Info, Euro, TrendingDown } from "lucide-react";
import { a as loadAppliances, l as loadSettings, c as calcTotalMonthlyKwh, s as saveSettings } from "./energy-3QFumchV.js";
const FRENCH_TARIFFS = [{
  label: "Tarif Bleu EDF (Base)",
  rate: 0.2516,
  description: "Tarif réglementé"
}, {
  label: "Tarif Bleu EDF (HP/HC)",
  rate: 0.2068,
  description: "Heures pleines / creuses moyennées"
}, {
  label: "Tarif marché moyen",
  rate: 0.2276,
  description: "Moyenne des offres de marché"
}, {
  label: "Tarif vert / renouvelable",
  rate: 0.215,
  description: "Offres énergie verte"
}];
function CalculatorPage() {
  const appliances = loadAppliances();
  const [settings, setSettings] = useState(loadSettings);
  const [manualKwh, setManualKwh] = useState("");
  const [useManual, setUseManual] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const autoKwh = calcTotalMonthlyKwh(appliances);
  const kwhToUse = useManual && manualKwh ? Number(manualKwh) : autoKwh;
  const monthlyCost = kwhToUse * settings.electricityRate;
  const annualCost = monthlyCost * 12;
  const costPerDay = monthlyCost / 30;
  const handleSave = () => {
    saveSettings(settings);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2e3);
  };
  const reductions = [{
    label: "Réduction de 5%",
    pct: 0.05
  }, {
    label: "Réduction de 10%",
    pct: 0.1
  }, {
    label: "Réduction de 20%",
    pct: 0.2
  }, {
    label: "Réduction de 30%",
    pct: 0.3
  }];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Calculateur de facture" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "Estimez votre facture et configurez vos paramètres" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-5 h-5 text-green-600" }),
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900", children: "Paramètres de calcul" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 block mb-2", children: "Tarif électricité" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3", children: FRENCH_TARIFFS.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => setSettings({
              ...settings,
              electricityRate: t.rate
            }), className: `text-left p-3 border rounded-lg text-sm transition-colors ${Math.abs(settings.electricityRate - t.rate) < 1e-3 ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`, children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-800", children: t.label }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-500 text-xs mt-0.5", children: [
                t.description,
                " · ",
                t.rate.toFixed(4),
                " €/kWh"
              ] })
            ] }, t.label)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-gray-600 shrink-0", children: "Ou saisissez votre tarif :" }),
              /* @__PURE__ */ jsx("input", { type: "number", step: "0.0001", min: "0", value: settings.electricityRate, onChange: (e) => setSettings({
                ...settings,
                electricityRate: Number(e.target.value)
              }), className: "border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "€/kWh" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 block mb-1", children: "Budget mensuel cible" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("input", { type: "number", min: "0", value: settings.monthlyBudget, onChange: (e) => setSettings({
                ...settings,
                monthlyBudget: Number(e.target.value)
              }), className: "border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "€/mois" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: handleSave, className: "px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors", children: savedMsg ? "✓ Sauvegardé" : "Enregistrer les paramètres" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-green-600" }),
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900", children: "Consommation" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-4", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setUseManual(false), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${!useManual ? "bg-green-600 text-white border-green-600" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`, children: "Calculé automatiquement" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setUseManual(true), className: `flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${useManual ? "bg-green-600 text-white border-green-600" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`, children: "Saisie manuelle" })
        ] }),
        !useManual ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsx(Info, { className: "w-4 h-4 text-green-600 shrink-0" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-800", children: [
            "Basé sur ",
            appliances.length,
            " appareils configurés : ",
            /* @__PURE__ */ jsxs("strong", { children: [
              Math.round(autoKwh),
              " kWh/mois"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700 block mb-1", children: "Consommation mensuelle réelle" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { type: "number", min: "0", placeholder: String(Math.round(autoKwh)), value: manualKwh, onChange: (e) => setManualKwh(e.target.value), className: "border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "kWh/mois" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "(visible sur votre facture)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsx(Euro, { className: "w-5 h-5 text-green-600" }),
          /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900", children: "Estimation de votre facture" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Par jour" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
              costPerDay.toFixed(2),
              " €"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-green-50 rounded-xl ring-2 ring-green-400", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Par mois" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-700", children: [
              monthlyCost.toFixed(2),
              " €"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-xl", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Par an" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
              Math.round(annualCost),
              " €"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-500 mb-1", children: [
            /* @__PURE__ */ jsx("span", { children: "0 €" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Budget: ",
              settings.monthlyBudget,
              " €"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              (settings.monthlyBudget * 1.5).toFixed(0),
              " €"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full bg-gray-100 rounded-full h-3 relative", children: [
            /* @__PURE__ */ jsx("div", { className: `h-3 rounded-full transition-all ${monthlyCost > settings.monthlyBudget ? "bg-red-500" : "bg-green-500"}`, style: {
              width: `${Math.min(monthlyCost / (settings.monthlyBudget * 1.5) * 100, 100)}%`
            } }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 h-3 w-0.5 bg-gray-400", style: {
              left: `${settings.monthlyBudget / (settings.monthlyBudget * 1.5) * 100}%`
            } })
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-xs mt-1 ${monthlyCost > settings.monthlyBudget ? "text-red-600" : "text-green-600"}`, children: monthlyCost > settings.monthlyBudget ? `Dépassement de ${(monthlyCost - settings.monthlyBudget).toFixed(2)} € par rapport au budget` : `${(settings.monthlyBudget - monthlyCost).toFixed(2)} € sous le budget — bien joué !` })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsx(TrendingDown, { className: "w-4 h-4 text-green-600" }),
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900", children: "Scénarios de réduction" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: reductions.map((r) => {
            const saved = monthlyCost * r.pct;
            const newCost = monthlyCost - saved;
            return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800", children: r.label }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "Nouvelle facture : ",
                  newCost.toFixed(2),
                  " €/mois"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-green-700", children: [
                  "-",
                  saved.toFixed(2),
                  " €"
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "-",
                  Math.round(saved * 12),
                  " €/an"
                ] })
              ] })
            ] }, r.label);
          }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CalculatorPage as component
};
