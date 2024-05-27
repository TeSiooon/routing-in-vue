import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMebers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

const router = createRouter({
  // Sledzenie historii na stronie np jesli klikniesz back to
  // cofnie tam gdzie tego oczekujemyt
  history: createWebHistory(),
  routes: [
    //  Redirect to wiadomka przekierowanie ale mozna zrobic to inaczej ('lepiej')
    // I tutaj chodzi o alias
    //  { path: '/teams', component: TeamsList, alias: '/' },
    // dany komponent jest ladowany na danej sciezce
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      component: TeamsList,
      // Tak sie zagniezdza linki
      children: [
        // Definicja dynamicznej sciezki
        // Jesli damy props router wie ze dinamiczne sciezki sa przekazywane przez propsy
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMebers,
          props: true,
        },
      ],
    },
    { path: '/users', component: UsersList },

    // Dynamiczne przekierowanie uzytkownika jesli cos zle wpisze
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
