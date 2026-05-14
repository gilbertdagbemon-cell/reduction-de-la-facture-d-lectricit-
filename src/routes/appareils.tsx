import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus, Trash2, Pencil, Check, X, Zap, Euro } from 'lucide-react'
import {
  loadAppliances,
  loadSettings,
  saveAppliances,
  calcMonthlyKwh,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type Appliance,
  type ApplianceCategory,
} from '@/lib/energy'

export const Route = createFileRoute('/appareils')({
  component: AppliancesPage,
})

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ApplianceCategory[]

const PRESETS: Omit<Appliance, 'id'>[] = [
  { name: 'Réfrigérateur', wattage: 150, hoursPerDay: 24, category: 'cuisine' },
  { name: 'Congélateur', wattage: 120, hoursPerDay: 24, category: 'cuisine' },
  { name: 'Lave-linge', wattage: 2000, hoursPerDay: 1, category: 'lavage' },
  { name: 'Sèche-linge', wattage: 3000, hoursPerDay: 0.5, category: 'lavage' },
  { name: 'Lave-vaisselle', wattage: 1800, hoursPerDay: 0.7, category: 'cuisine' },
  { name: 'Four électrique', wattage: 2000, hoursPerDay: 0.5, category: 'cuisine' },
  { name: 'Micro-ondes', wattage: 900, hoursPerDay: 0.3, category: 'cuisine' },
  { name: 'Téléviseur', wattage: 100, hoursPerDay: 4, category: 'electronique' },
  { name: 'Ordinateur de bureau', wattage: 200, hoursPerDay: 4, category: 'electronique' },
  { name: 'Ordinateur portable', wattage: 50, hoursPerDay: 4, category: 'electronique' },
  { name: 'Climatiseur', wattage: 1500, hoursPerDay: 4, category: 'climatisation' },
  { name: 'Radiateur électrique', wattage: 1500, hoursPerDay: 6, category: 'chauffage' },
  { name: 'Chauffe-eau', wattage: 2000, hoursPerDay: 2, category: 'chauffage' },
  { name: 'Éclairage LED (total)', wattage: 100, hoursPerDay: 6, category: 'eclairage' },
  { name: 'Box internet', wattage: 15, hoursPerDay: 24, category: 'electronique' },
]

const EMPTY_FORM = { name: '', wattage: '', hoursPerDay: '', category: 'electronique' as ApplianceCategory }

