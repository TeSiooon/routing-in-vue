import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMebers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter';
import UsersFooter from './pages/UsersFooter.vue';
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
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
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
    {
      path: '/users',
      // Takie cos pozwala na renderowanie wielu elemenot
      // nazwa i komponent tak jak w slotsach
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      // Przed wejsciem sprawdza czy jakis warunek jest spelniony
      // beforeeach dziala dla kazdej zmiany routingu
      beforeEnter(to, from, next) {
        console.log(to, from);
        next();
      },
    },

    // Dynamiczne przekierowanie uzytkownika jesli cos zle wpisze
    { path: '/:notFound(.*)', component: NotFound },
  ],
  // Definiujemy jak zachowuje sie scrool
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    // cofa uzytkownika do ostatnio zapisanej pozycji
    if (savedPosition) {
      return savedPosition;
    }
    //przenosi uzytkownika na gore
    return {
      left: 0,
      top: 0,
    };
  },
});
// Straznicy routing, co zrobia jesli cos(warunek) jest lub go nie ma
// Np uzywamy tego do autentykacji uzyktownik tj jesli jest zalogowany daj go tam jesli nie to np strona glowna
router.beforeEach((to, from, next) => {
  console.log('Global beforeeach');
  console.log(to, from);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
  next();
});

router.afterEach((to, from) => {
  // wysylanie danych do analizy
  console.log(to, from);
  // dziala po kazdej zmianie sciezki wiec jest useless do walidacji np danych logowania
});

export default router;
