<template>
  <div class="card" v-if="!posts.length">
    <h3>Здесь пока пусто, оставьте запись первым!</h3>
  </div>

  <div class="card post-list" v-else>
    <div class="card" v-for="post in posts" :key="post.id">
      <p>{{post.userName}} | {{post.time}}</p>
      <div>{{post.textField}}</div>
    </div>
  </div>

  <div class="card">
    <label for="textarea">Введите текст для публикации</label>
    <textarea id="textarea" v-model="textField"></textarea>
    <button class="btn primary"
      @click="toSend">
      Отправить
    </button>
    <button class="btn danger"
      :disabled="!lastPostKey"
      @click="toDeleteLastPost">
      Удалить последнюю запись
    </button>
  </div>
</template>


<script>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const posts = ref([])
    const textField = ref('')
    const lastPostKey = ref('')

    // watch(textField, () => {
    //   console.log(textField.value)
    // })

    onMounted(async () => {
      const response = await axios.get('https://general-forum-mini-app-default-rtdb.europe-west1.firebasedatabase.app/postlist.json')

      if (response.data === null) {
        return posts.value = []
      }
      const resultParse = Object.keys(response.data).map(elemKey => {
        return {
          id: elemKey,
          userName: response.data[elemKey].userName,
          textField: response.data[elemKey].textField,
          time: response.data[elemKey].time
        }
      })
      posts.value = resultParse
    })

    async function toSend() {
      if (textField.value !== '') {
        const postData = {
          userName: localStorage.getItem('userName'),
          textField: textField.value,
          time: new Date().toLocaleString()
        }
        const url = 'https://general-forum-mini-app-default-rtdb.europe-west1.firebasedatabase.app/postlist.json'
        const response = await axios.post(url, postData)
        postData.id = response.data.name
        posts.value.push(postData)
        textField.value = ''
        lastPostKey.value = response.data.name
      }
    }

    async function toDeleteLastPost() {
      await axios.delete(`https://general-forum-mini-app-default-rtdb.europe-west1.firebasedatabase.app/postlist/${lastPostKey.value}.json`)
      posts.value = posts.value.filter(elem => elem.id !== lastPostKey.value)
      lastPostKey.value = ''
    }

    return {
      posts,
      textField,
      lastPostKey,
      toSend,
      toDeleteLastPost
    }
  }
}
</script>


<style scoped>
  .card textarea {
    display: block;
    resize: none;
    width: 100%;
    height: 80px;
    margin-top: .5rem;
    padding: .2rem .5rem;
    font-size: 16px;
  }
  .card.post-list {
    background: rgba(131, 131, 131, 0.719);
    background: rgb(192, 192, 192);
    height: 500px;
    overflow-y: auto;
    margin-bottom: 1.5rem;
  }
</style>