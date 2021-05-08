<template>
  <input placeholder="Поиск сообщения">
  <button class="search">Найти</button>
</template>


<script>
export default {
  
}
</script>


<style scoped>
  input {
    width: 200px;
    padding: .1rem;
    margin-right: .5rem;
    border: none;
    border-bottom: 2px solid black;
  }
  .search {
    color: #42b983;
    position: relative;
    place-content: center;
    place-items: center;
    width: fit-content;
    letter-spacing: 0.05em;
    border: 1px solid #42b983;
    text-decoration: none;
    margin-top: 10px;
    margin-right: 10px;
    padding: 0.2rem 1rem;
    white-space: nowrap;
    font-weight: 700;
    background: #fff;
    transition: all 0.2s;
  }
  .search:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  .search:active {
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
  }
</style>