<template>
  <div class="nav">
    <div class="logo-container">
      <!-- <div class="logo"></div>
      <div class="logo-text">
        <p class="fs18">教育资源公共服务平台</p>
        <p  class="fs7">Education resource public service platform</p>
      </div> -->
			<img class="logoImg" src="../../../../assets/images/logo.png"/>
    </div>
    <div class="nav-bar">
      <router-link class="nav-item home" tag="div" to="/home">首页</router-link>
      <router-link class="nav-item" tag="div" to="/resource">资源中心</router-link>
      <router-link class="nav-item" tag="div" to="/lesson" @click.native="getCurCrumb('微课中心','/lesson')">微课中心</router-link>
      <router-link class="nav-item" tag="div" to="/news" @click.native="getCurCrumb('资讯中心','/news')">资讯中心</router-link>
      <div class="nav-item login" :class="{logged: isTeacher !== '' }" :title="title" @click="toLogin">
        {{user}}
      </div>
      <div v-if="showInfo" class="prefile">
        <div class="arrow"></div>
        <div v-if="isTeacher == 1">
          <p class="item" v-for="item in teacher" :key="item.id" @click="switchPage(item.id)"> {{item.name}} </p>
        </div>
        <div v-if="isTeacher == 0">
          <p class="item" v-for="item in student" :key="item.id" @click="switchPage(item.id)"> {{item.name}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: '登录',
      showInfo: false,
      teacher: [
        {id: "upload", name: "上传" },
        {id: "profile", name: "个人中心" },
        {id: "logout", name: "退出" }
      ],
      student: [
        {id: "profile", name: "个人中心" },
        {id: "logout", name: "退出" }
      ]
    }
  },
  computed: {
    ...mapState(['isTeacher']),
    title() {
      return this.user.length > 3 ? this.user : ''
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    ...mapMutations(['SET_IS_TEACHER','SET_CRUMB_SEC','SET_NAV_PATH']),
    toLogin() {
      if(this.isTeacher === '') {
        this.$router.push('/login')
      } else {
        this.showInfo = !this.showInfo
      }
    },
	getCurCrumb(name,path){
		this.SET_CRUMB_SEC(name)
		this.SET_NAV_PATH(path)
	},
    //获取用户名
    getUser() {
      if(this.isTeacher !== '') {
        let storage = localStorage.getItem('userList')
        let list = JSON.parse(storage)
        this.user = list[0].value
      }
    },
    switchPage(id) {
      switch (id) {
        case 'upload':
          return this.$router.push("/uploadData")
          break;
        case 'profile':
          return this.$router.push("/personalHome")
          break;
        case 'logout':
          return this.loginOut()
          break;
        default:
          break;
      }
    },
    //退出登录
    loginOut() {
      this.$http.get(this.$api.login.loginOut).then( res => {
        let { code, msg } = res
        if( code == 1) {
          this.$message.success('退出登录')
          this.showInfo = false
          this.SET_IS_TEACHER('')
          this.user = "登录"
        } else {
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style.scss';
  .fs18{
    font-size: 18px;
  }
  .fs7{
    font-size: 7px;
  }


</style>
