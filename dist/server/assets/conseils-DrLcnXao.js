import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Thermometer, Droplets, Lightbulb, Monitor, Euro, ShieldCheck, Leaf, Zap, ChevronDown, TrendingDown } from "lucide-react";
import { l as loadSettings } from "./energy-3QFumchV.js";
const CATEGORIES = [{
  id: "chauffage",
  label: "Chauffage & Climatisation",
  icon: Thermometer,
  color: "text-red-600",
  bgColor: "bg-red-50",
  tips: [{
    title: "Baisser le thermostat d'1°C",
    description: "Chaque degré de moins représente environ 7% d'économies sur le chauffage. Réglez à 19°C le jour et 16°C la nuit.",
    saving: "7% sur le chauffage",
    difficulty: "Facile",
    impact: 7
  }, {
    title: "Programmer le chauffage",
    description: "Utilisez un thermostat programmable pour adapter la température à vos horaires. Baissez de 5°C quand vous êtes absent ou la nuit.",
    saving: "10-15% sur le chauffage",
    difficulty: "Facile",
    impact: 12
  }, {
    title: "Entretenir la chaudière / le climatiseur",
    description: "Un entretien annuel améliore l'efficacité de 10-15%. Nettoyez les filtres de climatisation tous les mois en été.",
    saving: "10-15%",
    difficulty: "Moyen",
    impact: 12
  }, {
    title: "Isoler portes et fenêtres",
    description: "Posez des joints d'isolation sur les portes et fenêtres qui laissent passer les courants d'air. Coût : quelques euros, économies importantes.",
    saving: "5-10%",
    difficulty: "Moyen",
    impact: 8
  }]
}, {
  id: "cuisine",
  label: "Cuisine & Electroménager",
  icon: Droplets,
  color: "text-amber-600",
  bgColor: "bg-amber-50",
  tips: [{
    title: "Dégivrer le réfrigérateur",
    description: "Un réfrigérateur givré consomme jusqu'à 30% d'électricité en plus. Dégivrez-le régulièrement et maintenez le joint en bon état.",
    saving: "Jusqu'à 30%",
    difficulty: "Facile",
    impact: 8
  }, {
    title: "Remplir le lave-vaisselle",
    description: "Un lave-vaisselle plein consomme autant qu'à demi-plein. Lancez-le uniquement plein et utilisez le programme eco.",
    saving: "20-40% sur l'appareil",
    difficulty: "Facile",
    impact: 5
  }, {
    title: "Cuire à basse température",
    description: "Utilisez les couvercles lors de la cuisson, éteignez le four 10 minutes avant la fin. La chaleur résiduelle termine la cuisson.",
    saving: "10-20% sur la cuisson",
    difficulty: "Facile",
    impact: 4
  }, {
    title: "Décongeler naturellement",
    description: "Décongelez les aliments au réfrigérateur plutôt qu'au micro-ondes. Cela refroidit le frigo gratuitement.",
    saving: "Coût réduit",
    difficulty: "Facile",
    impact: 2
  }]
}, {
  id: "lavage",
  label: "Lavage & Séchage",
  icon: Droplets,
  color: "text-blue-600",
  bgColor: "bg-blue-50",
  tips: [{
    title: "Laver à 30°C",
    description: "Le lavage à 30°C consomme 3 fois moins d'énergie qu'à 90°C. Les lessives modernes sont efficaces à basse température.",
    saving: "Jusqu'à 3x moins",
    difficulty: "Facile",
    impact: 6
  }, {
    title: "Essorer à vitesse maximale",
    description: "Plus le linge est essoré, moins il a besoin de sécher. Augmentez la vitesse d'essorage pour réduire le temps de séchage.",
    saving: "20-30% sur le sèche-linge",
    difficulty: "Facile",
    impact: 4
  }, {
    title: "Sécher en plein air",
    description: "Le sèche-linge est l'un des appareils les plus gourmands (2000-3000W). Séchez votre linge à l'air libre autant que possible.",
    saving: "Jusqu'à 100% du sèche-linge",
    difficulty: "Facile",
    impact: 8
  }]
}, {
  id: "eclairage",
  label: "Éclairage",
  icon: Lightbulb,
  color: "text-yellow-600",
  bgColor: "bg-yellow-50",
  tips: [{
    title: "Passer aux ampoules LED",
    description: "Les LED consomment 80% moins que les ampoules incandescentes et durent 15 fois plus longtemps. Remplacez-les progressivement.",
    saving: "Jusqu'à 80% sur l'éclairage",
    difficulty: "Facile",
    impact: 12
  }, {
    title: "Capteurs de présence",
    description: "Installez des détecteurs de présence dans les couloirs, toilettes et garage pour éteindre automatiquement les lumières.",
    saving: "30-50% sur les zones concernées",
    difficulty: "Moyen",
    impact: 5
  }, {
    title: "Profiter de la lumière naturelle",
    description: "Ouvrez les volets et rideaux en journée. Orientez les espaces de travail vers les fenêtres pour réduire l'éclairage artificiel.",
    saving: "Variable",
    difficulty: "Facile",
    impact: 4
  }]
}, {
  id: "electronique",
  label: "Électronique & Veille",
  icon: Monitor,
  color: "text-purple-600",
  bgColor: "bg-purple-50",
  tips: [{
    title: "Éliminer les appareils en veille",
    description: "La veille représente 5-10% de la consommation électrique. Utilisez des multiprises avec interrupteur pour tout éteindre d'un geste.",
    saving: "5-10% sur la facture totale",
    difficulty: "Facile",
    impact: 8
  }, {
    title: "Configurer la veille des écrans",
    description: "Réglez vos écrans pour s'éteindre après 5 minutes d'inactivité. Activez le mode veille sur votre ordinateur.",
    saving: "20-40% sur les écrans",
    difficulty: "Facile",
    impact: 4
  }, {
    title: "Charger intelligemment",
    description: "Débranchez les chargeurs quand ils ne sont pas utilisés : même sans appareil connecté, ils consomment de l'électricité.",
    saving: "1-2% sur la facture",
    difficulty: "Facile",
    impact: 2
  }]
}, {
  id: "tarif",
  label: "Optimisation tarifaire",
  icon: Euro,
  color: "text-green-600",
  bgColor: "bg-green-50",
  tips: [{
    title: "Heures creuses / heures pleines",
    description: "Avec l'option HP/HC, l'électricité est moins chère la nuit (22h-6h et certains week-ends). Programmez le lave-linge, lave-vaisselle et chauffe-eau sur ces plages.",
    saving: "Jusqu'à 15% sur la facture",
    difficulty: "Moyen",
    impact: 15
  }, {
    title: "Comparer les offres",
    description: "Le marché de l'énergie est ouvert : comparez les offres sur le comparateur officiel energie-info.fr. Une économie de 5-20% est souvent possible.",
    saving: "5-20% sur le tarif",
    difficulty: "Moyen",
    impact: 12
  }, {
    title: "Adapter la puissance du compteur",
    description: "Si vous avez souvent des disjoncteurs qui sautent, augmentez la puissance souscrite. Si vous n'atteignez jamais le plafond, réduisez-la pour payer moins d'abonnement.",
    saving: "3-10€/mois sur l'abonnement",
    difficulty: "Effort",
    impact: 5
  }]
}];
const DIFFICULTY_COLORS = {
  "Facile": "bg-green-100 text-green-700",
  "Moyen": "bg-amber-100 text-amber-700",
  "Effort": "bg-red-100 text-red-700"
};
function TipsPage() {
  const [settings, setSettings] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [openCategories, setOpenCategories] = useState(/* @__PURE__ */ new Set(["eclairage", "electronique"]));
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tous");
  useEffect(() => {
    setSettings(loadSettings());
    setIsMounted(true);
  }, []);
  const toggleCategory = (id) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const stats = useMemo(() => {
    const baseMonthly = settings?.monthlyBudget || 100;
    const totalTips = CATEGORIES.flatMap((c) => c.tips);
    return {
      potentialSaving: Math.round(baseMonthly * 0.35),
      annualSaving: Math.round(baseMonthly * 0.35 * 12),
      easyCount: totalTips.filter((t) => t.difficulty === "Facile").length,
      totalCount: totalTips.length
    };
  }, [settings]);
  if (!isMounted) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50" });
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-in fade-in duration-700", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsx("span", { className: "bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", children: "Optimisation Énergétique" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold text-slate-900 tracking-tight", children: "Espace Conseils" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 mt-2 text-lg", children: "Réduisez votre empreinte carbone et votre facture." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-blue-500" }),
        "Données privées & locales"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 rounded-2xl p-6 text-white mb-10 shadow-xl shadow-green-900/10 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -mr-32 -mt-32 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-green-100 text-sm mb-1", children: "En appliquant tous les conseils" }),
          /* @__PURE__ */ jsxs("p", { className: "text-4xl font-black tracking-tight", children: [
            stats.potentialSaving,
            " € ",
            /* @__PURE__ */ jsx("span", { className: "text-xl font-normal text-green-300", children: "/ mois" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-green-300/80 text-sm mt-1 flex items-center gap-1.5 font-medium", children: [
            /* @__PURE__ */ jsx(Leaf, { className: "w-4 h-4" }),
            " soit ",
            stats.annualSaving,
            " € d'économie annuelle estimée"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/10 p-3 rounded-xl backdrop-blur-md", children: /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-yellow-400" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 hover:bg-white/10 transition-colors rounded-xl py-3 border border-white/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", children: stats.easyCount }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-green-200 font-bold tracking-widest", children: "Faciles" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 hover:bg-white/10 transition-colors rounded-xl py-3 border border-white/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", children: stats.totalCount }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-green-200 font-bold tracking-widest", children: "Actions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/5 hover:bg-white/10 transition-colors rounded-xl py-3 border border-white/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", children: CATEGORIES.length }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase text-green-200 font-bold tracking-widest", children: "Domaines" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-400 uppercase tracking-widest shrink-0", children: "Filtre" }),
      ["Tous", "Facile", "Moyen", "Effort"].map((d) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedDifficulty(d), className: `px-5 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${selectedDifficulty === d ? "bg-green-600 text-white shadow-lg shadow-green-600/20 scale-105" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`, children: d }, d))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: CATEGORIES.map((cat) => {
      const filteredTips = selectedDifficulty === "Tous" ? cat.tips : cat.tips.filter((t) => t.difficulty === selectedDifficulty);
      if (filteredTips.length === 0) return null;
      const isOpen = openCategories.has(cat.id);
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => toggleCategory(cat.id), className: "w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: `${cat.bgColor} p-2.5 rounded-xl transition-transform group-hover:scale-110`, children: /* @__PURE__ */ jsx(cat.icon, { className: `w-5 h-5 ${cat.color}` }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900 text-base", children: cat.label }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 font-medium tracking-wide uppercase", children: [
                filteredTips.length,
                " recommandation",
                filteredTips.length > 1 ? "s" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `p-2 rounded-full transition-all ${isOpen ? "bg-slate-100 rotate-180" : "bg-transparent"}`, children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-slate-400" }) })
        ] }),
        isOpen && /* @__PURE__ */ jsx("div", { className: "border-t border-slate-50 divide-y divide-slate-50 bg-slate-50/30 animate-in slide-in-from-top-2 duration-300", children: filteredTips.map((tip, i) => /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-800 text-base", children: tip.title }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 shrink-0", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest ${DIFFICULTY_COLORS[tip.difficulty]}`, children: tip.difficulty }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 mb-4 leading-relaxed", children: tip.description }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white/80 border border-green-100 rounded-xl px-4 py-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-500 p-1.5 rounded-lg shadow-sm shadow-green-500/20", children: /* @__PURE__ */ jsx(TrendingDown, { className: "w-3.5 h-3.5 text-white" }) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-slate-700", children: [
              "Gain potentiel : ",
              /* @__PURE__ */ jsx("span", { className: "text-green-600", children: tip.saving })
            ] })
          ] })
        ] }, i)) })
      ] }, cat.id);
    }) })
  ] });
}
export {
  TipsPage as component
};
