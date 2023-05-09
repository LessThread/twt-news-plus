import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import APP from '../APP.vue'
import MainView from '../views/MainView.vue'
import Display from "../views/Display.vue";
import { useStore } from 'vuex';
const store = useStore()


function isMobile() {
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  // localStorage.setItem('isiphone',flag)
  console.log(flag)
  return flag;
}
const Mobile = isMobile()



let routes: Array<RouteRecordRaw>
if(Mobile)
{
  routes = [
    {
      path: '/',
      redirect: "/MainView"
    },
    {
      path: '/news',
      redirect: "/MainView"
    },
    {
      path: '/MainView',
      name: 'MainView',
      component: () => import('../mobile-src/view/mobile-mainview.vue'),
      meta: {
        keepAlive:false
      }
    },
    {
      path: '/Display',
      name: 'Display',
      component: () => import('../views/Display.vue')
    }
  ]
}

else{
  routes= [
    {
      path: '/',
      redirect: "/MainView"
    },
    {
      path: '/news',
      redirect: "/MainView"
    },
    {
      path: '/MainView',
      name: 'MainView',
      component: () => import('../views/MainView.vue'),
      meta: {
        keepAlive:false
      }
    },
    {
      path: '/Display',
      name: 'Display',
      component: () => import('../views/Display.vue')
    }
  ]


}

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})


export default router


