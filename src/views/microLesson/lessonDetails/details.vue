<template>
	<div id="details">
		<div class="video_wrap">
			<div class="video">
				<div class="vTxt">
					<breadcrumbNav :fontColor="fontColor"></breadcrumbNav>
				</div>
				<div class="vCont">
					<!-- <video id="my-video" class="video-js vjs-default-skin" controls preload="auto" poster="../assets/video.png"> -->
					<video id="my-video" width="1024" height="576" class="video-js vjs-default-skin" controls preload="auto">
					    <!-- <source src="/api/videoPr/ab8b464239874825b1a841d9f9f85f30/ab8b464239874825b1a841d9f9f85f30.m3u8" type="application/x-mpegURL"> -->
							<source :src="vSrc" type="application/x-mpegURL">
					</video>
				</div>
				<div>
					<div class="vName lf">
						{{titleName}}
						<div class="toDown" v-show="false">
							<div class="downImg"></div>
							下载
						</div>
					</div>
					<div class="vRelated rt">
					<div class="relate" v-show="false">
						<div class="rImg"><img src="../../../assets/images/lesson/download.png"/></div>
						<div class="rNum">29</div>
					</div>
					<div class="relate" v-show="false">
						<div class="rImg cursor" @click="praise()">
							<img src="../../../assets/images/lesson/praise.png" v-if="ispraise"/>
							<img src="../../../assets/images/lesson/praise_on.png" v-if="!ispraise"/>
						</div>
						<div class="rNum">20</div>
					</div>
					<div class="relate">
						<div class="rImg"><img src="../../../assets/images/lesson/view.png"/></div>
						<div class="rNum">{{readCount}}</div>
					</div>
					<div class="relate">
						<div class="rImg cursor" @click="collect()">
							<img src="../../../assets/images/lesson/collect.png" v-if="iscollect"/>
							<img src="../../../assets/images/lesson/collect_on.png" v-if="!iscollect"/>
						</div>
						<div class="rNum">{{collectCount}}</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="intro_wrap">
			<div class="intro">
				<div class="introLeft">
					<div class="introOne">
						<div class="introTit">设计说明</div>
						<div class="introTxt">{{description}}</div>
					</div>
					<div class="introOne">
						<div class="introTit">学习指导</div>
						<div class="introTxt">{{studyAdvisor}}</div>
					</div>
					<div class="introOne">
						<div class="introTit">练习</div>
						<div class="introTxt">{{exercise}}</div>
					</div>
				</div>
				<div class="introRight">
					<div class="introOne">
						<div class="introTit">用户评论</div>
					</div>
					<div class="toLogin" v-if="isTeacher==''">
						您需要登录后方可评论，请<span class="cursor" @click="gologin()">登录</span>
					</div>
					<div class="toComment" v-if="isTeacher!==''">
						<div class="commentCont">
							<div class="comment">
								<textarea class="textarea borderbox" placeholder="请输入你想说的话..." v-model="content"></textarea>
							</div>
							<div class="comBtn cursor" @click="getAddData()">发表评论</div>
						</div>
					</div>
					<div class="commentList">
						<div class="listOne" v-for="(commentItem,index) in commentList" :key="commentItem.id">
							<div class="userImg">
								<img :src="baseUrl+commentItem.user.headUrl" />
							</div>
							<div class="uesrInfo">
								<div class="name">{{commentItem.user.nickname}}</div>
								<el-tooltip :content="commentItem.content" placement="bottom" popper-class="size" effect="light">
								  <div class="cont">{{commentItem.content}}</div>
								</el-tooltip>
								<!-- <div class="cont">{{commentItem.content}}</div> -->
								<div class="contRelated">
									<div class="cTxt">{{basedata.timeShift(Number(commentItem.createTime))}}</div>
								</div>
								<div class="contRelated" v-show="false">
									<div class="common cursor">
										<div class="cImg">
											<img src="../../../assets/images/lesson/praise.png" />
										</div>
										<div class="cTxt">赞1</div>
									</div>
									<div class="common">
										<div class="cImg">
											<img src="../../../assets/images/lesson/reply.png" />
										</div>
										<div class="cTxt">回复</div>
									</div>
								</div>
							</div>
						</div>
						<page :total="total" :pageSize="pageSize" :curPage="curPage" v-on:getCurrentPage="getCurrentPage"></page>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import videojs from 'video.js'
	import 'videojs-contrib-hls'
	import { mapState } from 'vuex'
	import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue'
	import page from '../../../components/page/detailPage.vue'
	export default {
		components:{
			breadcrumbNav,
			page
		},
		data() {
			return {
				vSrc: '',
				myPlayer: '',
				titleName: '',
				// vSrc: '//vjs.zencdn.net/v/oceans.mp4',
				isLogin: false,
				iscollect:true,
				ispraise:true,
				collectSrc:require('../../../assets/images/lesson/collect.png'),
				description: '',
				studyAdvisor: '',
				exercise: '',
				collectCount: '',
				readCount: '',
				commentList: [],
				content: '',
				fontColor:true,
				total: 0,
				curPage: 1,
				pageSize: 10
			}
		},
		computed: {
		  ...mapState(['isTeacher','userid'])
		},
		methods:{
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
					this.commentList = res.data.list,
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
			// 点赞
			praise(){
				if(this.isTeacher == ''){
					return
				}else{
					this.ispraise = !this.ispraise
				}
			},
			// 收藏
			collect(){
				if(this.isTeacher == ''){
					return
				}else{
					this.iscollect = !this.iscollect
				}
			},
			gologin(){
				this.$router.push("/login");
			},
			getVideo(){
				this.myPlayer = videojs('my-video', {
				    bigPlayButton: true,
				    textTrackDisplay: false,
				    posterImage: true,
				    errorDisplay: false,
				    controlBar: true
				}, function () {
				    this.play()
				})
			},
			getInfo(){
				this.description=this.$route.query.description;
				this.studyAdvisor=this.$route.query.studyAdvisor;
				this.exercise=this.$route.query.exercise;
				this.collectCount=this.$route.query.collectCount;
				this.readCount=this.$route.query.readCount;
				if(this.description==''){
					this.description="暂无设计说明内容..."
				}
				if(this.studyAdvisor==''){
					this.studyAdvisor="暂无学习指导内容..."
				}
				if(this.exercise==''){
					this.exercise="暂无练习内容..."
				}
			}
		},
		mounted() {
			//设计说明/学习指导/练习
			this.getInfo();
			// 评论
			this.getData();
			// 视频
			this.getVideo();
			this.vSrc = this.baseUrl + this.$route.query.src;
			this.titleName = this.$route.query.title
			this.myPlayer.src(this.vSrc);
		},
		beforeDestroy () {
			//销毁视频
			this.myPlayer.dispose();
		},
	}
