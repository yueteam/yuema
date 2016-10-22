'use strict'

export default function(router){
    router.map({
        '/':{				//首页
            name:'home',
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        /* 404路由 */
        '*': {
            component: function(resolve){
                require(['./views/index.vue'],resolve);
            }
        },
        '/list':{               //首页
            name:'list',
            component: function(resolve){
                require(['./views/list.vue'],resolve);
            }
        },
        '/profile/:id':{        //个人页
            name:'profile',
            component: function(resolve){
                require(['./views/profile.vue'],resolve);
            }
        },
        '/asklist':{        //请求的约会列表
            name:'asklist',
            component: function(resolve){
                require(['./views/asklist.vue'],resolve);
            },
            auth: true
        },
        '/add':{               //发约会
            name:'add',
            component: function(resolve){
                require(['./views/add.vue'],resolve);
            },
            auth: true
        },
        '/message':{               //消息
            name:'message',
            component: function(resolve){
                require(['./views/message.vue'],resolve);
            },
            auth: true
        },
        '/chat/:uid/:did':{               //聊天
            name:'chat',
            component: function(resolve){
                require(['./views/chat.vue'],resolve);
            },
            auth: true
        },
        // '/register':{               //注册
        //     name:'register',
        //     component: function(resolve){
        //         require(['./views/register.vue'],resolve);
        //     }
        // },
        // '/login':{               //登录
        //     name:'login',
        //     component: function(resolve){
        //         require(['./views/login.vue'],resolve);
        //     }
        // },
        // '/perfect':{               //完善信息
        //     name:'perfect',
        //     component: function(resolve){
        //         require(['./views/perfect.vue'],resolve);
        //     }
        // }
    })
}