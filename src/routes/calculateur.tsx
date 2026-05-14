import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Calculator, Euro, Zap, TrendingDown, Info } from 'lucide-react'
import { loadAppliances, loadSettings, saveSettings, calcTotalMonthlyKwh, type UserSettings } from '@/lib/energy'

export const Route = createFileRoute('/calculateur')({
  component: CalculatorPage,
})

const FRENCH_TARIFFS = [
  { label: 'Tarif Bleu EDF (Base)', rate: 0.2516, description: 'Tarif réglementé' },
  { label: 'Tarif Bleu EDF (HP/HC)', rate: 0.2068, description: 'Heures pleines / creuses moyennées' },
  { label: 'Tarif marché moyen', rate: 0.2276, description: 'Moyenne des offres de marché' },
  { label: 'Tarif vert / renouvelable', rate: 0.2150, description: 'Offres énergie verte' },
]

function CalculatorPage() {
  const appliances = loadAppliances()
  const [settings, setSettings] = useState<UserSettings>(loadSettings)
  const [manualKwh, setManualKwh] = useState('')
  const [useManual, setUseManual] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)

  const autoKwh = calcTotalMonthlyKwh(appliances)
  const kwhToUse = useManual && manualKwh ? Number(manualKwh) : autoKwh

  const monthlyCost = kwhToUse * settings.electricityRate
  const annualCost = monthlyCost * 12
  const costPerDay = monthlyCost / 30

  const handleSave = () => {
    saveSettings(settings)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2000)
  }

  const reductions = [
    { label: 'Réduction de 5%', pct: 0.05 },
    { label: 'Réduction de 10%', pct: 0.10 },
    { label: 'Réduction de 20%', pct: 0.20 },
    { label: 'Réduction de 30%', pct: 0.30 },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calculateur de facture</h1>
        <p className="text-gray-500 mt-1">Estimez votre facture et configurez vos paramètres</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Paramètres de calcul</h2>
          </div>

          <div className="space-y-4">
            {/* Tariff selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Tarif électricité</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {FRENCH_TARIFFS.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setSettings({ ...settings, electricityRate: t.rate })}
                    className={`text-left p-3 border rounded-lg text-sm transition-colors ${
                      Math.abs(settings.electricityRate - t.rate) < 0.001
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{t.label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.description} · {t.rate.toFixed(4)} €/kWh</div>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 shrink-0">Ou saisissez votre tarif :</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  value={settings.electricityRate}
                  onChange={(e) => setSettings({ ...settings, electricityRate: Number(e.target.value) })}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <span className="text-xs text-gray-500">€/kWh</span>
              </div>
            </div>

            {/* Monthly budget */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Budget mensuel cible</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={settings.monthlyBudget}
                  onChange={(e) => setSettings({ ...settings, monthlyBudget: Number(e.target.value) })}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <span className="text-sm text-gray-500">€/mois</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              {savedMsg ? '✓ Sauvegardé' : 'Enregistrer les paramètres'}
            </button>
          </div>
        </div>

        {/* Consumption input */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Consommation</h2>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setUseManual(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                !useManual ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Calculé automatiquement
            </button>
            <button
              onClick={() => setUseManual(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                useManual ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Saisie manuelle
            </button>
          </div>

          {!useManual ? (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Info className="w-4 h-4 text-green-600 shrink-0" />
              <p className="text-sm text-green-800">
                Basé sur {appliances.length} appareils configurés : <strong>{Math.round(autoKwh)} kWh/mois</strong>
              </p>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Consommation mensuelle réelle</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder={String(Math.round(autoKwh))}
                  value={manualKwh}
                  onChange={(e) => setManualKwh(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <span className="text-sm text-gray-500">kWh/mois</span>
                <span className="text-xs text-gray-400">(visible sur votre facture)</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Euro className="w-5 h-5 text-green-600" />
            <h2 className="font-semibold text-gray-900">Estimation de votre facture</h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Par jour</p>
              <p className="text-2xl font-bold text-gray-900">{costPerDay.toFixed(2)} €</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl ring-2 ring-green-400">
              <p className="text-xs text-gray-500 mb-1">Par mois</p>
              <p className="text-2xl font-bold text-green-700">{monthlyCost.toFixed(2)} €</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Par an</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(annualCost)} €</p>
            </div>
          </div>

          {/* Budget indicator */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0 €</span>
              <span>Budget: {settings.monthlyBudget} €</span>
              <span>{(settings.monthlyBudget * 1.5).toFixed(0)} €</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 relative">
              <div
                className={`h-3 rounded-full transition-all ${monthlyCost > settings.monthlyBudget ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((monthlyCost / (settings.monthlyBudget * 1.5)) * 100, 100)}%` }}
              />
              <div
                className="absolute top-0 h-3 w-0.5 bg-gray-400"
                style={{ left: `${(settings.monthlyBudget / (settings.monthlyBudget * 1.5)) * 100}%` }}
              />
            </div>
            <p className={`text-xs mt-1 ${monthlyCost > settings.monthlyBudget ? 'text-red-600' : 'text-green-600'}`}>
              {monthlyCost > settings.monthlyBudget
                ? `Dépassement de ${(monthlyCost - settings.monthlyBudget).toFixed(2)} € par rapport au budget`
                : `${(settings.monthlyBudget - monthlyCost).toFixed(2)} € sous le budget — bien joué !`}
            </p>
          </div>

          {/* Savings scenarios */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-900">Scénarios de réduction</h3>
            </div>
            <div className="space-y-2">
              {reductions.map((r) => {
                const saved = monthlyCost * r.pct
                const newCost = monthlyCost - saved
                return (
                  <div key={r.label} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{r.label}</p>
                      <p className="text-xs text-gray-500">Nouvelle facture : {newCost.toFixed(2)} €/mois</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-700">-{saved.toFixed(2)} €</p>
                      <p className="text-xs text-gray-500">-{Math.round(saved * 12)} €/an</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