</script>

<style scoped="scoped">
	#details,
	.intro_wrap {
		width: 100%;
	}

	.video_wrap {
		width: 100%;
		height: 710px;
		background: rgba(48, 48, 48, 1);
	}

	.video {
		width: 1200px;
		margin: 0 auto;
	}

	.vTxt {
		padding: 24px 0 25px 0;
		box-sizing: border-box;
		font-size: 12px;
		line-height: 12px;
		color: #fff;
	}

	.vCont {
		width: 1024px;
		height: 576px;
		margin: 0 auto;
		margin-bottom: 24px;

	}

	.vCont video {
		width: 100%;
		height: 100%;
	}

	.vName {
		font-size: 24px;
		line-height: 24px;
		margin-bottom: 23px;
		color: #fff;
		position: relative;
	}

	.toDown {
		position: absolute;
		top: 10px;
		right: 68px;
		width: 151px;
		height: 44px;
		background: rgba(63, 189, 212, 1);
		border-radius: 22px;
		font-size: 18px;
		line-height: 44px;
		text-align: right;
		padding-right: 45px;
		box-sizing: border-box;
	}

	.downImg {
		position: absolute;
		top: 13px;
		left: 46px;
		width: 18px;
		height: 19px;
		background: url(../../../assets/images/lesson/download1.png) no-repeat;
	}

	.vRelated {
		font-size: 24px;
		height: 24px;
		line-height: 24px;
		margin-bottom: 23px;
		color: #fff;
	}

	.relate {
		width: auto;
		float: left;
		margin-right: 15px;
	}

	.rImg {
		width: 16px;
		height: 16px;
		float: left;
		margin:-3px 9px 0 0;
	}
	.rImg img{
		width: 16px;
		height: 16px;
		margin-top: -5px;
	}
	.rNum {
		font-size: 18px;
		color: #fff;
		float: left;
		line-height: 18px;
	}

	.intro_wrap {
		background: #fff;
	}

	.intro {
		width: 1200px;
		height: auto;
		margin: 0 auto;
		padding: 24px 0 16px 0;
		display: flex;
		background: #fff;
	}

	.introLeft {
		width: 55%;
		margin-right: 34px;
	}

	.introRight {
		width: 44%;
	}

	.introTit {
		height: 18px;
		border-left: 3px solid #3FBDD4;
		font-size: 18px;
		line-height: 18px;
		color: #191919;
		padding-left: 16px;
		box-sizing: border-box;
		margin-bottom: 23px;
	}

	.introTxt {
		border: 1px solid #BFBFBF;
		padding: 14px 23px 17px 16px;
		color: #7D7D7D;
		font-size: 12px;
		line-height: 20px;
		box-sizing: border-box;
		margin-bottom: 24px;
	}

	.toLogin {
		width: 501px;
		height: 235px;
		background: rgba(248, 248, 248, 1);
		border: 1px solid rgba(191, 191, 191, 1);
		font-size: 16px;
		color: #7D7D7D;
		text-align: center;
		line-height: 235px;
		box-sizing: border-box;
		margin-bottom: 24px;
	}

	.toLogin span {
		color: #F17779;
	}

	.toComment {
		width: 503px;
		height: 235px;
		border: 1px solid rgba(238, 238, 238, 1);
		box-sizing: border-box;
		margin-bottom: 24px;
	}

	.comment {
		width: 501px;
		height: 167px;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
		background: rgba(248, 248, 248, 1);
		box-sizing: border-box;
		margin-bottom: 17px;
	}

	.comment .textarea {
		width: 501px;
		height: 167px;
		outline: none;
		resize: none;
		border: none;
		font-size: 14px;
		padding: 5px;
		background: rgba(248, 248, 248, 1) !important;
	}

	.comBtn {
		width: 116px;
		height: 34px;
		background: rgba(63, 189, 212, 1);
		border-radius: 17px;
		text-align: center;
		line-height: 34px;
		font-size: 16px;
		color: #fff;
		float: right;
		margin-right: 16px;
	}

	.listOne {
		width: 96%;
		height: auto;
		display: flex;
		border-bottom: 1px solid #DCDCDC;
		margin-bottom: 16px;
	}

	.userImg {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 15px;
		overflow: hidden;
	}

	.userImg img {
		width: 40px;
		height: 40px;
	}

	.uesrInfo {
		width: 92%;
		padding-top: 13px;
		padding-bottom: 9px;
	}

	.name {
		color: #3FBDD4;
		font-size: 16px;
		line-height: 16px;
		margin-bottom: 18px;
	}

	.cont {
		color: #000;
		font-size: 16px;
		line-height: 1.6;
		margin-bottom: 4px;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	}

	.contRelated {
		width: 100%;
		height: 29px;
		text-align: right;
	}

	.common {
		width: auto;
		height: 100%;
		margin-right: 20px;
		display: flex;
	}

	.cImg {
		width: 14px;
		height: 14px;
		line-height: 10px;
		border-radius: 50%;
		margin-right: 5px;
		margin-top: 8px;
		overflow: hidden;
	}

	.cImg img {
		width: 14px;
		height: 14px;
	}

	.cTxt {
		font-size: 14px;
		color: #7D7D7D;
		line-height: 29px;
		margin-right: 10px;
	}

</style>
