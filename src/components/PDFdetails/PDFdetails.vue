<template>
	<!-- PDF详情 -->
	<div id="pdfBox">
		<div class="pdfNav">
			<breadcrumbNav></breadcrumbNav>
		</div>
		<div class="clear"></div>
		<div class="lf pdfLfBox">
			<!-- 标题 -->
			<div class="pdfTitle w100 textCenter">
				<p class="ellipsis">
					<img src="../../assets/images/subjectList/ppt.png" />
					<span>{{curRowData.title}}</span>
				</p>
			</div>
			<!-- pdf内容 -->
			<div class="pdfDetails w100">
				<PDF />
			</div>
		</div>
		<div class="rt pdfRtBox">
			<!-- 下载/收藏 -->
			<div class="rtTopbox w100">
				<div class="lf textCenter download cursor" @click="download"><img src="../../assets/images/download.png" />下载课件</div>
				<div class="rt textCenter follow cursor" @click="follow()">
					<img src="../../assets/images/follow.png" v-if="iscollect"/>
					<img src="../../assets/images/follow_s.png" v-if="!iscollect"/>
					收藏
				</div>
			</div>
			<!-- 用户信息 -->
			<div class="userInfo w100">
				<div class="userInfo_title">
					<p class="textCenter">当前资源信息</p>
				</div>
				<!-- 头像 -->
				<div class="user_portrait">
					<img :src="baseUrl+curRowData.userHeadUrl"/>
				</div>
				<!-- 昵称 -->
				<p class="user_name textCenter">{{curRowData.userName}}</p>
				<!-- info -->
				<div class="InfoBox">
					<p>科目：{{curRowData.subjectName}}</p>
					<p>格式：{{curRowData.format}}</p>
					<p>大小：{{curRowData.size}}</p>
					<p>上传时间：{{basedata.timeShift(Number(curRowData.createTime))}}</p>
				</div>
			</div>
			<!-- 评论 -->
			<div class="commentBox borderbox">
				<p class="user_comment">用户评论</p>
				<div class="comment_Info textCenter borderbox" v-if="isTeacher==''">
					<p>您需要登录后方可评论</p>
					<p>请<span class="cursor" @click="gologin()">登录</span></p>
				</div>
				<div class="toComment" v-if="isTeacher!==''">
					<div class="commentCont">
						<div class="comment">
							<textarea class="textarea borderbox" placeholder="请输入你想说的话..." v-model="content"></textarea>
						</div>
						<div class="comBtn cursor" @click="getAddData()">发表评论</div>
					</div>
				</div>
				<ul class="comment_list">
					<li v-for="list in lists" :key="list.id">
						<div class="comment_listUser">
							<img :src="baseUrl+list.user.headUrl" class="lf" />
							<p class="lf">{{list.user.nickname}}</p>
						</div>
						<el-tooltip :content="list.content" placement="bottom" popper-class="size" effect="light">
						  <p class="comment_listInfo">{{list.content}}</p>
						</el-tooltip>
						<!-- <p class="comment_listInfo">{{list.comment}}</p> -->
						<div class="comment_Reply">
							<div class="rt cursor">{{basedata.timeShift(Number(list.createTime))}}</div>
						</div>
						<div class="comment_Reply" v-show="false">
							<span class="lf cursor"><img src="../../assets/images/lesson/praise.png" />赞<span>{{list.num}}</span></span>
							<span class="rt cursor"><img src="../../assets/images/lesson/reply.png" />回复</span>
						</div>
					</li>
				</ul>
				<page :total="total" :pageSize="pageSize" :curPage="curPage" v-on:getCurrentPage="getCurrentPage"></page>
			</div>

		</div>

	</div>
</template>

