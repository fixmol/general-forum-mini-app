<template>
  <nav class="navbar">
    <h3>Forum Mini App</h3>
    <p>Здравствуй, <span>{{userName}}</span></p>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="toLogout">Выход</a>
      </li>
    </ul>
  </nav>
</template>


<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    return {
      userName: localStorage.getItem('userName'),
      toLogout: () => {
        localStorage.removeItem('userName')
        router.push('/auth')
      },
    }
  }
}
</script>


<style scoped>
 .navbar h3 {
   color: rgb(129, 16, 78);
 }
 .navbar span {
   font-weight: bold;
   color: rgb(129, 16, 78);
 }
</style>