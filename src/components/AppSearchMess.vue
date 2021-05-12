<template>
  <input placeholder="Поиск сообщения" v-model="messageSearch">
  <button class="search" @click="toSearch">&#128269;</button>
</template>


<script>
import { ref } from 'vue'

export default {
  emits: ['search-elem'],

  setup(_, context) {
    const messageSearch = ref('')
    function toSearch() {
      context.emit('search-elem', messageSearch.value)
    }

    return {
      messageSearch, toSearch
    }
  }
}
</script>


<style scoped>
  input {
    width: 200px;
    background: rgba(255, 255, 255, 0);
    color: rgba(255, 255, 255, 0.801);
    padding: .1rem .2rem;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.637);
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.671);
  }
  .search {
    border: none;
    font-size: 18px;
    background: rgba(255, 255, 255, 0);
    transition: all 0.2s;
  }
  .search:hover {
    cursor: pointer;
    opacity: 0.8;
  }
</style>