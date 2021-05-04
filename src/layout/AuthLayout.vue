<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script>
import Auth from '../pages/Auth'

export default {
  components: {
    Auth
  }
}
</script>