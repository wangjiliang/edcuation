<template>
  <!-- head -->
  <div id="xqheadbox">
    <div class="content">
      <div class="top">
        <!-- logo -->
        <div class="logoname cursor lf" @click="goHome" title="点此返回首页">
          <!-- <img src="" class="logo lf"/>
          <div class="logo-text lf">
            <p class="f23">教育资源公共服务平台</p>
            <p class="f10">Education resource public service platform</p>
          </div> -->
					<img class="logoImg" src="../../assets/images/logo.png"/>
        </div>
        <!-- 搜索 -->
        <div class="searchbox borderbox lf">
          <input class="search borderbox" type="text" placeholder="请输入关键字"/>
          <button class="searchbtn btn rt">搜索</button>
        </div>
        <!-- 头像 -->
				<div class="headbox rt">
					<img :src="baseUrl+headUrl" class="headimg cursor lf" @click="goPersonalSpace" v-if="isTeacher!=''?true:false"/>
					<img src="../../assets/images/HeadLogo.png" class="headimg cursor lf" @click="goPersonalSpace" v-if="isTeacher==''?true:false"/>
					<p class="f23 lf textCenter cursor" v-if="isTeacher==1" @click="upload">上传</p>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return{

    }
  },
	computed: {
	  ...mapState(['period','periodId','isTeacher','headUrl'])
	},
  methods: {
    goHome() {
      this.$router.push('/home')
    },
		goPersonalSpace() {
		  if( this.isTeacher === ''){
				this.$router.push('/login');
			}else{
				this.$router.push('/personalHome');
			}
		},
		upload(){
			this.$router.push("/uploadData")
		}
  }
}
</script>

<style scoped>
  #xqheadbox,
  .content,
  .top{
    overflow: hidden;
  }
  #xqheadbox{
    width: 100%;
    min-width: 1200px;
    height: 197px;
    background: #3FBDD4;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
  }
  .logoname,
  .searchbox,
  .headbox{
    margin-top: 74px;
  }
  /* .logo, */
  .headimg{
    width:50px;
    height:50px;
    border-radius:50%;
  }
  /* .logo-text{
    color: #fff;
    margin-left: 12px;
  } */
	.logoImg{
		width: 262px;
		height: 46px;
	}
  .f23{
    font-size: 23px;
  }
  .f10{
    font-size: 10px;
  }
  .searchbox{
    margin-left: 85px;
    width: 584px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-radius: 10px;
  }
  .search{
    width: 469px;
    border-radius:10px 0px 0px 10px;
    padding: 0 23px;
    font-size: 14px;
    color: #999;
  }
  .searchbtn{
    width:115px;
    height:50px;
    background:#F79393;
    border-radius:0px 10px 10px 0px;
    font-size:18px;
    color: #fff;
  }
  .headbox{
    color: #fff;
    line-height: 50px;
  }
  .headimg{
    margin-right: 16px;
  }
</style>
