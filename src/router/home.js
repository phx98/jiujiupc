export default {
  path: "/Home",
  name: "Home",
  redirect: "/Home/Recommend",
  component: () => import("../views/Home.vue"),
  children: [
    {
      path: "Recommend",
      component: () => import("../components/Home/Recommend")
    },
    {
      path: "Anchor",
      component: () => import("../components/Home/Anchor")
    },
    {
      path: "Rank",
      component: () => import("../components/Home/Rank")
    },
    {
      path: "Newdisc",
      component: () => import("../components/Home/Newdisc")
    },
    {
      path: "Singer",
      component: () => import("../components/Home/Singer")
    }
  ]
};
