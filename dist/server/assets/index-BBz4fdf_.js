import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Zap, Euro, TrendingDown, Leaf, AlertTriangle, ChevronRight } from "lucide-react";
import { a as loadAppliances, l as loadSettings, c as calcTotalMonthlyKwh, b as calcMonthlyKwh, d as CATEGORY_COLORS, C as CATEGORY_LABELS } from "./energy-3QFumchV.js";
const SAVING_TIPS = [{
  label: "Mode veille éliminé",
  saving: 0.08
}, {
  label: "Éclairage LED partout",
  saving: 0.12
}, {
  label: "Lavage à froid (30°)",
  saving: 0.06
}, {
  label: "Thermostat -1°C",
  saving: 0.07
}, {
  label: "Heures creuses",
  saving: 0.15
}];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [appliances, setAppliances] = useState(loadAppliances);
  const [settings, setSettings] = useState(loadSettings);
  useEffect(() => {
    setMounted(true);
    setAppliances(loadAppliances());
    setSettings(loadSettings());
  }, []);
  const totalKwh = calcTotalMonthlyKwh(appliances);
  const monthlyCost = totalKwh * settings.electricityRate;
  const annualCost = monthlyCost * 12;
  const potentialSavings = monthlyCost * 0.3;
  const overBudget = monthlyCost > settings.monthlyBudget;
  const categoryMap = {};
  for (const a of appliances) {
    categoryMap[a.category] = (categoryMap[a.category] || 0) + calcMonthlyKwh(a);
  }
  const categories = Object.keys(categoryMap);
  const donutData = {
    labels: categories.map((c) => CATEGORY_LABELS[c]),
    datasets: [{
      data: categories.map((c) => Math.round(categoryMap[c])),
      backgroundColor: categories.map((c) => CATEGORY_COLORS[c]),
      borderWidth: 0
    }]
  };
  const today = /* @__PURE__ */ new Date();
  const currentMonth = today.getMonth();
  const baseKwh = totalKwh;
  const monthlyData = MONTHS.map((_, i) => {
    const seasonal = i >= 10 || i <= 1 ? 1.3 : i >= 5 && i <= 8 ? 1.15 : 1;
    const isPast = i <= currentMonth;
    return isPast ? Math.round(baseKwh * seasonal * (0.9 + Math.random() * 0.2)) : null;
  });
  const barData = {
    labels: MONTHS,
    datasets: [{
      label: "Consommation (kWh)",
      data: monthlyData,
      backgroundColor: MONTHS.map((_, i) => i === currentMonth ? "rgba(16, 185, 129, 0.9)" : "rgba(16, 185, 129, 0.4)"),
      borderRadius: 6
    }]
  };
  const stats = [{
    title: "Consommation mensuelle",
    value: `${Math.round(totalKwh)} kWh`,
    sub: `${Math.round(totalKwh / 30)} kWh/jour`,
    icon: Zap,
    color: "bg-blue-500"
  }, {
    title: "Facture estimée",
    value: `${monthlyCost.toFixed(2)} €`,
    sub: overBudget ? `⚠ Budget dépassé de ${(monthlyCost - settings.monthlyBudget).toFixed(0)} €` : `✓ Dans le budget`,
    icon: Euro,
    color: overBudget ? "bg-red-500" : "bg-emerald-500"
  }, {
    title: "Coût annuel",
    value: `${Math.round(annualCost)} €`,
    sub: `${(annualCost / 12).toFixed(2)} €/mois en moyenne`,
    icon: TrendingDown,
    color: "bg-amber-500"
  }, {
    title: "Économies potentielles",
    value: `${Math.round(potentialSavings)} €/mois`,
    sub: `Jusqu'à ${Math.round(potentialSavings * 12)} €/an`,
    icon: Leaf,
    color: "bg-green-500"
  }];
  const topConsumers = [...appliances].sort((a, b) => calcMonthlyKwh(b) - calcMonthlyKwh(a)).slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Tableau de bord énergétique" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "Suivez et réduisez votre consommation d'électricité" })
    ] }),
    overBudget && /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 shrink-0" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        "Votre consommation estimée dépasse votre budget mensuel de ",
        settings.monthlyBudget,
        " €. Consultez nos ",
        /* @__PURE__ */ jsx(Link, { to: "/conseils", className: "underline font-medium", children: "conseils d'économie" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5 flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: `${s.color} p-2.5 rounded-lg shrink-0`, children: /* @__PURE__ */ jsx(s.icon, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-0.5", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900", children: s.value }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: s.sub })
      ] })
    ] }, s.title)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6", children: [
      mounted && /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gray-900 mb-4", children: "Consommation mensuelle (kWh)" }),
        /* @__PURE__ */ jsx(Bar, { data: barData, options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        } })
      ] }),
      mounted && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gray-900 mb-4", children: "Répartition par usage" }),
        /* @__PURE__ */ jsx(Doughnut, { data: donutData, options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 11
                }
              }
            }
          }
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Principaux consommateurs" }),
          /* @__PURE__ */ jsxs(Link, { to: "/appareils", className: "text-xs text-green-600 hover:text-green-700 flex items-center gap-0.5", children: [
            "Voir tout ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: topConsumers.map((a) => {
          const kwh = calcMonthlyKwh(a);
          const pct = Math.round(kwh / totalKwh * 100);
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: a.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                Math.round(kwh),
                " kWh/mois (",
                pct,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all", style: {
              width: `${pct}%`
            } }) })
          ] }, a.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Économies potentielles" }),
          /* @__PURE__ */ jsxs(Link, { to: "/conseils", className: "text-xs text-green-600 hover:text-green-700 flex items-center gap-0.5", children: [
            "Voir les conseils ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: SAVING_TIPS.map((tip) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Leaf, { className: "w-4 h-4 text-green-600 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: tip.label })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold text-green-700", children: [
            "-",
            (monthlyCost * tip.saving).toFixed(1),
            " €/mois"
          ] })
        ] }, tip.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-emerald-600 rounded-lg text-white", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-80", children: "En appliquant tous les conseils" }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold", children: [
            "Économisez jusqu'à ",
            Math.round(potentialSavings),
            " €/mois"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
