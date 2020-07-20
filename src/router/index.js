import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./home";
import Friend from "./friend";
import Mymusic from "./Mymusic";
import Playlist from "./Playlist";
import Download from "./download";
import Songdetail from "./Songdetail";
import Album from "./Album";
import Playlistdetail from "./Playlistdetail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Home/Recommend"
  },
  Home,
  Friend,
  Mymusic,
  Playlist,
  Download,
  Songdetail,
  Playlistdetail,
  Album
];

const router = new VueRouter({
  routes,
  // mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "active"
});
export default router;
