<template>
  <button @click="przejdz">Przejd na inna strone</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return { changesSaved: false };
  },
  methods: {
    przejdz() {
      // Jakis kodzik a potem bac leci na inna strone
      this.$router.push('/');
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  // Jesli nie chcemy tego uzywac w routingu w mainie mozemy dac do komponentu
  beforeRouteEnter() {},
  beforeRouteUpdate() {},

  beforeRouteLeave(to, from, next) {
    console.log('Users list cmp beforerouytelive');
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const userLeave = confirm('Are u sure?');
      next(userLeave);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
