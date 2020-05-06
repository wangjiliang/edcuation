<template>
	<!-- 个人空间首页(学生版) -->
	<div class="grpad homepagebox borderbox">
		<div class="homepage">
			<div class="lf homeLfBox">
				<div class="homeHead borderbox">
					<img class="cursor" :src="baseUrl+headUrl" @click="Upload()"/>
					<div class="Uploadbtn cursor"  @click="Upload()">修改头像</div>
					<p class="Font24 textCenter ellipsis" :title="name">{{name}}</p>
				</div>
				<ul class="homeNav">
					<li v-for="(list,index) in lists" :key="list.name" class="Font18 textCenter cursor"
           :class="{on : currentIndex === index}" @click="handleClick(list.name,index)">
           {{list.name}}
          </li>
				</ul>
			</div>
			<div class="rt homeRtBox">
				<personalSwiper/>
			</div>
		</div>
		<!-- 修改密码弹窗 -->
		<PasswordDialog :show.sync="show"></PasswordDialog>
		<!-- 上传头像弹窗 -->
		<UploadHead :show.sync="open"></UploadHead>
		<!-- 修改资料弹窗 -->
		<ModifyData :show.sync="modeify"></ModifyData>
	</div>
</template>

<script>
import personalSwiper from './personalSwiper.vue'
import PasswordDialog from './PasswordDialog.vue'
import UploadHead from './UploadHead.vue'
import ModifyData from './ModifyData.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components:{
    personalSwiper,
    PasswordDialog,
		UploadHead,
		ModifyData
  },
  data() {
    return{
			name: '',
      show: false,
			open:false,
			modeify:false,
      currentIndex: 0,
      lists: [
        {name: '修改密码'},
				{name: '修改资料'},
        {name: '退出登录'}
      ],
      slides: null
    }
  },
  computed: {
    ...mapState(['isTeacher','headUrl']),
  },
	mounted() {
		let storage = JSON.parse(localStorage.getItem('userList'));
		this.name = storage[0].value;
	},
  methods:{
    ...mapMutations(['SET_IS_TEACHER','SET_HEAD_URL']),
    handleClick(name, index) {
      this.currentIndex = index
      if(name == "修改密码") {
        this.show = true
      } else if (name == "退出登录") {
        this.$http.get(this.$api.login.loginOut).then( res => {
          let { code, msg } = res
          if(code == 1) {
            this.$message.success('退出登录')
            this.SET_IS_TEACHER('')
            this.$router.push('/home')
          } else {
            this.$message.error(msg)
          }
        })
      } else if(name == "修改资料") {
				this.modeify = true
			}
    },
		Upload(){
			this.open = true
		}
  }
}
</script>

<style scoped>
	.on{
		background: #1282CB;
	}
	.Font24{
		color: #fff;
		font-size: 24px;
		width: 150px;
		margin: 0 auto;
	}
	.ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	}
	.Font18{
		color: #fff;
		font-size: 18px;
	}
	.homepagebox{
		background: #EBF8FB;
	}
	.homepage{
		width: 1200px;
		min-height: calc(100vh - 100px);
		margin: 0 auto;
		overflow: hidden;
		background: #D9F2F7;
	}
	.homeLfBox{
		width: 250px;
		min-height: calc(100vh - 100px);
		background: url(../../../assets/images/PersonalSpace/bg.png) no-repeat;
	}
	.homeHead{
		width: 100%;
		height: 250px;
		border-bottom: 1px dashed #fff;
	}
	.homeHead img{
		display: block;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		margin: 25px auto;
		/* background: pink; */
	}
	.Uploadbtn{
		width: 80px;
		height: 30px;
		line-height: 30px;
		color: #fff;
		font-size: 12px;
		text-align: center;
		margin: 10px auto;
		background: #1282CB;
		border-radius: 10px;
	}
	.homeNav li{
		width: 100%;
		height: 86px;
		line-height: 86px;
	}
	.homeNav li:hover{
		background: rgba(18,130,203,0.5);
	}
	.homeRtBox{
		width: 950px;
	}
</style>
