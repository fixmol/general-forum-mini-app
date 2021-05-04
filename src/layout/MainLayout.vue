<template>
  <the-navbar></the-navbar>
  <div class="container with-navbar">
    <router-view></router-view>
  </div>
</template>


<script>
import TheNavbar from '../components/TheNavbar'
import Home from '../pages/Home'

export default {
  components: {
    TheNavbar, Home
  }
}
</script>