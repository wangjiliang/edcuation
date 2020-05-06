<template>
  <div class="loginBox">
    <div class="content">
			<div class="login rt">
				<p class="Welcome">Welcome !</p>
				<p class="title">欢迎来到教育资源公共服务平台</p>
				<el-form ref="formLabelAlign" :model="formLabelAlign" :rules="rules" class="loginFrom">
				  <el-form-item prop="name">
						 <el-autocomplete
								class="inline-input"
								v-model="formLabelAlign.name"
								:fetch-suggestions="querySearch"
								placeholder="请输入账号"
								@select="handleSelect"
							></el-autocomplete>
				  </el-form-item>
				  <el-form-item prop="pasd">
				    <el-input
							v-model="formLabelAlign.pasd"
							type="password"
							placeholder="请输入密码"
							show-password
							@keyup.enter.native="submitForm('formLabelAlign')"
							></el-input>
				  </el-form-item>
				</el-form>
				<div class="lofinSelect">
					<el-checkbox v-model="checked">是否记住用户名?</el-checkbox>
				</div>
				<div class="clear"></div>
				<div class="loginbtn textCenter cursor" @click="submitForm('formLabelAlign')">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
	data() {
		return {
			restaurants: [],
			userList: [],
			checked: true,
			formLabelAlign: {
				name: '',
				pasd: ''
			},
			lists:[
				{name:"11"},
				{name:"22"},
				{name:"33"}
			],
			rules:{
				name:[
					{ required: true, message: '账号不能为空'}
				],
				pasd:[
					{ required: true, message: '密码不能为空'},
				]
			}
		}
	},
	mounted() {
		this.restaurants = this.loadAll();
		// 默认显示账号
		if(this.restaurants != ''){
			let item = this.restaurants[0];
			this.formLabelAlign.name = item.value
		}else{
			this.formLabelAlign.name='';
		}
	},
	computed: {
	  ...mapState(['headUrl'])
	},
	methods:{
		...mapMutations({
			setuserid: 'SET_USER_ID',
			login: 'SET_IS_TEACHER', // 映射 this.add() 到 this.$store.commit('increment')
			headsrc: 'SET_HEAD_URL',
		}),
		submitForm(formLabelAlign){
			this.$refs[formLabelAlign].validate((valid) => {
			  if(valid){
					var params={
						name: this.formLabelAlign.name,
					  password: this.formLabelAlign.pasd
					}
					this.$http.get(this.$api.login.loginUrl,params)
					.then((res) => {
						if(res.code == 1){
							this.setuserid(res.data.id)
							this.login(res.data.isTeacher)
							let storage = localStorage.getItem('userList')
							let userList = JSON.parse(storage)
							if (this.checked == true) {
								if(userList) {
									let flag = userList.find( item => {
										return item.value == this.formLabelAlign.name
									})
									if(!flag) {
										userList.unshift({value:this.formLabelAlign.name})
										let users = JSON.stringify(userList)
										localStorage.setItem('userList',users)
									}else{
										let index = userList.findIndex( item => {
											return item.value == this.formLabelAlign.name
										})
										if(index >-1) {
											userList.splice(index,1)
											userList.unshift({value:this.formLabelAlign.name})
											let users = JSON.stringify(userList)
											localStorage.setItem('userList',users)
										}
									}
								}else {
									let list = []
									list.unshift({value:this.formLabelAlign.name})
									let str = JSON.stringify(list)
									localStorage.setItem('userList',str)
								}
							} else {
								if(userList) {
									let index = userList.findIndex( item => {
										return item.value == this.formLabelAlign.name
									})
									if(index >-1) {
										userList.splice(index,1)
										let users = JSON.stringify(userList)
										localStorage.setItem('userList',users)
									}
								}
							}
							this.headsrc(res.data.headUrl)
							this.$router.push(this.$store.state.frompath);
						}else{
							this.$message.error(res.msg);
						}
					})


				}
			});
		},
		querySearch(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createFilter(queryString) {
			return (restaurant) => {
				return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		loadAll() {
			let storage = localStorage.getItem('userList')
			let users = JSON.parse(storage)
			if(users) {
				return users
			}else{
				return []
			}
		},
		handleSelect(item) {
			// console.log(item);
		}
	}
}
</script>

<style scoped>
.loginBox{
	width: 100%;
	height: 100%;
	background: url(../../assets/images/login/login_bg.png) no-repeat;
	background-size: cover;
}
.content{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1004px;
	height: 618px;
	background: url(../../assets/images/login/login.png) no-repeat;
	background-size: cover;
}
.login{
	width: 283px;
	margin-right: 72px;
	margin-top: 115px;
	text-align: left;
	position: relative;
}
.Welcome{
	font-size:43px;
}
.title{
	font-size:14px;
	margin: 24px 0px;
}
.loginbtn{
	width:145px;
	height:43px;
	line-height: 43px;
	background:rgba(110,174,212,1);
	border-radius:21px;
	font-size: 16px;
	color: #fff;
	margin-top: 47px;
}
.loginbtn:hover{
	box-shadow:0px 0px 13px 0px rgba(11,111,171,0.59);
}
.checkpasd{
	margin-top: 2px;
	margin-right: 2px;
}
.remember{
	font-size: 12px !important;
	color:  #666666;
}
.lofinSelect{
	height: 16px;
	line-height: 16px;
}
.el-checkbox__label{
	font-size: 12px !important;
}
</style>
