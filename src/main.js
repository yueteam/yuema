'use strict'

import Vue from 'vue';
import VueRouter from 'vue-router';
import filters from './filters';
import routerMap from './routers';
import FastClick from 'fastclick';
import Utils from './libs/utils';
import Device from './libs/device';

Vue.use(VueRouter);

$.ajaxSettings.crossDomain = true;

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

//实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: false,
    transitionOnLoad: false
});

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((transition) => {
    
    FastClick.attach(document.body);

    if (transition.to.auth) {
        if (Utils.isLogin()) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/login.html?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
});
//切换路由后回到顶部
router.afterEach((transition) => {
    // setTimeout(function(){
        // $(window).scrollTop(0);
    // },200);   
});  

let app = Vue.extend({});
routerMap(router);

router.start(app, "#app");
