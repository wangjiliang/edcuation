<template>
		<!-- 微课 -->
		<div class="lesson_wrap">
			<div class="nav_crumbs" style="margin: 15px 20px;">
				<breadcrumbNav></breadcrumbNav>
			</div>
			<div class="lesson_content">
				<!-- 搜索条件 -->
				<div class="searchCriteria">
					<ul class="searchType">
						<li>
							<span class="lf">{{searchLists[0].keyWord}}：</span>
							<div class="searchKey">
								<span v-for="(list,listIndex) in subject" :class="{active:listIndex==searchLists[0].isActive}" @click="clickSubject(0,listIndex,list)">{{list.name}}</span>
							</div>
						</li>
						<li>
							<span class="lf">{{searchLists[1].keyWord}}：</span>
							<div class="searchKey">
								<span v-for="(list,listIndex) in searchLists[1].lists" :class="{active:listIndex==searchLists[1].isActive}" @click="clickEdition(1,listIndex,list)">{{list.shortName}}</span>
							</div>
						</li>
						<li style="border-bottom: none;">
							<span class="lf">{{searchLists[2].keyWord}}：</span>
							<div class="searchKey">
								<span v-for="(list,listIndex) in searchLists[2].lists" :class="{active:listIndex==searchLists[2].isActive}" @click="clickGrade(2,listIndex,list)">{{list.name}}</span>
							</div>
						</li>
						<li v-show="false">
							<span class="lf">{{searchLists[3].keyWord}}：</span>
							<div class="searchKey">
								<span v-for="(list,listIndex) in searchLists[3].lists" :class="{active:listIndex==searchLists[3].isActive}" @click="searchAddClass(3,listIndex,list)">{{list.name}}</span>
							</div>
						</li>
					</ul>
				</div>
				<!-- 左边 -->
				<div>
					<div class="leftTree">
						<div class="treeTitle">教材目录</div>
							<ul class="catalogue_fir">
								<li v-for="(item,index) in subjectContent" @click="clickSubContent(index,item)">
									<span :style="{'paddingLeft':item.level*12+'px'}" :class="{leftActive:index==leftActive}">{{item.name}}</span>
								</li>
							</ul>
					</div>
					<!-- 右边 列表-->
					<div class="lessonList">
						<div class="listShowType">
							<span v-for="(src,index) in iconSrc" @click="switchList(index,src.src)">
								<img :src="src.src"/>
							</span>
							<!-- <img src="../../assets/images/lesson/lessonlist2.png"/>
							<img src="../../assets/images/lesson/lessonlist3.png"/> -->
						</div>
						<div class="lessonTab">
							<div v-for="(tab,index) in lessonTab">
								<span :class="{Tabactive:index==tabActive}" @click="tabClick(index,tab)">{{tab.name}}</span>
							</div>
						</div>
						<div class="lessonTabContent">
							<lessonListFirst v-show="TypeShow[0]" :listData='listData' :isShade="false"></lessonListFirst>
							<lessonListSecond v-show="TypeShow[1]" :listData='listData' :isShade="false"></lessonListSecond>
							<lessonListThird  v-show="TypeShow[2]" :listData='listData' :isShade="false"></lessonListThird>
						</div>
					</div>
					<page  :total="total" :pageSize="pageSize" :curPage="curPage" v-on:getCurrentPage="getCurrentPage"></page>
					<div class="clear"></div>
				</div>
			</div>
		</div>
</template>