function AppliancesPage() {
  const [appliances, setAppliances] = useState(loadAppliances)
  const settings = loadSettings()
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(EMPTY_FORM)
  const [showPresets, setShowPresets] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const persist = (updated: Appliance[]) => {
    setAppliances(updated)
    saveAppliances(updated)
  }

  const handleAdd = () => {
    if (!form.name || !form.wattage || !form.hoursPerDay) return
    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: form.name,
      wattage: Number(form.wattage),
      hoursPerDay: Number(form.hoursPerDay),
      category: form.category,
    }
    persist([...appliances, newAppliance])
    setForm(EMPTY_FORM)
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    persist(appliances.filter((a) => a.id !== id))
  }

  const startEdit = (a: Appliance) => {
    setEditId(a.id)
    setEditForm({ name: a.name, wattage: String(a.wattage), hoursPerDay: String(a.hoursPerDay), category: a.category })
  }

  const saveEdit = () => {
    if (!editId) return
    persist(appliances.map((a) =>
      a.id === editId
        ? { ...a, name: editForm.name, wattage: Number(editForm.wattage), hoursPerDay: Number(editForm.hoursPerDay), category: editForm.category }
        : a
    ))
    setEditId(null)
  }

  const addPreset = (preset: Omit<Appliance, 'id'>) => {
    const newAppliance: Appliance = { ...preset, id: Date.now().toString() }
    persist([...appliances, newAppliance])
  }

  const totalKwh = appliances.reduce((s, a) => s + calcMonthlyKwh(a), 0)
  const totalCost = totalKwh * settings.electricityRate

  // Group by category
  const grouped: Partial<Record<ApplianceCategory, Appliance[]>> = {}
  for (const a of appliances) {
    if (!grouped[a.category]) grouped[a.category] = []
    grouped[a.category]!.push(a)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes appareils</h1>
          <p className="text-gray-500 mt-1">Gérez vos appareils électriques pour estimer votre consommation</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="text-sm px-3 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
          >
            Appareils types
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 text-sm px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total mensuel</p>
            <p className="text-lg font-bold text-gray-900">{Math.round(totalKwh)} kWh</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <Euro className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Coût mensuel estimé</p>
            <p className="text-lg font-bold text-gray-900">{totalCost.toFixed(2)} €</p>
          </div>
        </div>
      </div>

      {/* Presets panel */}
      {showPresets && (
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3 text-sm">Ajouter un appareil type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => addPreset(p)}
                className="text-left text-xs p-2.5 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <div className="font-medium text-gray-800">{p.name}</div>
                <div className="text-gray-500 mt-0.5">{p.wattage}W · {p.hoursPerDay}h/j</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-green-200">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm">Nouvel appareil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Nom</label>
              <input
                type="text"
                placeholder="Ex: Climatiseur salon"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Puissance (Watts)</label>
              <input
                type="number"
                placeholder="Ex: 1500"
                min="0"
                value={form.wattage}
                onChange={(e) => setForm({ ...form, wattage: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">Heures d'utilisation/jour</label>
              <input
                type="number"
                placeholder="Ex: 4"
                min="0"
                max="24"
                step="0.5"
                value={form.hoursPerDay}
                onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ApplianceCategory })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" /> Ajouter
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}
              className="px-4 py-2 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Appliances grouped by category */}
      {CATEGORIES.filter((c) => grouped[c]?.length).map((cat) => (
        <div key={cat} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[cat].replace('0.8', '1') }}
            />
            <h2 className="text-sm font-semibold text-gray-700">{CATEGORY_LABELS[cat]}</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr className="text-xs text-gray-500">
                  <th className="text-left px-4 py-3 font-medium">Appareil</th>
                  <th className="text-right px-4 py-3 font-medium">Puissance</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Heures/j</th>
                  <th className="text-right px-4 py-3 font-medium">kWh/mois</th>
                  <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">€/mois</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {grouped[cat]!.map((a) => {
                  const kwh = calcMonthlyKwh(a)
                  const cost = kwh * settings.electricityRate
                  return (
                    <tr key={a.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      {editId === a.id ? (
                        <>
                          <td className="px-4 py-2">
                            <input
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="border border-gray-200 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-green-400"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={editForm.wattage}
                              onChange={(e) => setEditForm({ ...editForm, wattage: e.target.value })}
                              className="border border-gray-200 rounded px-2 py-1 text-sm w-20 text-right focus:outline-none focus:ring-1 focus:ring-green-400"
                            />
                          </td>
                          <td className="px-4 py-2 hidden sm:table-cell">
                            <input
                              type="number"
                              value={editForm.hoursPerDay}
                              onChange={(e) => setEditForm({ ...editForm, hoursPerDay: e.target.value })}
                              className="border border-gray-200 rounded px-2 py-1 text-sm w-16 text-right focus:outline-none focus:ring-1 focus:ring-green-400"
                            />
                          </td>
                          <td className="px-4 py-2 text-right text-gray-400">—</td>
                          <td className="px-4 py-2 hidden sm:table-cell" />
                          <td className="px-4 py-2">
                            <div className="flex gap-1 justify-end">
                              <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditId(null)} className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 font-medium text-gray-800">{a.name}</td>
                          <td className="px-4 py-3 text-right text-gray-600">{a.wattage} W</td>
                          <td className="px-4 py-3 text-right text-gray-600 hidden sm:table-cell">{a.hoursPerDay} h</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-800">{Math.round(kwh)}</td>
                          <td className="px-4 py-3 text-right text-gray-600 hidden sm:table-cell">{cost.toFixed(2)} €</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 justify-end">
                              <button onClick={() => startEdit(a)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDelete(a.id)} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {appliances.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Aucun appareil ajouté. Commencez par ajouter vos appareils électriques.</p>
        </div>
      )}
    </div>
  )
}
