<template>
	<div class="bg_Ps borderbox">
		<div class="lesson_wrap ps_wrap" style="min-height: calc(100vh - 100px);">
			<div class="nav_crumbs" style="margin: 15px 20px;">
				<breadcrumbNav></breadcrumbNav>
			</div>
			<div class="leftTree">
				<div class="treeTitle">栏目</div>
				<el-tree :data="leftTab"
				:key="treeKey"
				:props="defaultProps" 
				:highlight-current="true"
				@node-click="clickLeftTab"
				default-expand-all
				:expand-on-click-node="false"
				node-key="id"
				:current-node-key="leftId">
				</el-tree>
			</div>
			<!-- 右边 列表-->
			<div class="lessonList">
				<div class="listShowType">
					<span v-for="(src,index) in iconSrc" @click="switchList(index,src.src)">
						<img :src="src.src" />
					</span>
				</div>
				<div class="lessonTab">
					<div style="padding-left: 20px;font-size: 18px;">{{listTitle}}</div>
				</div>
				<div class="lessonTabContent">
					<firstMode v-show="TypeShow[0]" :curData='curData'></firstMode>
					<secMode v-show="TypeShow[1]" :curData='curData'></secMode>
					<thirdMode v-show="TypeShow[2]" :curData='curData'></thirdMode>
				</div>
			</div>
			<page :total="total" :pageSize="pageSize" :curPage="curPage" v-on:getCurrentPage="getCurrentPage"></page>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script>
	import firstMode from './newsList/firstMode'
	import secMode from './newsList/secMode'
	import thirdMode from './newsList/thirdMode'
	import page from '../../components/page/page.vue'
	import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue' 
	export default {
		components: {
			firstMode,
			secMode,
			thirdMode,
			page,
			breadcrumbNav
		},
		data() {
			return {
				leftTab: [],
				defaultProps: {
					children: 'list',
					label: 'name'
				},
				leftActive: '0',
				isShade: false,
				TypeShow: [true, false, false],
				listData: [],
				total: 0,
				curPage: 1,
				eachPageSize: [8, 16, 15],
				pageSize: 8,
				curData: [],
				leftId: 1,
				listTitle: "教育咨询",
				iconSrc: [{
					src: require('../../assets/images/lesson/lessonlist0-1.png'),
				}, {
					src: require('../../assets/images/lesson/lessonlist1.png'),
				}, {
					src: require('../../assets/images/lesson/lessonlist2.png'),
				}],
				index: 0,
				treeKey:''
			}
		},
		mounted() {
			this.getLeftTab();
		},
		methods: {
			// 切换格式
			switchList(index, src) {
				var _this = this;
				this.iconSrc[index].src = require(`../../assets/images/lesson/lessonlist${index}-1.png`);
				this.TypeShow[index] = true;
				this.iconSrc.forEach(function(val, i) {
					if (i !== index) {
						val.src = require(`../../assets/images/lesson/lessonlist${i}.png`)
						_this.TypeShow[i] = false
					}
				})
				this.curPage = 1
				this.pageSize = this.eachPageSize[index]
				this.getListData()
			},
			// 获取左边选项卡
			getLeftTab() {
				this.$http.get(this.$api.news.category).then(res => {
					this.leftTab = res.data
					if (this.$route.query.index == undefined) {
						this.leftActive == 0
					} else {
						this.leftActive = this.$route.query.index;
					}
					this.listTitle = this.leftTab[this.leftActive].name
					this.leftId = res.data[this.leftActive].id
					this.treeKey = +new Date()
					this.getListData()
				})
			},
			// 左边选项卡切换
			clickLeftTab(node) {
				this.leftId = node.id
				this.curPage = 1
				this.listTitle = node.name
				this.getListData()
			},
			// 获取当前页数
			getCurrentPage(curPage) {
				this.curPage = curPage
				this.getListData()
			},
			// 获取列表数据
			getListData() {
				var _this = this
				var params = {
					pageNum: this.curPage,
					pageSize: this.pageSize,
					cmsCategoryId: this.leftId
				}
				this.$http.get(this.$api.news.list, params).then(res => {
					var data = res.data.list
					this.curData = data
					this.total = res.data.total
				})
			}
		}
	}
</script>
<style scoped>
	@import "../../assets/css/style.css";

	.treeTitle {
		height: 76px;
		line-height: 76px;
		font-size: 18px;
	}
	.leftActive {
		background: rgba(63, 189, 212, 0.5);
	}

	.lessonTabContent {
		background: #fff;
		min-height: 500px;
	}
</style>
