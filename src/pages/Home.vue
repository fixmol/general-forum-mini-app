<template>
  <div class="card" v-if="!posts.length">
    <h3>Здесь пока пусто, оставьте запись первым!</h3>
  </div>
  <div class="card" v-else>
    <div class="card" v-for="post in posts" :key="post">
      {{post}}
    </div>
  </div>
</template>


<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      posts: store.getters.postsList
    }
  }
}
</script>


<style scoped>
</style>