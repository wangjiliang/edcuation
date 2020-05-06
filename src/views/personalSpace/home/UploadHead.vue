<template>
	<div>
		<el-dialog title="上传头像" :visible.sync="visible" @close="closeDialog(),$emit('update:show', false)" :show="show" class="UploadDialog">
			<el-upload
				class="avatar-uploader"
				action=""
				:auto-upload="false"
				:show-file-list="false"
				:on-change="handleAvatarSuccess">
				<img v-if="imgUrl" :src="imgUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				<div slot="tip" class="el-upload__tip textCenter">只能上传jpg/png文件，且不超过2MB</div>
			</el-upload>
			<el-button class="btnbox" type="primary" @click="submitForm()">保存头像</el-button>
		</el-dialog>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
	data() {
		return {
			visible: this.show,
			imageUrl: '',
			imgUrl:''
		};
	},
	computed:{
		...mapState(['userid','headUrl']),
	},
	methods: {
		...mapMutations({
			headsrc: 'SET_HEAD_URL'
		}),
		submitForm() {
			let formdata=new FormData()
			formdata.append('file',this.imageUrl);
			formdata.append('id',this.userid);
			this.$http.post(this.$api.perSpace.UploadHead,formdata).then(res=>{
				if(this.imgUrl != ''){
					this.imgUrl = ''
					this.$message.success('头像上传成功');
					this.visible = false;
					this.headsrc(res.data.headUrl)
				}else{
					this.$message.error('头像上传失败，请重新上传!');
				}
			})
			.catch((error) =>{
				this.$message.error('头像上传失败，请重新上传!');
			})
		},
		handleAvatarSuccess(file, fileList) {
			const data = file.raw
			const isJPG = data.type === 'image/jpeg';
			const isPNG = data.type === 'image/png';
			const isLt2M = data.size / 1024 / 1024 < 2;
			if (!isJPG && !isPNG) {
				this.$message.error('上传头像图片只能是jpg/png格式!');
			}else if(!isLt2M){
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}else{
				this.imgUrl = URL.createObjectURL(data);
				this.imageUrl = data;
			}
		},
		// 清空头像信息
		closeDialog() {
			this.imgUrl = '';
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
	.btnbox{
		display: block;
		margin: 30px auto;
	}
</style>
