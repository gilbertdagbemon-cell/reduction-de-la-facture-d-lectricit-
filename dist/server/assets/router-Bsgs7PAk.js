import { createRootRoute, HeadContent, Link, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { Zap, LayoutDashboard, Settings, Calculator, Lightbulb } from "lucide-react";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler } from "chart.js";
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ÉcoWatt — Réduire votre facture d'électricité" }
    ]
  }),
  shellComponent: RootDocument
});
const navItems = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/appareils", label: "Appareils", icon: Settings },
  { to: "/calculateur", label: "Calculateur", icon: Calculator },
  { to: "/conseils", label: "Conseils", icon: Lightbulb }
];
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-gray-50 min-h-screen", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-screen overflow-hidden", children: [
        /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-6 py-5 border-b border-gray-200", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-500 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5 text-white" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 text-lg", children: "ÉcoWatt" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Économies d'énergie" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 px-4 py-6 space-y-1", children: navItems.map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxs(
            Link,
            {
              to,
              className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium",
              activeProps: { className: "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-medium" },
              activeOptions: { exact: to === "/" },
              children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
                label
              ]
            },
            to
          )) }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-4 border-t border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "bg-green-50 rounded-lg p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-green-800", children: "Conseil du jour" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-green-700 mt-1", children: "Éteignez les appareils en veille pour économiser jusqu'à 10% sur votre facture." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
          /* @__PURE__ */ jsxs("header", { className: "md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-green-500 p-1.5 rounded-lg", children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: "ÉcoWatt" })
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "flex gap-1", children: navItems.map(({ to, icon: Icon }) => /* @__PURE__ */ jsx(
              Link,
              {
                to,
                className: "p-2 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-50",
                activeProps: { className: "p-2 rounded-lg text-green-700 bg-green-50" },
                activeOptions: { exact: to === "/" },
                children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
              },
              to
            )) })
          ] }),
          /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./conseils-DrLcnXao.js");
const Route$3 = createFileRoute("/conseils")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./calculateur-B9SgeMQ6.js");
const Route$2 = createFileRoute("/calculateur")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./appareils-BQqCxjiZ.js");
const Route$1 = createFileRoute("/appareils")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BBz4fdf_.js");
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ConseilsRoute = Route$3.update({
  id: "/conseils",
  path: "/conseils",
  getParentRoute: () => Route$4
});
const CalculateurRoute = Route$2.update({
  id: "/calculateur",
  path: "/calculateur",
  getParentRoute: () => Route$4
});
const AppareilsRoute = Route$1.update({
  id: "/appareils",
  path: "/appareils",
  getParentRoute: () => Route$4
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AppareilsRoute,
  CalculateurRoute,
  ConseilsRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