<script scoped>
	import lessonListFirst from './lessonList/lessonListFirst'
	import lessonListSecond from './lessonList/lessonListSecond'
	import lessonListThird from './lessonList/lessonListThird'
	import page from '../../components/page/page.vue'
	import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue'
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {
			lessonListFirst,
			lessonListThird,
			lessonListSecond,
			page,
			breadcrumbNav
		},
		data() {
			return {
				tabActive:'1',
				leftActive:'0',
				lessonTab:[{name:'课件',id:9},{name:'教学设计',id:13},{name:'试卷（练习）',id:6}],
				lessonTabCur:'',
				TypeShow:[true,false,false],
				searchLists:[{
					keyWord:'学科',
					isActive:0,
					lists:[]
				},{
					keyWord:'版本',
					isActive:0,
					lists:[]
				},{
					keyWord:'年级',
					isActive:0,
					lists:[]
				},{
					keyWord:'地区',
					isActive:6,
					lists:[]
				}],
				iconSrc:[{
					src:require('../../assets/images/lesson/lessonlist0-1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist2.png'),
				}],
				subjectItem:{},
				editionItem:{},
				gradeItem:{},
				subContentItem:{},
				subjectContent:[],
				listData:[],
				total:0,
				curPage:1,
				eachPageSize:[8,16,15],
				pageSize:8,
			}
		},
		mounted(){
			this.getSubjectData()
			this.getCityData();
			this.getCategoryData();
			this.lessonTabCur=this.lessonTab[1]
		},
		watch:{
			subject(){
				this.subjectItem=this.subject[0]
				this.searchLists.forEach(function(val,i,item){
					val.isActive=0
					item[3].isActive=6
				})
				this.getEditionData();
			},
		},
		computed: {
		  ...mapState(['subject']),
		},
		methods: {
			...mapActions(['getSubjectList']),
			// 点击学科
			clickSubject(index,listIndex,item){
				this.subjectItem=item;
				this.getEditionData();
				this.searchAddClass(index,listIndex);
				this.searchLists[1].isActive=0;
				this.searchLists[2].isActive=0;
			},
			// 点击版本
			clickEdition(index,listIndex,item){
				this.editionItem=item;
				this.getGradeData();
				this.searchAddClass(index,listIndex);
				this.searchLists[2].isActive=0;
			},
			// 点击年级
			clickGrade(index,listIndex,item){
				this.gradeItem=item
				this.getSubjectContent()
				this.searchAddClass(index,listIndex)
			},
			// 点击教材目录
			clickSubContent(index,item){
				this.leftActive=index
				this.subContentItem=item
				this.curPage=1
				this.getContent()
			},
			// 搜索条件中样式
			searchAddClass(index,listIndex){
				this.searchLists[index].isActive=listIndex
			},
			allAddClass(index){
				this.searchLists[index].isActive=-1
			},
			switchList(index,src){
				var _this=this;
				this.iconSrc[index].src=require(`../../assets/images/lesson/lessonlist${index}-1.png`);
				this.TypeShow[index]=true;
				this.iconSrc.forEach(function(val,i){
					if(i!==index){
						val.src=require(`../../assets/images/lesson/lessonlist${i}.png`)
						_this.TypeShow[i]=false
					}
				})
				this.curPage=1
				this.pageSize=this.eachPageSize[index]
				this.getContent()
			},
			tabClick(index,item){
				this.tabActive=index;
				this.lessonTabCur=item
				this.TypeShow=[true,false,false],
				this.iconSrc=[{
					src:require('../../assets/images/lesson/lessonlist0-1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist2.png'),
				}]
				this.listData=[]
				this.getContent()
			},
			getCurrentPage(curPage){
				this.curPage=curPage
				this.getContent()
			},
			// 获取学科列表
			async getSubjectData() {
				let periodId = this.$store.state.periodId
				var res=await this.getSubjectList(periodId)
				var subjectIndex=this.$route.params.subjectIndex
				if(subjectIndex!==undefined){
					this.subjectItem=this.subject[subjectIndex]
					this.searchLists[0].isActive=subjectIndex
				}else{
					this.subjectItem=this.subject[0]
				}
				this.getEditionData()
			},
			// 获取版本列表
			getEditionData(){
				var params={subjectId:this.subjectItem.id}
				this.basedata.getEditionData(params).then(res=>{
					this.searchLists[1].lists=res;
					this.editionItem=res[0]
					this.getGradeData()
				})
			},
			// 获取年级列表
			getGradeData(){
				var params={gradeIds:this.editionItem.gradeIds}
				this.basedata.getGradeData(params).then(res=>{
					this.searchLists[2].lists=res;
					var gradeIndex=this.$route.params.gradeIndex
					if(gradeIndex!==undefined){
						this.gradeItem=this.searchLists[2].lists[gradeIndex]
						this.searchLists[2].isActive=gradeIndex
					}else{
						this.gradeItem=res[0]
					}
					this.getSubjectContent()
				})
			},
			// 获取城市列表
			getCityData(){
				this.$http.get(this.$api.lesson.city).then(res=>{
					this.searchLists[3].lists=res.data.list
				})
			},
			// 获取学科目录
			getSubjectContent(){
				var params={
					subjectId:this.subjectItem.id,
					editionId:this.editionItem.id,
					gradeId:this.gradeItem.id,
				}
				this.basedata.getSubjectContent(params).then(res=>{
					this.subjectContent=res
					if(res.length>0){
						this.subContentItem=res[0]
						this.getContent()
					}else{
						this.listData=[]
					}
				})
				this.leftActive=0
			},
			// 获取学科目录内容
			getContent(){
				var params={
					subjectContentId:this.subContentItem.id,
					pageNum:this.curPage,
					pageSize:this.pageSize,
					isAudit:2,
					categoryId:this.lessonTabCur.id
				}
				this.$http.get(this.$api.perSpace.list,params).then(res=>{
					this.listData=res.data.list;
					this.total=res.data.total;
				})
			},
			getCategoryData(){
				this.basedata.getCategoryData().then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	@import "../../assets/css/style.css";
	.leftActive{
		color: #3FBDD4;
	}
	.catalogue_fir{
		min-height: 700px;
		max-height: 855px;
		overflow-y: auto;
		padding: 15px 0;
	}
	.catalogue_fir li>span{
		width: 100%;
		display: block;
		padding: 8px 0;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		box-sizing: border-box;
		cursor: pointer;
	}
	.catalogue_fir li{
		padding:0 5px 0 15px;
		box-sizing: border-box;
	}
	.catalogue_fir li:first-child span{
		padding-left:12px !important ;
	}
	.catalogue_fir i{
		display: inline-block;
		width: 11px;
		height: 11px;
		background: url(../../assets/images/lesson/tree_icon1.png) no-repeat;
		margin-right:10px ;
	}
</style>
