import Vue from "vue"
import Router from "vue-router"
import routes from "./routes"
import store from "../store/index.js"

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes
})
 router.beforeEach((to,from,next)=>{
	store.commit('SET_FROMPATH', from.path)
	next()
 })
 export default router
