<template>
<div class="contain">
  <div class="header">
    <div class="logo">
      <router-link to="/"><img src="@/assets/instagram-logo1.png" alt="" class="s" style="height:30px;"></router-link>
    </div>
    <div class="items" v-if="!checkToken" style="margin-top:auto; margin-bottom:auto;">&zwnj;</div>
    <div class="items" v-else style="margin-top:auto; margin-bottom:auto;"><router-link to='/'><button class='rad-button good flat'>Post</button></router-link></div>
    <div class="login">
      <button v-if="!checkToken" @click='openModalSign()' class="rad-button wwt flat" id="rad-button">Sign Up</button>
      <button v-if="!checkToken" @click='openModalLogin()' class="rad-button wwt flat" id="rad-button">Log In</button>
      <button v-else @click='logouts()' class="rad-button danger flat" id="rad-button">Sign Out</button>
    </div>
  </div>
  <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
  <div id="modalSign" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <h3 style="text-align: center">Sign Up Form</h3>
      <span class="close" @click='closeModalSign()'>&times;</span>
      <label for="username-sign">Username</label>
      <input type="text" id="username-sign" name="username-sign" v-validate="'required'" v-model='signUsername' placeholder="Your username..">
      <span style="color:red;font-size:10px;" v-show="errors.has('username-sign')" class="help is-danger">{{ errors.first('username-sign') }}</span>
      <label for="email-sign">Email</label>
      <input type="text" id="email-sign" name="email-sign" v-validate="'required'" v-model='signEmail' placeholder="Your email">
      <span style="color:red;font-size:10px;" v-show="errors.has('email-sign')" class="help is-danger">{{ errors.first('email-sign') }}</span>
      <label for="password-sign">Password</label>
      <input type="password" id="password-sign" name="password-sign" v-validate="'required'" v-model='signPassword' placeholder="Password">
      <span style="color:red;font-size:10px;" v-show="errors.has('password-sign')" class="help is-danger">{{ errors.first('password-sign') }}</span>
      <button @click='signup()' style='margin-left: auto;margin-right: auto' class='rad-button good flat'>Sign Up</button>
    </div>
  </div>

  <!-- Trigger/Open The Modal -->
  <!-- The Modal -->
  <div id="modalLogin" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <h3 style="text-align: center">Login</h3>
      <span class="close" @click='closeModalLogin()'>&times;</span>
      <label for="username-login">Username</label>
      <input type="text" id="username-login" name="username-login" v-validate="'required'" v-model='loginUsername' placeholder="Your username..">
      <span style="color:red;font-size:10px;" v-show="errors.has('username-login')" class="help is-danger">{{ errors.first('username-login') }}</span>
      <label for="password-login">Password</label>
      <input type="password" id="password-login" name="password-login" v-validate="'required'" v-model='loginPassword' placeholder="Password">
      <span style="color:red;font-size:10px;" v-show="errors.has('password-login')" class="help is-danger">{{ errors.first('password-login') }}</span>
      <button @click='login()' style='margin-left: auto;margin-right: auto' class='rad-button good flat'>login</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  name: 'Headers',
  data () {
    return {
      hasToken: null,
      signUsername: '',
      signPassword: '',
      signEmail: '',
      loginUsername: '',
      loginPassword: '',
      loginEmail: ''
    }
  },
  methods: {
    closeModalSign: function () {
      var modal = document.getElementById('modalSign')
      modal.style.display = 'none'
    },
    openModalSign: function () {
      var modal = document.getElementById('modalSign')
      modal.style.display = 'block'
    },
    closeModalLogin: function () {
      var modal = document.getElementById('modalLogin')
      modal.style.display = 'none'
    },
    openModalLogin: function () {
      var modal = document.getElementById('modalLogin')
      modal.style.display = 'block'
    },
    signup: function () {
    this.$validator.validateAll().then((result) => {
      if (result) {
        $http.post('/user', {
          username: this.signUsername,
          email: this.signEmail,
          password: this.signPassword
        })
          .then(res => {
            console.log(res)
            swal({
              type: 'success',
              text: 'Welcome to jepretgram!'
            }).then((next) => {
              this.closeModalSign()
              localStorage.setItem('token', res.data.token)
              // window.location.reload()
              this.$router.push('/')
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    },
    login: function () {
      this.$validator.validateAll().then((result) => {
      if (result) {
        $http.post('/user/login', {
          username: this.loginUsername,
          password: this.loginPassword
        })
          .then(res => {
            console.log(res)
            swal({
              type: 'success',
              text: 'You have successfully signed in'
            }).then((next) => {
              this.closeModalSign()
              localStorage.setItem('token', res.data.token)
              // window.location.reload()
              this.$router.push('/')
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    }
  },
  computed: {
    checkToken: function () {
      return this.hasToken
    },
    logouts: function () {
      console.log('hello')
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.hasToken = true
    } else {
      this.hasToken = false
    }
  }
}
</script>

<style scoped>

* {
  font-family: Helvetica, Arial, sans-serif;
}

.contain{
  width: 100%;
  top: 0;
  margin: 0;
  border-bottom: 0.5x solid silver;
  box-shadow: 5px 5px 20px 10px silver
}

.header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  text-align: center;
  padding: 20px;
  border-bottom: 0.5px solid lightgrey;
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}


input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}



</style>
