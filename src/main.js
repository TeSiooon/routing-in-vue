import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = createRouter({
  // Sledzenie historii na stronie np jesli klikniesz back to
  // cofnie tam gdzie tego oczekujemyt
  history: createWebHistory(),
  routes: [
    // dany komponent jest ladowany na danej sciezce
    { path: '/teams', component: TeamsList },
    { path: '/users', component: UsersList },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
