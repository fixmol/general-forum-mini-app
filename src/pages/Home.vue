<template>
  <AppLoader v-if="isShowLoading"/>

  <div class="card" v-if="!posts.length && !isShowLoading">
    <h3>Здесь пока пусто, оставьте запись первым!</h3>
  </div>

  <div class="card post-list" v-if="posts.length && !isShowLoading" v-scroll>
    <div class="card" v-for="post in posts" :key="post.id">
      <p><span>{{post.userName}}</span> | {{post.time}}</p>
      <div>{{post.textField}}</div>
      <img class="post-image" :src="post.urlImg" :alt="post.urlImg" v-if="post.urlImg">
    </div>
  </div>

  <div class="card" v-if="!isShowLoading">
    <label for="textarea">Введите текст для публикации</label>
    <textarea id="textarea" v-model="textField"></textarea>

    <label for="url-img">Вставьте URL ссылку картинки для добавления</label>
    <input class="url-adress" id="url-img"
      placeholder="URL картинки" v-model="urlImg">

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
import AppLoader from '../components/AppLoader'
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

export default {
  directives: {
    scroll: {
      mounted(value) {
        value.scrollTop = value.scrollHeight
      }
    }
  },

  setup() {
    const posts = ref([])
    const textField = ref('')
    const urlImg = ref('')
    const lastPostKey = ref('')
    const isShowLoading = ref(false)

    watch(isShowLoading, () => {
      if (isShowLoading.value === true) {
        document.body.style.overflow = 'hidden'
      }
    })

    onMounted(async () => {
      isShowLoading.value = true
      const response = await axios.get('https://general-forum-mini-app-default-rtdb.europe-west1.firebasedatabase.app/postlist.json')

      if (response.data === null) {
        isShowLoading.value = false
        return posts.value = []
      }
      const resultParse = Object.keys(response.data).map(elemKey => {
        return {
          id: elemKey,
          userName: response.data[elemKey].userName,
          textField: response.data[elemKey].textField,
          time: response.data[elemKey].time,
          urlImg: response.data[elemKey].urlImg
        }
      })
      posts.value = resultParse
      isShowLoading.value = false
    })

    async function toSend() {
      if (textField.value !== '') {
        const postData = {
          userName: localStorage.getItem('userName'),
          textField: textField.value,
          time: new Date().toLocaleString(),
          urlImg: urlImg.value ? urlImg.value : null
        }
        const url = 'https://general-forum-mini-app-default-rtdb.europe-west1.firebasedatabase.app/postlist.json'
        const response = await axios.post(url, postData)
        postData.id = response.data.name
        posts.value.push(postData)
        textField.value = ''
        urlImg.value = ''
        lastPostKey.value = response.data.name

        let divScroll = await document.querySelector('.post-list')
        divScroll.scrollTop = divScroll.scrollHeight
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
      urlImg,
      lastPostKey,
      toSend,
      toDeleteLastPost,
      isShowLoading
    }
  },

  components: {
    AppLoader
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
    margin-bottom: .5rem;
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
  .card.post-list span {
    font-weight: bold;
    color: rgb(129, 16, 78);
  }
  .url-adress {
    display: block;
    margin-top: .5rem;
    padding: .5rem .5rem;
    width: 100%;
  }
  .post-image {
    margin-top: .2rem;
    width: 300px;
  }
</style>