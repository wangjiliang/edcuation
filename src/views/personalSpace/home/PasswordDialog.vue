<template>
	<div>
		<el-dialog title="修改密码" :visible.sync="visible" @close="closeDialog('ruleForm'),$emit('update:show', false)" :show="show" class="DialogBox">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="密码" prop="pass">
					<el-input placeholder="请输入密码" v-model="ruleForm.pass" show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input placeholder="请再次输入密码" v-model="ruleForm.checkPass" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			visible: this.show,
			ruleForm: {
				pass: '',
				checkPass: ''
			},
			rules: {
				pass: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '长度为6到16个字符', trigger: 'blur' },
					{ validator: validatePass, trigger: 'blur' },
				],
				checkPass: [
					{ required: true, message: '请输入确认密码', trigger: 'blur' },
					{ validator: validatePass2, trigger: 'blur' },
				]
			}
		};
	},
	computed:{
		...mapState(['userid'])
	},
	methods: {
		submitForm(ruleForm) {
			this.$refs[ruleForm].validate(valid => {
				if (valid) {
					var params={
						id: this.userid,
					  password: this.ruleForm.checkPass
					}
					this.$http.put(this.$api.forgetPasd.pasd,params)
					.then((res) => {
						this.$message({
							message: '密码修改成功,请重新登录!',
							type: 'success'
						});
						this.visible = false;
						this.$router.push('/login');
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(ruleForm) {
			this.$refs[ruleForm].resetFields();
		},
		// 清空表单内容及验证
		closeDialog(type) {
			if (type) {
				this.$refs[type].resetFields();
			}
		},
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		show() {
			this.visible = this.show;
		}
	}
};
</script>

<style scoped>
</style>
