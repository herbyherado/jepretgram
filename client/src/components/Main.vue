<template>
<div>
  <headers></headers>
  <div class="main-title">Jepretgram</div>
  <div class="main">
    <div class="photo-feed" v-for='(post, i) in posts' :key='i'>
      <div class="photo">
        <img class='photobox' :src="post.imageUrl" alt="" srcset="">
        <h3 class='caption'>{{ post.caption }}</h3>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
// import { mapState } from 'vuex'
import Headers from '@/components/Headers'

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  name: 'Main',
  data () {
    return {
      posts: []
    }
  },
  components: {
    Headers: Headers
  },
  created () {
    $http.get('/photo')
      .then(photo => {
        // console.log(photo)
        this.posts.push(...photo.data.photo)
        console.log(this.posts)
      })
  }
}
</script>

<style>
.main-title{
  text-align: center;
  font-size: 40px;
  margin-top: 2em;
}
.main {
  margin-top: 5vw;
  margin-left: 18vw;
  margin-bottom: 5vw;
  margin-right: 18vw;
}
.photo-feed {
  display:grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  text-align: center;
  margin-bottom: 10vw;
}

.photo {
  height: 40vw;
  width: 40vw;
  border: 0.5px solid silver;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

.photobox {
  object-fit: cover;
  height: 40vw;
  width:40vw;
  overflow: hidden;
}

.caption {
  font-size: 16px;
}

/* button */

.rad-button {
  white-space: nowrap;
  top: 0px;
  border-radius: 4px;
  position: relative;
  border: none;
  background: none;
  font-family: "Roboto", sans-serif;
  width: 200px;
  height: 50px;
  cursor: pointer;
  transition: 0.1s all ease;
  font-size: 16px;
  font-weight: 300;
  color: #777;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 0px 0px 0px #b8b8b8;
}
#rad-button {
  width: 100px;
  height: 35px;
}
.rad-button:focus {
  outline: 0;
}
.rad-button:hover {
  background-color: #f5f5f5;
  top: -2px;
  height: 52px;
  border-bottom: 4px solid #ccc;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
}
.rad-button:hover.static {
  top: 0px;
  height: 50px;
}
.rad-button:active {
  top: 0px;
  height: 50px;
  border: 1px solid #ccc;
  background-color: #ededed;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.15);
}

.rad-button.good {
  background-color: #b9e9ce;
  color: #759f87;
  border-bottom: 1px solid #759f87;
}
.rad-button.good:hover {
  background-color: #caf3db;
  top: -2px;
  border-bottom: 4px solid #759f87;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
.rad-button.good:active {
  top: 0px;
  border: 1px solid #759f87;
  background-color: #a5dabc;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.rad-button.danger {
  background-color: #e7a796;
  color: #7b5348;
  border-bottom: 1px solid #7b5348;
}
.rad-button.danger:hover {
  background-color: #f2beb1;
  top: -2px;
  border-bottom: 4px solid #7b5348;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
.rad-button.danger:active {
  top: 0px;
  border: 1px solid #7b5348;
  background-color: #d69280;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.rad-button.warning {
  background-color: #f3eac5;
  color: #bd8d32;
  border-bottom: 1px solid #bcb496;
}
.rad-button.warning:hover {
  background-color: #faf5df;
  top: -2px;
  border-bottom: 4px solid #bcb496;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
.rad-button.warning:active {
  top: 0px;
  border: 1px solid #bcb496;
  background-color: #e6dcb5;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.rad-button.wwt {
  background-color: #32699b;
  color: #DBE9F5;
  border-bottom: 1px solid #1A4164;
}
.rad-button.wwt:hover {
  background-color: #427BAE ;
  top: -2px;
  border-bottom: 4px solid #1A4164;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
}
.rad-button.wwt:active {
  top: 0px;
  border: 1px solid #1A4164;
  background-color: #255988;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
}


</style>
