const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/Profile/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
  },
  {
    path: "/Episodes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Episodes.vue") }],
  },
  {
    path: "/Episode/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EpisodeDetails.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
