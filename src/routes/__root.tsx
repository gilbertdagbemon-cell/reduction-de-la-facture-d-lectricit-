import { HeadContent, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { Zap, LayoutDashboard, Settings, Lightbulb, Calculator } from 'lucide-react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'ÉcoWatt — Réduire votre facture d\'électricité' },
    ],
  }),
  shellComponent: RootDocument,
})

const navItems = [
  { to: '/', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/appareils', label: 'Appareils', icon: Settings },
  { to: '/calculateur', label: 'Calculateur', icon: Calculator },
  { to: '/conseils', label: 'Conseils', icon: Lightbulb },
]

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 shrink-0">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
              <div className="bg-green-500 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">ÉcoWatt</span>
                <p className="text-xs text-gray-500">Économies d'énergie</p>
              </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium"
                  activeProps={{ className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-medium' }}
                  activeOptions={{ exact: to === '/' }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs font-medium text-green-800">Conseil du jour</p>
                <p className="text-xs text-green-700 mt-1">Éteignez les appareils en veille pour économiser jusqu'à 10% sur votre facture.</p>
              </div>
            </div>
          </aside>

          {/* Mobile header */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 p-1.5 rounded-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-gray-900">ÉcoWatt</span>
              </div>
              <nav className="flex gap-1">
                {navItems.map(({ to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="p-2 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-50"
                    activeProps={{ className: 'p-2 rounded-lg text-green-700 bg-green-50' }}
                    activeOptions={{ exact: to === '/' }}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </nav>
            </header>

            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
