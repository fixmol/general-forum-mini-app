<template>
  <div class="container">
    <form class="card form-card">
      <h2>Выполните авторизацию</h2>

      <div class="form-control">
        <label for="name">Отображаемое имя</label>
        <input type="text" id="name" ref="nameRef" v-model="userName">
        <small>{{ smallInfo.name }}</small>
      </div>
      <div class="form-control">
        <label for="email">Введите email</label>
        <input type="email" id="email" ref="emailRef" v-model="userEmail">
        <small>{{ smallInfo.email }}</small>
      </div>
      <div class="form-control">
        <label for="pass">Введите пароль</label>
        <input type="password" id="pass"
        placeholder="Не менее 6 символов" ref="passRef"
        v-model="userPass">
        <small>{{ smallInfo.pass }}</small>
      </div>

      <button type="submit" class="btn primary"
        @click.prevent="toAuthEnter">
        Войти </button>
    </form>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
import { ref, reactive, watch } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const userName = ref('')
    const userEmail = ref('')
    const userPass = ref('')

    const smallInfo = reactive({
      name: '', email: '', pass: ''
    })

    const validFormElems = reactive({
      isValidName: false,
      isValidEmail: false,
      isValidPass: false
    })

    watch(userName, () => {
      if (userName.value.length < 2) {
        smallInfo.name = 'Не менее 2 символов в имени'
        validFormElems.isValidName = false
      } else {
        smallInfo.name = ''
        validFormElems.isValidName = true
      }
    })
    watch(userEmail, () => {
      const validEmail = /^[a-zA-z0-9]+[-._]{0,1}[a-zA-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(userEmail.value)
      if (!validEmail) {
        smallInfo.email = 'Некорректный email'
        validFormElems.isValidEmail = false
      } else {
        smallInfo.email = ''
        validFormElems.isValidEmail = true
      }
    })
    watch(userPass, () => {
      const validPass = /^[a-zA-Z0-9$]+$/.test(userPass.value)
      if (userPass.value.length < 6) {
        smallInfo.pass = 'Слишком короткий пароль'
        validFormElems.isValidPass = false
      } else if (!validPass) {
        smallInfo.pass = 'Недопустимые символы в пароле'
        validFormElems.isValidPass = false
      } else {
        smallInfo.pass = ''
        validFormElems.isValidPass = true
      }
    })

    const nameRef = ref(null)
    const emailRef = ref(null)
    const passRef = ref(null)

    function toAuthEnter() {
      if (userName.value === '') {
        nameRef.value.classList.add('warning-field')
        nameRef.value.placeholder = 'Поле не может быть пустым'
      }
      if (userEmail.value === '') {
        emailRef.value.classList.add('warning-field')
        emailRef.value.placeholder = 'Поле не может быть пустым'
      }
      if (userPass.value === '') {
        passRef.value.classList.add('warning-field')
        passRef.value.placeholder = 'Поле не может быть пустым'
      }

      const isValid = Object.keys(validFormElems).every(elem => validFormElems[elem] === true)
      if (isValid) {
        router.push('/')
      }
    }

    return {
      userName, userEmail, userPass,
      nameRef, emailRef, passRef,
      smallInfo,
      toAuthEnter,
    }
  }
}
</script>


<style scoped>
  .form-card {
    padding-left: 2rem;
  }
  .form-card h2 {
    text-align: center;
    padding-bottom: .8rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.342);
  }
  .warning-field::placeholder {
    color: rgba(194, 0, 0, 0.801);
    text-align: center;
  }
</style>