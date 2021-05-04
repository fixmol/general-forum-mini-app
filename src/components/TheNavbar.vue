<template>
  <nav class="navbar">
    <h3>Forum Mini App</h3>
    <p>Здравствуй, {{nameLogin}}</p>

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

    function toLogout() {
      localStorage.removeItem('nameLogin')
      router.push('/auth')
    }

    return {
      nameLogin: localStorage.getItem('nameLogin'),
      toLogout
    }
  }
}
</script>