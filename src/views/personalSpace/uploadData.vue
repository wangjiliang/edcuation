<template>
	<!-- 上传资料 -->
	<div class="bg_Ps grpad borderbox">
		<div class="lesson_wrap ps_wrap" style="min-height: calc(100vh - 100px);">
			<div class="leftTree ps_left">
				<ul>
					<li v-for="(item,index) in leftTab" :class="{ps_leftActive:index==leftActive}" @click="clickLeftTab(index,item.name)"><em></em><span>{{item.name}}</span></li>
				</ul>
			</div>
			<!--右边 列表-->
			<div class="lessonList">
				<div class="ud_title">{{tabTitle}}</div>
				<div>
					<div class="ud_box_title mtop20">{{uploadTitle}}</div>
					<div class="form_box">
						<!--用来存放文件信息-->
						<div id="uploader">
							<span slot="label" style="float: left;">&nbsp;&nbsp;&nbsp;</span>
							<div style="position: relative;">
								<div class="shade" v-show="disable"></div>
								<div id="picker">点击添加</div>
							</div>
							<div id="thelist" style="width:700px;"></div>
						</div>
					</div>
				</div>
				<div class="ud_box mtop20">
					<div class="ud_box_title">{{infoTitle}}</div>
					<el-form ref="form" :model="form" class="formInfo" :rules="rules" :hide-required-asterisk='true' label-width="20px" :disabled="disable">
						<div class="form_box">
							<el-form-item prop="name">
								<span slot="label" class="form_label">·</span>
								<el-input id="sourceName" v-model="form.name" placeholder="请输入资料名称"></el-input>
							</el-form-item>
							<!-- 资源分类 -->
							<el-form-item class="selectForm" prop="resCategory" style="margin-left: 0;">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.resCategory" placeholder="请选择资源分类" value-key="id">
									<el-option  v-for="(item,index) in resCategorylist" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
							<!-- 学制 -->
							<el-form-item class="selectForm" prop="period">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.period" placeholder="请选择学制" value-key="id" @change="periodChange">
									<el-option  v-for="(item,index) in periodList" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
							<!-- 学科 -->
							<el-form-item class="selectForm" prop="subject"  style="margin-left: 0;">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.subject" placeholder="请选择学科" value-key="id" @change="subjectChange">
									<el-option  v-for="(item,index) in subjectList" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
							<!-- 出版社 -->
							<el-form-item class="selectForm" prop="press">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.press" placeholder="请选择出版社" value-key="id" @change="editionChange">
									<el-option  v-for="(item,index) in editionList" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
							<!-- 年级 -->
							<el-form-item class="selectForm" prop="grade" style="margin-left: 0;">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.grade" placeholder="请选择年级" value-key="id" @change="gradeChange">
									<el-option  v-for="(item,index) in gradeList" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
							<!-- 章节 -->
							<el-form-item class="selectForm" prop="section">
								<span slot="label" class="form_label">·</span>
								<el-select v-model="form.section" placeholder="请选择章节" value-key="id">
									<el-option  v-for="(item,index) in sectionList" :value="item" :label="item.name" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div v-if="isvideo">
							<div class="ud_box_title mtop20">设计说明</div>
							<div class="form_box">
								<el-form-item prop="desi">
									<span slot="label" class="form_label">·</span>
									<el-input type="textarea" v-model="form.desi" placeholder="请输入设计说明"></el-input>
							    </el-form-item>
							</div>
							<div class="ud_box_title mtop20">学习指导</div>
							<div class="form_box">
								<el-form-item  prop="guide">
									<span slot="label" class="form_label">·</span>
									<el-input type="textarea" v-model="form.guide" placeholder="请输入学习指导"></el-input>
								</el-form-item>
							</div>
							<div class="ud_box_title mtop20">练习</div>
							<div class="form_box">
								<el-form-item prop="exer">
									<span slot="label" class="form_label">·</span>
									<el-input type="textarea" v-model="form.exer" placeholder="请输入练习内容"></el-input>
								</el-form-item>
							</div>
						</div>
					</el-form>
				</div>
				<div class="opreate_btn" :class="{'forbide_btn':disable}">
					<input type="button" class="cursor" value="发布" @click="submit('form')" :disabled="disable"/>
					<input type="button" value="取消" class="cancel cursor" @click="cancle()" :disabled="disable"/>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false" class="ps_dialog" style="text-align: center;">
		  <img src="../../assets/images/PersonalSpace/submit_icon.png" />
		  <p style="margin-top: 15px;">提交成功，正在审核中...</p>
		  <div class="opreate_btn">
		  	<input type="button" value="再来一次" @click="cancle()" style="width: 169px;height: 48px;line-height: 48px;margin: 35px 0 0;"/>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {hex_md5} from '../../assets/js/md5.js'
	import $ from 'jquery'
	import WebUploader from 'webuploader'
	import { mapMutations} from 'vuex'
	export default {
		inject: ['reload'],
		data() {
			return {
				disable:false,
				periodList:[],//学制
				subjectList:[],//学科
				editionList:[],//版本
				gradeList:[],//年级
				sectionList:[],//章节
				resCategorylist:[],//资源分类
				md5File:'',//上传过程中的md5File
				uploader:'',//webuploader初始化
				currentFile:'',
				dom: '',
				formdata: '',
				form: {
					name: '',
					period:'',//学制
					subject:'',//学科
					press:'',//版本
					grade: '',//年级
				 	section:'',//章节
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					textarea: '',
					resCategory:'',
					desi:'',
					guide:'',
					exer:''
				},
				value: [],
				options: [],
				props:{
					label:'name',
					value:'id',
					children:'grades',
					expandTrigger: 'hover'
				},
				rules: {
					name: [{ required: true, message: '请输入资料名称', trigger: 'blur' }],
					period: [{ required: true, message: '请选择学制', trigger: 'change' }],
					subject: [{ required: true, message: '请选择学科', trigger: 'change' }],
					press: [{ required: true, message: '请选择出版社', trigger: 'change' }],
					grade: [{ required: true, message: '请选择学制', trigger: 'change' }],
					section: [{ required: true, message: '请选择章节', trigger: 'change' }],
					file:[{ required: true, message: '请上传视频' }],
					resCategory: [{ required: true, message: '请选择资源分类', trigger: 'change' }],
					desi:[{ required: true, message: '请输入设计说明', trigger: 'blur' }],
					guide:[{ required: true, message: '请输入学习指导', trigger: 'blur' }],
					exer:[{ required: true, message: '请输入练习内容', trigger: 'blur' }],
				},
				dialogVisible:false,
				jumpVisible:false,
				dataList:[],
				leftTab:[{name:'上传文档资料'},{name:'上传视频资料'}],
				leftActive:0,
				tabTitle:'上传文档资料',
				uploadTitle:'上传文档',
				infoTitle:'文档信息',
				isvideo:false
			}
		},
		mounted(){
			if(null == localStorage.getItem("userList")){
				this.$router.push('/home')
				return;
			}
			this.getPeriodData()
			this.getCategoryData()
			this.initWebUploader()
		},
		methods: {
			...mapMutations(['SET_PERSON_ACTIVE']),
			FileSuccess(response, file){
				var testmsg=file[0].raw.name.substring(file[0].raw.name.lastIndexOf('.')+1)
				if(file[0].status=="ready"){
					this.form.file=file[0].raw
					this.rules.file = []
					this.$refs['upload'].clearValidate()
					return;
			    }else{
					this.rules.file =[{ required: true, message: '请上传视频或文档'}]
				}
			},
			clickLeftTab(index,name){
				this.leftActive=index
				this.tabTitle=name
				let type=name.substring(2,4)
				this.uploadTitle=`上传${type}`
				this.infoTitle=`${type}信息`
				if(type=='视频'){
					this.isvideo=true
				}else{
					this.isvideo=false
				}
			},
			// 资源分类
			getCategoryData() {
				this.$http.get(this.$api.lesson.resCategory).then(res=>{
					this.resCategorylist=res.data
				})
			},
			// 获取学段
			getPeriodData() {
				this.basedata.getPeriodData().then(res=>{
					this.periodList=res
				})
			},
			// 获取学科列表
			getSubjectData(){
				var params={periodId:this.form.period.id}
				this.basedata.getSubjectData(params).then(res=>{
					this.subjectList=res;
				})
			},
			// 获取版本列表
			getEditionData(){
				var params={subjectId:this.form.subject.id}
					this.basedata.getEditionData(params).then(res=>{
						this.editionList=res;
					})
			},
			// 获取年级
			getGradeData(){
				var params={gradeIds:this.form.press.gradeIds}
					this.basedata.getGradeData(params).then(res=>{
						this.gradeList=res;
						this.gradeId='';
						this.getSubjectContent();
					})

			},
			// 获取学科目录
			getSubjectContent(){
				var params={
					subjectId:this.form.subject.id,
					editionId:this.form.press.id,
					gradeId:this.form.grade.id
				}
				this.basedata.getSubjectContent(params).then(res=>{
					this.sectionList=res
				})
			},
			// 选中学段
			periodChange(node){
				this.subjectList=[];
				this.editionList=[];
				this.gradeList=[];
				this.sectionList=[];
				this.form.subject='';
				this.form.edition='';
				this.form.grade='';
				this.form.section='';
				this.getSubjectData();
			},
			// 选中学科
			subjectChange(node){
				this.editionList=[];
				this.gradeList=[];
				this.sectionList=[];
				this.form.edition='';
				this.form.grade='';
				this.form.section='';
				this.getEditionData();
			},
			// 选中版本
			editionChange(node){
				this.gradeIds=node.gradeIds;
				this.gradeList=[];
				this.sectionList=[];
				this.form.grade='';
				this.form.section='';
				this.getGradeData();
			},
			// 选中年级
			gradeChange(node){
				this.sectionList=[];
				this.form.section='';
				this.getSubjectContent();
			},
			closeDialog(){
				this.dialogVisible=false
				this.cancle()
			},

			initWebUploader(){
				let self = this;
				//监听分块上传过程中的时间点
				WebUploader.Uploader.register({
				   	"before-send-file":"beforeSendFile",  // 整个文件上传前
				    "before-send":"beforeSend",  // 每个分片上传前
				    "after-send-file": "afterSendFile"  // 分片上传完毕
				},{
				    //时间点1：所有分块进行上传之前调用此函数 ，检查文件存不存在
				    beforeSendFile:function(file){
						if(self.validForm(self.$refs.form)){
					    	let deferred = WebUploader.Deferred();
					    	let storage = localStorage.getItem('userList')
							let userList = JSON.parse(storage)
					    	self.md5File = hex_md5(file.name+file.size+userList[0].value);//根据文件名称，大小确定文件唯一标记，这种方式不赞成使用
					    	$.ajax({
					            type:"POST",
					            url:self.baseUrl+"/resInfo/checkFile",
//								url:self.$api.perSpace.checkFile,
					            data:{
					                md5File: self.md5File, //文件唯一标记
					                fileName: file.name,
					            },
					            async: false,  // 同步
					            dataType:"json",
					            success:function(response){
					                if(response){  //文件存在，跳过 ，提示文件存在
					                		self.$message.error("资源文件:"+file.name+"已经存在！")
					                		if(self.uploader != ''){
					                			self.uploader.reset();
					                		}
					                }else{
					                    deferred.resolve();  //文件不存在或不完整，发送该文件
					                }
					            }
					        } , function (jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
					        	deferred.resolve();
					        } );
					    return deferred.promise();
						}
				    },
				    //时间点2：如果有分块上传，则每个分块上传之前调用此函数  ，判断分块存不存在
				    beforeSend:function(block){
				    	if(self.validForm(self.$refs.form)){
					        let deferred = WebUploader.Deferred();
					        $.ajax({
					            type:"POST",
								url:self.baseUrl+"/resInfo/checkChunk",
//								url:self.$api.perSpace.checkChunk,
					            data:{
					                md5File: self.md5File,  //文件唯一标记
					                chunk:block.chunk,  //当前分块下标
					                resCateGoryId: self.form.resCategory.id,
					            },
					            dataType:"json",
					            success:function(response){
					                if(response){
					                    deferred.reject(); //分片存在，跳过
					                }else{
					                    deferred.resolve();  //分块不存在或不完整，重新发送该分块内容
					                }
					            }
					        }, function (jqXHR, textStatus, errorThrown) { //任何形式的验证失败，都触发重新上传
					        	deferred.resolve();
					        });
					        return deferred.promise();
					    }
				    },
				    //时间点3：分片上传完成后，通知后台合成分片
				    afterSendFile: function (file) {
				        let chunksTotal = Math.ceil(file.size / (50*1024*1024));
				        if (chunksTotal >= 1) {
				            //合并请求
				            var deferred = WebUploader.Deferred();
				            self.formdata = new FormData()
							if(self.leftActive==1){
								self.formdata.append('description',self.form.desi);
								self.formdata.append('studyAdvisor',self.form.guide);
								self.formdata.append('exercise',self.form.exer);
							}
							self.formdata.append('title',self.form.name);
							self.formdata.append('periodId',self.form.period.id);
							self.formdata.append('subjectId',self.form.subject.id);
							self.formdata.append('editionId',self.form.press.id);
							self.formdata.append('gradeId',self.form.grade.id);
							self.formdata.append('categoryId',self.form.resCategory.id);
							self.formdata.append('subjectContentId',self.form.section.id);
							self.formdata.append("md5File",self.md5File);
				            self.formdata.append("chunks",chunksTotal);
				            self.formdata.append("fileName",file.name);
				            if(self.validFormdata(self.formdata)){
					    		self.jumpVisible = true;
					    		self.$http.post(self.$api.perSpace.uploadData,self.formdata).then(res=>{
					                	if(res.data=="success"){
						                	$('#' + file.id).find('.progress').fadeOut();
						                	self.dialogVisible = true;
											setTimeout(self.preview, 5000);
											return;
					                	}else{
					                		self.$message.error("提交失败！");
						            		deferred.reject();
						            		return;
					               		}
										this.disable=false
								})
				            }
				            return deferred.promise();
				        }
				    }
				});

				self.uploader = WebUploader.create({
					auto: false,// 选完文件后，是否自动上传。
				    swf: '../../assets/css/Uploader.swf',// swf文件路径
				    server: self.baseUrl+'/resInfo/upload',// 文件接收服务端。
//				    server: self.$api.perSpace.upload,// 文件接收服务端。
				    pick: {
				    	id: '#picker',// 选择文件的按钮。可选。
				    	lable: '点击添加视频或文档',
				    	multiple:false
				    },
				    chunked:true,//开启分片上传
				    chunkSize:50*1024*1024,//50M
				    chunkRetry: 0,//错误重试次数
				    fileNumLimit: 1,
				    threads:2,
				    duplicate:false
				});

				//上传添加参数
				self.uploader.on('uploadBeforeSend', function (obj, data, headers) {
					 data.md5File=self.md5File;
					 data.resCateGoryId=self.form.resCategory.id;
			     });


				// 当有文件被添加进队列的时候
				self.uploader.on( 'fileQueued', function( file ) {
					self.form.name = file.name
					$("#sourceName").focus();
					//选择文件过程中替换掉已经选择的文件
            		if(self.dom != ''){
            			self.dom.remove();
            			self.dom = '';
            		}
            		self.currentFile = file;
					self.dom = $('<div id="' + file.id + '" style="margin-left:20px;">' +
					        '<h5 style="color:grey;">' + file.name + '</h5>' +
					    '</div>');
					$("#thelist").append(self.dom);
					$("#picker").on("click",function () {
                		self.uploader.removeFile(file,true);
            		})
				});

				// 文件上传过程中创建进度条实时显示。
				self.uploader.on( 'uploadProgress', function( file, percentage ) {
				    self.progressVisible = true;
				    let $li = $( '#'+file.id),
				        $percent = $li.find('.progress .progress-bar');

				    // 避免重复创建
				    if ( !$percent.length ) {
				        $percent = $('<div class="progress progress-striped active">' +
				          '<div class="progress-bar" role="progressbar" style="width: 0%">0%</div>' +
				        '</div>').appendTo( $li ).find('.progress-bar');
				    }
				    $percent.css( 'width', percentage * 100 + '%' );
				    $percent.text( parseInt(percentage * 100) + '%' );
					this.disable=true
				});

			},
			submit(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
				  	if(this.currentFile == ''){
				  		this.$message.error("请添加要上传的资源文件！");
				  		return false;
				  	}
					this.uploader.upload();
				  } else {
					return false;
				  }
				});
			},

			//判断提交时候的表单数据是否存在
			validFormdata(formData){
				let flag = true;
				let formValue = formData.entries();
				for(let pair of formValue){
					if(pair[1] == 'undefined'){
						flag = false;
						break;
					}

				}
				return flag;
			},

			//判断提交时候的表单数据是否存在
			validForm(form){
				let flag = true;
				if(form == undefined){
					flag = false;
				}
				return flag;
			},
			cancle(){
				if(this.$refs.form != undefined){
					this.$refs.form.resetFields();
				}
				this.md5File='',//上传过程中的md5File
				this.uploader='',//webuploader初始化
				this.dom= '',
				this.formdata= '',
				this.value= [],
				this.dialogVisible=false,
				this.jumpVisible=false,
				this.reload();
			},
			//默认上传资源完成后如果不点击再传一次
			preview(){
				if(this.jumpVisible){
					this.cancle();
					this.$router.push('/informationList');
					this.SET_PERSON_ACTIVE('1')
				}
			}
		}
	}
