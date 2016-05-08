$(function() {
	var Utils = require("../../common/utils");
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
    var Nodata = require('../../components/nodata');
	var Loading = require('../../components/loading/loading');
	var Flipsnap = require("../../components/flipsnap");
	var Yue = require("../../mods/yue/yue");

    var width = $(window).width();
    // 个人id
    var profileId = Utils.getUrlParam('id');

	var app = {
    	init: function() {
    		var me = this;

    		var scrollerW = width * $('.scroller .item').length;
            $('.basic-info').height(width);
            $('.scroller .item').width(width);
    		$('.scroller').width(scrollerW);

            me.getData(function() {
                me.initEvent(); 
            });  		
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

        	Yue.init();

        	var $pointer = $('.icons i');
			var flipsnap = Flipsnap('.scroller', {
			    distance: width
			});

			flipsnap.element.addEventListener('fspointmove', function() {
				$pointer.filter('.current').removeClass('current');
			    $pointer.eq(flipsnap.currentPoint).addClass('current');
			}, false);
		},

		/**
         * 获取列表数据
         */
        getData: function (cb) {
            var me = this;
           
            Ajax.get(Apimap.profileApi, {
					'id': profileId
				},
				function(d){
					Loading.hide();

				    if(d.result && d.result.userInfo) {
				    	me.renderData(d.result);

				    	cb & cb();
				    } else {
                        Nodata.show('返回的数据格式有问题');
                    }
				},
				function(d){
					Loading.hide();

                    Nodata.show(d.resultMsg);
				}
			);

        },

        /**
         * 渲染列表数据
         */
        renderData: function (data) {
        	var iconMap = {
                '2': 'icon-coffee',
                '3': 'icon-food',
                '4': 'icon-film',
                '5': 'icon-run',
                '6': 'icon-photo',
                '7': 'icon-badminton',
                '8': 'icon-riding',
                '9': 'icon-drive',
                '1': 'icon-lquote'
            };
            var typeName = {
                '2': '喝咖啡/茶',
                '3': '美食',
                '4': '看电影',
                '5': '跑步',
                '6': '摄影',
                '7': '羽毛球',
                '8': '骑行',
                '9': '自驾',
                '1': '其他'               
            };
            var cityMap = {
                '110100': '北京',
                '310100': '上海',
                '440100': '广州',
                '440300': '深圳',
                '330100': '杭州',
                '510100': '成都'
            };
            var socialMap = {
                '1': '互联网/IT',
                '2': '金融财务',
                '3': '艺术/设计',
                '4': '模特/演艺',
                '5': '创业/投资',
                '6': '摄影制作',
                '7': '影视娱乐',
                '8': '音乐/舞蹈',
                '9': '广告传媒',
                '10': '教育/体育'
            };
            var userInfo = data.userInfo,
                listArr = data.postDatingList;

            var sex = userInfo.sex,
                birthday = userInfo.birthday,
                cityId = userInfo.cityId,
                socialId = userInfo.socialId;
            userInfo.age = new Date().getFullYear() - parseInt(birthday.substr(0,4));
            userInfo.sex = sex === 'M' ? '男' : '女';
            userInfo.city = cityMap[cityId];    
            var profession = '混' + socialMap[socialId] + '圈';
            if(userInfo.career && userInfo.career !== '') {
                profession += '的' + userInfo.career;
            }
            userInfo.profession = profession;

            $.each(listArr, function(index, item){
                var datingTime = item.datingTime || '',
                    typeId = item.typeId;
                
                if(datingTime !== '') {
                    listArr[index].time = datingTime.substr(0,10);
                } else {
                    listArr[index].time = '随时';
                }
                listArr[index].iconCls = iconMap[typeId];
                listArr[index].typeName = typeName[typeId];           

            });
        	var html = Utils.template($('#tmpl').html(), 
	        	{
                    info: userInfo,
					list: listArr
				});

			$('.page-content').html(html);
        }
    };

    app.init();
});