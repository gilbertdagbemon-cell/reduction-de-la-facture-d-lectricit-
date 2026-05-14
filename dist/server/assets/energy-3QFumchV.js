const CATEGORY_LABELS = {
  chauffage: "Chauffage",
  cuisine: "Cuisine",
  lavage: "Lavage",
  eclairage: "Éclairage",
  electronique: "Électronique",
  climatisation: "Climatisation",
  autre: "Autre"
};
const CATEGORY_COLORS = {
  chauffage: "rgba(239, 68, 68, 0.8)",
  cuisine: "rgba(245, 158, 11, 0.8)",
  lavage: "rgba(59, 130, 246, 0.8)",
  eclairage: "rgba(234, 179, 8, 0.8)",
  electronique: "rgba(139, 92, 246, 0.8)",
  climatisation: "rgba(6, 182, 212, 0.8)",
  autre: "rgba(107, 114, 128, 0.8)"
};
const DEFAULT_APPLIANCES = [
  { id: "1", name: "Réfrigérateur", wattage: 150, hoursPerDay: 24, category: "cuisine" },
  { id: "2", name: "Lave-linge", wattage: 2e3, hoursPerDay: 1, category: "lavage" },
  { id: "3", name: "Téléviseur", wattage: 100, hoursPerDay: 4, category: "electronique" },
  { id: "4", name: "Éclairage (total)", wattage: 200, hoursPerDay: 6, category: "eclairage" },
  { id: "5", name: "Ordinateur", wattage: 150, hoursPerDay: 4, category: "electronique" },
  { id: "6", name: "Chauffe-eau", wattage: 2e3, hoursPerDay: 2, category: "chauffage" }
];
const DEFAULT_SETTINGS = {
  electricityRate: 0.2276,
  monthlyBudget: 80
};
function loadAppliances() {
  if (typeof window === "undefined") return DEFAULT_APPLIANCES;
  try {
    const stored = localStorage.getItem("ecowatt_appliances");
    return stored ? JSON.parse(stored) : DEFAULT_APPLIANCES;
  } catch {
    return DEFAULT_APPLIANCES;
  }
}
function saveAppliances(appliances) {
  if (typeof window === "undefined") return;
  localStorage.setItem("ecowatt_appliances", JSON.stringify(appliances));
}
function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem("ecowatt_settings");
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
function saveSettings(settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem("ecowatt_settings", JSON.stringify(settings));
}
function calcMonthlyKwh(appliance) {
  return appliance.wattage * appliance.hoursPerDay * 30 / 1e3;
}
function calcTotalMonthlyKwh(appliances) {
  return appliances.reduce((sum, a) => sum + calcMonthlyKwh(a), 0);
}
export {
  CATEGORY_LABELS as C,
  loadAppliances as a,
  calcMonthlyKwh as b,
  calcTotalMonthlyKwh as c,
  CATEGORY_COLORS as d,
  saveAppliances as e,
  loadSettings as l,
  saveSettings as s
};