<script>
	import PDF from './pdf'
	import { mapState } from 'vuex'
	import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue'
	import page from 'components/page/detailPage.vue'
	export default {
		components: {
			PDF,
			breadcrumbNav,
			page
		},
		computed: {
		  ...mapState(['isTeacher','userid'])
		},
		data() {
			return {
				src: {
					url: require('../../assets/images/follow.png')
				},
				curRowData:{},
				iscollect:true,
				total: 0,
				curPage: 1,
				pageSize: 10,
				lists: [],
				content: ''
			};
		},
		mounted() {
			this.getDetailData();
			// 评论
			this.getData();
		},
		methods: {
			// 获取当前页数
			getCurrentPage(curPage) {
				this.curPage = curPage;
				this.getData();
			},
			// 获取评论列表
			getData(){
				// debugger
				let params={
					resId:this.$route.query.curId,
					pageNum:this.curPage,
					pageSize: this.pageSize
				}
				this.$http.get(this.$api.resInfoReview.list,params)
				.then((res) => {
					this.lists = res.data.list,
					this.total = res.data.total
				})
			},
			// 添加评论
			getAddData(){
				if(this.content!=''){
					this.$confirm('是否发布评论消息?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let formdata = new FormData()
						formdata.append('content', this.content);
						formdata.append('resId',this.$route.query.curId);
						formdata.append('userId',this.userid);
						this.$http.post(this.$api.resInfoReview.add,formdata)
						.then((res) => {
							this.content = '';
							this.$message({
								type: 'success',
								message: '发布成功!'
							});
							this.getData();
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消发布'
						});
					});
				}else{
					this.$message.error('请填写评论信息!');
				}
			},
			// 下载pdf
			download() {
				this.$message.warning("该功能暂未开放，敬请期待...");
			},
			gologin(){
				this.$router.push("/login");
			},
			getDetailData(){
				this.$http.get("/resInfo/get",{id:this.$route.query.curId}).then(res=>{
					this.curRowData=res.data
					if(res.data.isColect==0){
						this.iscollect=true
					}else{
						this.iscollect=false
					}
				})
			},
			// 收藏
			follow(src) {
				let formdata = new FormData()
				var id = this.$route.query.curId
				if (this.iscollect == true) {
					// 添加收藏
					formdata.append('resId', id);
					this.basedata.addCollect(formdata).then(res => {
						if (res.code == 0) {
							this.$router.push({
								name: "login",
							});
						} else if (res.code == 1) {
							this.iscollect = false
						}
					})
				} else {
					// 取消收藏
					this.basedata.cancelCollect({resId:id}).then(res => {
						if (res.code == 0) {
							this.$router.push({
								name: "login",
							});
						} else if (res.code == 1) {
							this.iscollect = true
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	#pdfBox {
		width: 1200px;
		margin: 0 auto;
	}
	.w100 {
		width: 100%;
	}
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.pdfNav {
		margin: 15px 0px;
	}
	.pdfLfBox {
		width: 900px;
	}
	.pdfTitle,
	.pdfDetails,
	.commentBox {
		background: #fff;
		border-radius: 5px;
	}
	.pdfTitle {
		height: 103px;
		line-height: 103px;
	}
	.pdfTitle img {
		width: 16px;
		height: 16px;
		margin-right: 10px;
	}
	.pdfTitle p {
		color: #191919;
		font-size: 24px;
	}
	.pdfDetails {
		height: auto;
		margin: 20px 0px;
	}
	.pdfRtBox {
		width: 290px;
	}
	.rtTopbox {
		color: #fff;
		font-size: 18px;
		height: 67px;
		line-height: 67px;
	}
	.rtTopbox img {
		width: 20px;
		height: 20px;
	}
	.rtTopbox div:last-child img {
		margin-right: 5px;
	}
	.download {
		width: 150px;
		background: rgba(63, 189, 212, 1);
		border-radius: 5px;
	}
	.follow {
		width: 131px;
		background: rgba(247, 147, 147, 1);
		border-radius: 5px;
		-moz-user-select: none;
		/*火狐*/
		-webkit-user-select: none;
		/*webkit浏览器*/
		-ms-user-select: none;
		/*IE10*/
		-khtml-user-select: none;
		/*早期浏览器*/
		user-select: none;
	}
	.userInfo {
		height: 353px;
		margin-top: 10px;
		background: #fff;
		box-shadow: 0px 0px 13px 0px rgba(169, 169, 169, 0.13);
	}
	.userInfo_title {
		height: 45px;
		line-height: 45px;
		background: rgba(63, 189, 212, 1);
		border-radius: 5px 5px 0px 0px;
	}
	.userInfo_title p {
		color: #fff;
		font-size: 16px;
	}
	.user_portrait img {
		display: block;
		width: 83px;
		height: 83px;
		border-radius: 50%;
		margin: 20px auto;
		-moz-box-shadow:0px 4px 5px #eee;
		-webkit-box-shadow:0px 4px 5px #eee;
		box-shadow:0px 4px 5px #eee;
	}
	.user_name,
	.InfoBox p {
		font-size: 14px;
		color: #191919;
	}
	.InfoBox {
		width: 148px;
		margin: 30px auto;
	}
	.InfoBox p {
		margin-top: 10px;
	}
	.toComment {
		width: 273px;
		height: 210px;
		border: 1px solid rgba(238, 238, 238, 1);
		box-sizing: border-box;
		margin: 15px 0px;

	}
	.comment {
		width: 271px;
		height: 167px;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
		background: rgba(248, 248, 248, 1);
		box-sizing: border-box;
		margin-bottom: 8px;
	}
	.comment .textarea {
		width: 271px;
		height: 167px;
		outline: none;
		resize: none;
		border: none;
		font-size: 14px;
		padding: 5px;
		background: rgba(248, 248, 248, 1) !important;
	}
	.comBtn {
		width: 100px;
		height: 25px;
		background: rgba(63, 189, 212, 1);
		border-radius: 17px;
		text-align: center;
		line-height: 25px;
		font-size: 12px;
		color: #fff;
		float: right;
		margin-right: 16px;
	}
	.commentBox {
		background: #fff;
		padding: 10px 8px;
		margin: 10px 0px;
		box-shadow: 0px 0px 13px 0px rgba(169, 169, 169, 0.13);
	}
	.user_comment {
		font-size: 16px;
		color: #191919;
	}
	.comment_Info {
		width: 253px;
		height: 126px;
		font-size: 12px;
		color: #7D7D7D;
		background: rgba(248, 248, 248, 1);
		border: 1px solid rgba(238, 238, 238, 1);
		border-radius: 5px;
		margin: 16px auto;
		padding: 46px 56px;
	}
	.comment_Info span {
		color: #F17779;
		margin: 0 10px;
	}
	.comment_list li {
		height: auto;
		overflow: hidden;
		border-bottom: 1px solid #DCDCDC;
	}
	.comment_list li:last-child {
		border-bottom: none !important;
	}
	.comment_listUser {
		height: 40px;
		line-height: 40px;
		margin-top: 5px;
	}
	.comment_listUser img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: pink;
	}
	.comment_listUser p {
		font-size: 14px;
		color: #3FBDD4;
		margin-left: 5px;
	}
	.comment_listInfo {
		margin-left: 45px;
		font-size: 16px;
		color: #191919;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.comment_Reply {
		height: 14px;
		line-height: 14px;
		overflow: hidden;
		margin: 8px 0px;
		font-size: 14px;
		color: #7D7D7D;
	}
	.comment_Reply img {
		width: 14px;
		height: 14px;
		margin-right: 3px;
	}
</style>
