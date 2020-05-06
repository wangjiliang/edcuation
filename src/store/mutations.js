
import * as types from './mutation-types'

const mutations = {
  //更新学段列表
  [types.SET_PERIOD_LIST](state,list){
    state.period = list
  },
  //更新学段Id
  [types.SET_PERIOD_ID](state,id) {
    state.periodId = id
  },
  //更新学科列表
  [types.SET_SUBJECT_LIST](state,list) {
    state.subject = list
  },
	// 更新年级
  [types.SET_GRADE_LIST](state,list) {
    state.grade = list
  },
	// 判断是否是老师
	[types.SET_IS_TEACHER](state,status) {
    state.isTeacher = status
  },
	// 头像路径
	[types.SET_HEAD_URL](state,headUrl) {
	  state.headUrl = headUrl
	},
  //
  [types.SET_FROMPATH](state,path) {
    state.frompath = path
  },
	// 保存用户id
	[types.SET_USER_ID](state,id) {
	  state.userid = id
	},
	// 面包屑导航二级
	[types.SET_CRUMB_SEC](state,crumbSec) {
	  state.crumbSec = crumbSec
	},
	// 面包屑导航二级路径
	[types.SET_NAV_PATH](state,navPath) {
	  state.navPath = navPath
	},
	// 面包屑导航title
	[types.SET_DETAIL_TITLE](state,detailTitle) {
	  state.detailTitle = detailTitle
	},
	// 面包屑导航title路径
	[types.SET_DETAIL_PATH](state,detailPath) {
	  state.detailPath = detailPath
	},
	// 个人中心默认
	[types.SET_PERSON_ACTIVE](state,personActive) {
	  state.personActive = personActive
	},
}

export default mutations
