import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import GamesList from "../views/game/GamesList.vue";
import NewGame from "../views/game/NewGame.vue";
import Details from "../views/game/Details.vue";
import Login from "../views/auth/Login.vue";
import LayoutHome from "../views/layouts/guest/LayoutHome.vue";
import LayoutDashboard from "../views/layouts/dashboard/LayoutDashboard.vue";
import DashboardView from "../views/DashboardView.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/auth/Register.vue";
// import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: LayoutHome },
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: LayoutHome },
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: LayoutHome },
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard-view",
    meta: { layout: LayoutDashboard },
    component: DashboardView,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "list",
        name: "games-list",
        component: GamesList,
      },
      {
        path: ":gameId",
        name: "game",
        component: Details,
      },
      {
        path: "new",
        name: "new-game",
        component: NewGame,
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
