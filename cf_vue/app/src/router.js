import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import NotFound from './components/404.vue';

const routes = [
  {path: '/about', component: About},
  {path: '/home', component: Home},
  {path: '*', component: NotFound}
];

const router = new VueRouter({routes});
export default router;