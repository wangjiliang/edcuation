<template>
	<!-- 个人中心头部 -->
	<div id="grheaderbox">
		<div class="content">
		  <div class="top">
		    <!-- logo -->
		    <div class="logoname cursor lf" @click="goHome" title="点此返回首页">
		      <!-- <img src="" class="logo lf"/>
		      <div class="logo-text borderbox lf">
		        <p class="f16">教育资源公共服务平台</p>
		        <p class="f10">Education resource public service platform</p>
		      </div> -->
					<img class="logoImg" src="../../assets/images/logo.png"/>
		    </div>
				<p class="Font28 lf">个人空间</p>
				<!-- 上传 -->
				<div class="uploadbox cursor rt" v-show="Upload" @click="goUpload">
					<img src="../../assets/images/upload.png" class="uploadIcon lf"/>
					<span class="Font18 lf">上传文件</span>
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
			Upload:false
    }
  },
	mounted() {
	  this.showUpload();
	},
	computed: {
		...mapState(['isTeacher'])
	},
  methods: {
    goHome() {
      this.$router.push('/home')
    },
		goUpload() {
			this.$router.push('/uploadData')
		},
		// 是否显示上传
		showUpload() {
			if(this.isTeacher == 1){
				this.Upload = true
			}else{
				this.Upload = false
			}
		}
  }
}
</script>

<style scoped>
	#grheaderbox{
		width: 100%;
		min-width: 1200px;
		height: 100px;
		background: #3FBDD4;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
	}
	.content{
	  width: 1200px;
	  margin: 0 auto;
	}
	.logoname,
	.Font28{
	  margin-top: 31.5px;
	}
	/* .logo, */
	.headimg{
	  width:37px;
	  height:37px;
	  background:#235ED5;
	  border-radius:50%;
	}
	/* .logo-text{
	  color: #fff;
	  padding: 0px 12px;
		border-right: 2px solid #fff;
	} */
	.logoImg{
		width: 262px;
		height: 46px;
	}
	.f16{
	  font-size: 16px;
	}
	.f10{
	  font-size: 10px;
	}
	.Font28{
		width:112px;
		height:55px;
		line-height: 55px;
		font-size: 28px;
		color: #fff;
		margin-left: 12px;
	}
	.uploadbox{
		height: 21px;
		line-height: 21px;
		margin-top: 39.5px;
	}
	.Font18{
		font-size: 18px;
		color: #fff;
		margin-left: 8px;
	}
	.uploadIcon{
		width: 21px;
		height: 21px;
	}
</style>
