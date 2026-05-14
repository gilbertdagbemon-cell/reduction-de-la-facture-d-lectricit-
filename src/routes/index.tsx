import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { Zap, TrendingDown, Euro, Leaf, AlertTriangle, ChevronRight } from 'lucide-react'
import {
  loadAppliances,
  loadSettings,
  calcMonthlyKwh,
  calcTotalMonthlyKwh,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type ApplianceCategory,
} from '@/lib/energy'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export const Route = createFileRoute('/')({
  component: Dashboard,
})

const SAVING_TIPS = [
  { label: 'Mode veille éliminé', saving: 0.08 },
  { label: 'Éclairage LED partout', saving: 0.12 },
  { label: 'Lavage à froid (30°)', saving: 0.06 },
  { label: 'Thermostat -1°C', saving: 0.07 },
  { label: 'Heures creuses', saving: 0.15 },
]

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [appliances, setAppliances] = useState(loadAppliances)
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    setMounted(true)
    setAppliances(loadAppliances())
    setSettings(loadSettings())
  }, [])

  const totalKwh = calcTotalMonthlyKwh(appliances)
  const monthlyCost = totalKwh * settings.electricityRate
  const annualCost = monthlyCost * 12
  const potentialSavings = monthlyCost * 0.30
  const overBudget = monthlyCost > settings.monthlyBudget

  // Group by category for donut chart
  const categoryMap: Record<string, number> = {}
  for (const a of appliances) {
    categoryMap[a.category] = (categoryMap[a.category] || 0) + calcMonthlyKwh(a)
  }
  const categories = Object.keys(categoryMap) as ApplianceCategory[]
  const donutData = {
    labels: categories.map((c) => CATEGORY_LABELS[c]),
    datasets: [{
      data: categories.map((c) => Math.round(categoryMap[c])),
      backgroundColor: categories.map((c) => CATEGORY_COLORS[c]),
      borderWidth: 0,
    }],
  }

  // Simulate monthly consumption (current month is index based on today)
  const today = new Date()
  const currentMonth = today.getMonth()
  const baseKwh = totalKwh
  const monthlyData = MONTHS.map((_, i) => {
    const seasonal = i >= 10 || i <= 1 ? 1.3 : i >= 5 && i <= 8 ? 1.15 : 1.0
    const isPast = i <= currentMonth
    return isPast ? Math.round(baseKwh * seasonal * (0.9 + Math.random() * 0.2)) : null
  })

  const barData = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Consommation (kWh)',
        data: monthlyData,
        backgroundColor: MONTHS.map((_, i) =>
          i === currentMonth ? 'rgba(16, 185, 129, 0.9)' : 'rgba(16, 185, 129, 0.4)'
        ),
        borderRadius: 6,
      },
    ],
  }

  const stats = [
    {
      title: 'Consommation mensuelle',
      value: `${Math.round(totalKwh)} kWh`,
      sub: `${Math.round(totalKwh / 30)} kWh/jour`,
      icon: Zap,
      color: 'bg-blue-500',
    },
    {
      title: 'Facture estimée',
      value: `${monthlyCost.toFixed(2)} €`,
      sub: overBudget ? `⚠ Budget dépassé de ${(monthlyCost - settings.monthlyBudget).toFixed(0)} €` : `✓ Dans le budget`,
      icon: Euro,
      color: overBudget ? 'bg-red-500' : 'bg-emerald-500',
    },
    {
      title: 'Coût annuel',
      value: `${Math.round(annualCost)} €`,
      sub: `${(annualCost / 12).toFixed(2)} €/mois en moyenne`,
      icon: TrendingDown,
      color: 'bg-amber-500',
    },
    {
      title: 'Économies potentielles',
      value: `${Math.round(potentialSavings)} €/mois`,
      sub: `Jusqu'à ${Math.round(potentialSavings * 12)} €/an`,
      icon: Leaf,
      color: 'bg-green-500',
    },
  ]

  // Top consumers
  const topConsumers = [...appliances]
    .sort((a, b) => calcMonthlyKwh(b) - calcMonthlyKwh(a))
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord énergétique</h1>
        <p className="text-gray-500 mt-1">Suivez et réduisez votre consommation d'électricité</p>
      </div>

      {overBudget && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm">Votre consommation estimée dépasse votre budget mensuel de {settings.monthlyBudget} €. Consultez nos <Link to="/conseils" className="underline font-medium">conseils d'économie</Link>.</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.title} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
            <div className={`${s.color} p-2.5 rounded-lg shrink-0`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{s.title}</p>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly bar chart */}
        {mounted && (
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Consommation mensuelle (kWh)</h2>
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        )}

        {/* Donut */}
        {mounted && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Répartition par usage</h2>
            <Doughnut
              data={donutData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } },
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top consumers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Principaux consommateurs</h2>
            <Link to="/appareils" className="text-xs text-green-600 hover:text-green-700 flex items-center gap-0.5">
              Voir tout <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {topConsumers.map((a) => {
              const kwh = calcMonthlyKwh(a)
              const pct = Math.round((kwh / totalKwh) * 100)
              return (
                <div key={a.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{a.name}</span>
                    <span className="text-gray-500">{Math.round(kwh)} kWh/mois ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Savings potential */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Économies potentielles</h2>
            <Link to="/conseils" className="text-xs text-green-600 hover:text-green-700 flex items-center gap-0.5">
              Voir les conseils <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {SAVING_TIPS.map((tip) => (
              <div key={tip.label} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-sm text-gray-700">{tip.label}</span>
                </div>
                <span className="text-sm font-semibold text-green-700">
                  -{(monthlyCost * tip.saving).toFixed(1)} €/mois
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-600 rounded-lg text-white">
            <p className="text-xs opacity-80">En appliquant tous les conseils</p>
            <p className="text-lg font-bold">Économisez jusqu'à {Math.round(potentialSavings)} €/mois</p>
          </div>
        </div>
      </div>
    </div>
  )
}
