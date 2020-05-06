import * as types from './mutation-types'

import http from '../api/http'
import api from '../api/api'

const actions = {
  // 获取学段列表 */
  getPeriodList({commit}) {
    http.get(api.vheader.name).then( res => {
      commit(types.SET_PERIOD_LIST, res.data)
    })
  },
  // 获取学科列表
  getSubjectList({commit}, id=1) {
		return new Promise(function(resolve,reject){
			  http.get(api.lesson.subject,{periodId:id}).then( res => {
					commit(types.SET_SUBJECT_LIST, res.data)
					resolve(res);
			},err =>{
				reject(err)
			})
		})
		//
		//
  //   http.get(api.lesson.subject,{periodId:id}).then( res => {
  //     commit(types.SET_SUBJECT_LIST, res.list)
  //   })
  },
	// 学科获取年级列表 ---资源中心
	getGradeList({commit}, id) {
	  http.get(api.grade.gradelist,{subjectId:id}).then( res => {
	    commit(types.SET_GRADE_LIST, res.data)
	  })
	},
}

export default actions
