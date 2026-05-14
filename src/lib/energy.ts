export type ApplianceCategory =
  | 'chauffage'
  | 'cuisine'
  | 'lavage'
  | 'eclairage'
  | 'electronique'
  | 'climatisation'
  | 'autre'

export interface Appliance {
  id: string
  name: string
  wattage: number
  hoursPerDay: number
  category: ApplianceCategory
}

export interface UserSettings {
  electricityRate: number // €/kWh
  monthlyBudget: number
}

export const CATEGORY_LABELS: Record<ApplianceCategory, string> = {
  chauffage: 'Chauffage',
  cuisine: 'Cuisine',
  lavage: 'Lavage',
  eclairage: 'Éclairage',
  electronique: 'Électronique',
  climatisation: 'Climatisation',
  autre: 'Autre',
}

export const CATEGORY_COLORS: Record<ApplianceCategory, string> = {
  chauffage: 'rgba(239, 68, 68, 0.8)',
  cuisine: 'rgba(245, 158, 11, 0.8)',
  lavage: 'rgba(59, 130, 246, 0.8)',
  eclairage: 'rgba(234, 179, 8, 0.8)',
  electronique: 'rgba(139, 92, 246, 0.8)',
  climatisation: 'rgba(6, 182, 212, 0.8)',
  autre: 'rgba(107, 114, 128, 0.8)',
}

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: '1', name: 'Réfrigérateur', wattage: 150, hoursPerDay: 24, category: 'cuisine' },
  { id: '2', name: 'Lave-linge', wattage: 2000, hoursPerDay: 1, category: 'lavage' },
  { id: '3', name: 'Téléviseur', wattage: 100, hoursPerDay: 4, category: 'electronique' },
  { id: '4', name: 'Éclairage (total)', wattage: 200, hoursPerDay: 6, category: 'eclairage' },
  { id: '5', name: 'Ordinateur', wattage: 150, hoursPerDay: 4, category: 'electronique' },
  { id: '6', name: 'Chauffe-eau', wattage: 2000, hoursPerDay: 2, category: 'chauffage' },
]

const DEFAULT_SETTINGS: UserSettings = {
  electricityRate: 0.2276,
  monthlyBudget: 80,
}

export function loadAppliances(): Appliance[] {
  if (typeof window === 'undefined') return DEFAULT_APPLIANCES
  try {
    const stored = localStorage.getItem('ecowatt_appliances')
    return stored ? JSON.parse(stored) : DEFAULT_APPLIANCES
  } catch {
    return DEFAULT_APPLIANCES
  }
}

export function saveAppliances(appliances: Appliance[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('ecowatt_appliances', JSON.stringify(appliances))
}

export function loadSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try {
    const stored = localStorage.getItem('ecowatt_settings')
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('ecowatt_settings', JSON.stringify(settings))
}

export function calcMonthlyKwh(appliance: Appliance): number {
  return (appliance.wattage * appliance.hoursPerDay * 30) / 1000
}

export function calcTotalMonthlyKwh(appliances: Appliance[]): number {
  return appliances.reduce((sum, a) => sum + calcMonthlyKwh(a), 0)
}

export function calcMonthlyCost(appliances: Appliance[], rate: number): number {
  return calcTotalMonthlyKwh(appliances) * rate
}