</script>
<style scoped>
	@import "../../assets/css/style.css";
	@import "../../assets/css/bootstrap.min.css";

	.ud_title {
		padding: 0 20px;
		height: 61px;
		line-height: 61px;
		border-radius: 5px;
		background: #fff;
	}
	.ud_box_title {
		padding: 20px;
		border-bottom: 1px solid #eee;
		background: #fff;
		border-radius: 5px 5px 0 0;
	}
	.form_box{
		background: #fff;
		padding: 20px;
		border-radius: 0 0 5px 5px;
	}
	.form_label{
		font-weight: 900;
		color: #FF0000;
		display: inline-block;
		line-height: 40px;
	}
	.selectForm {
		display: inline-block;
		margin-left: 26px;
	}
	/* 上传图标 */
	.upload_icon{
		display: inline-block;
		width: 36px;
		height: 36px;
		margin-top: 45px;
		background: url(../../assets/images/PersonalSpace/add.png) no-repeat;
	}
	.opreate_btn input{
		width:212px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		background: #4BA0D9;
		color: #fff;
		border-radius: 5px;
		margin: 25px 20px 0 0;
	}
	.cancel{
		background: none !important;
		border:1px solid #7D7D7D;
		color: #000000 !important;
	}
	.dialog-footer{
		text-align: center !important;
	}
	.shade{
		width: 100%;
		height: 100%;
		background: #fff;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		opacity: 0;
		cursor: not-allowed;
	}
	.forbide_btn input{
		cursor: not-allowed;
	}
</style>
