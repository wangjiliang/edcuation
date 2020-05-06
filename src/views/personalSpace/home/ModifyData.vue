<template>
	<div>
		<el-dialog title="修改资料" :visible.sync="visible" @close="getData(),$emit('update:show', false)" :show="show" class="ModifyDataBox">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
				<el-row>
				  <el-col :span="12">
						<el-form-item label="学段" prop="period">
							<el-select v-model="ruleForm.period" placeholder="请选择学段" value-key="id" @change="getVal()">
								<el-option :value="period" v-for="period in periods" :key="period.id" :label="period.name"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label="学科" prop="subject">
							<el-select v-model="ruleForm.subject" placeholder="请选择学科" value-key="id">
								<el-option :value="subject" v-for="subject in subjects" :key="subject.id" :label="subject.name"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="昵称" prop="Nickname">
							<el-input placeholder="请输入昵称" :value="ruleForm.Nickname" v-model="ruleForm.Nickname" style="width: 217px;"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
								<el-radio v-model="ruleForm.sex" label="男"></el-radio>
								<el-radio v-model="ruleForm.sex" label="女"></el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<div class="imgbox">
							<img :src="baseUrl+imgUrl"/>
							<p class="textCenter">{{name}}</p>
						</div>
					</el-col>
				</el-row>
				<el-form-item label="简介">
					<el-input type="textarea" placeholder="请填写简介" v-model="ruleForm.Info" class="textarea" style="width: 600px;resize: both;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class="cursor">提交</el-button>
					<el-button @click="resetForm('ruleForm')" class="cursor">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			visible: this.show,
			name: '',
			periods:[],
			subjects:[],
			imgUrl: '',
			ruleForm: {
				period: '',
				subject: '',
				Nickname: '',
				sex: '男',
				Info: ''
			},
			rules: {
				period: [
					{ required: true, message: '请选择学段', trigger: 'change' }
				],
				subject: [
					{ required: true, message: '请选择学科', trigger: 'change' }
				],
				Nickname: [
					{ required: true, message: '请输入昵称', trigger: 'blur' },
					{ min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
				],
				sex: [
					{ required: true, message: '请选择性别', trigger: 'change' }
				]
			}
		};
	},
	computed:{
		...mapState(['userid'])
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData(){
			var params={
				id: this.userid,
			}
			this.$http.get(this.$api.perSpace.modify,params).then(res=>{
				// console.log(res)
				var userInfo = res.data;
				var _this=this;
				this.periods = userInfo.periods;
				this.periods.forEach(function(val,i){
					if(val.default===true){
						_this.ruleForm.period=val;
					};
				});
				this.subjects = userInfo.subjects;
				this.subjects.forEach(function(val,i){
					if(val.isDefault===true){
						_this.ruleForm.subject=val;
					};
				});
				// console.log(this.ruleForm.period.id)
				this.name = userInfo.name;
				this.ruleForm.Nickname = userInfo.nickname;
				this.ruleForm.sex = userInfo.sex;
				this.imgUrl = userInfo.headUrl;
				this.ruleForm.Info = userInfo.intro;
			})
		},
		submitForm(ruleForm) {
			this.$refs[ruleForm].validate(valid => {
				if (valid) {
					var params={
						id: this.userid,
						nickname:this.ruleForm.Nickname,
						sex:this.ruleForm.sex,
						intro:this.ruleForm.Info,
						subjectId:this.ruleForm.subject.id,
						periodId:this.ruleForm.period.id
					}
					this.$http.put(this.$api.perSpace.updata,params).then(res=>{
						// console.log(res)
						this.visible = false;
						this.$message.success('资料修改成功');
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getVal(){
			var params={
				periodId: this.ruleForm.period.id,
			}
			this.$http.get(this.$api.lesson.subject,params).then(res=>{
				// console.log(res)
				this.ruleForm.subject = '';
				this.subjects = res.data;
			})
		},
		resetForm(ruleForm) {
			this.$refs[ruleForm].resetFields();
		}
	},
	watch: {
		show() {
			this.visible = this.show;
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
};
</script>

<style scoped>
	.imgbox img{
		display: block;
		width: 120px;
		height: 120px;
		margin: 30px auto;
		border-radius: 50%;
	}
</style>
