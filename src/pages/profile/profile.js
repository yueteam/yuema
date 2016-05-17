$(function() {
	var Utils = require("../../common/utils");
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
    var Nodata = require('../../components/nodata');
	var Loading = require('../../components/loading/loading');
	var Flipsnap = require("../../components/flipsnap");
    var DateFormat = require("../../components/date");
    var Dialog = require('../../components/dialog/dialog');
    var Nav = require("../../mods/Nav/Nav");
	var Yue = require("../../mods/yue/yue");
    var Notice = require("../../mods/notice/notice");

    var width = $(window).width();
    // 个人id
    var profileId = Utils.getUrlParam('id') || '';

	var app = {
    	init: function() {
    		var me = this;

            Loading.show();
            me.getData(function() {
                var scrollerW = width * $('.scroller .item').length;
                $('.basic-info').height(width);
                $('.scroller .item').width(width);
                $('.scroller').width(scrollerW);

                Nav.init();

                me.initEvent(); 
            });  		
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

        	Yue.init();
            Notice.initialize();

        	// var $pointer = $('.icons i');
			var flipsnap = Flipsnap('.scroller', {
			    distance: width
			});

			// flipsnap.element.addEventListener('fspointmove', function() {
			// 	$pointer.filter('.current').removeClass('current');
			//     $pointer.eq(flipsnap.currentPoint).addClass('current');
			// }, false);

            $(document).on('tap', '.tab-item', function () {
                var $this = $(this),
                    tab = $this.data('tab');

                if($this.hasClass('current')) {
                    return false;
                }

                $('.tab-bar .current').removeClass('current');
                $this.addClass('current');
                $('.dating-list').hide();
                $('#tab'+tab).show();
            });

            $(document).on('tap', '.btn-accept', function(){
                Utils.stopEventTap();
                
                var id = $(this).data('id'),
                    userId = $(this).data('uid');

                Dialog.confirm({'title': '答应Ta', 'body': '答应这个请求的同时将拒绝掉其他请求，确认答应吗？'}, function(){
                    
                    me.acceptAsk(id, userId);
                });
               
            });
		},

        /**
         * 发送信息
         * @return {Boolean} [description]
         */
        acceptAsk: function(id, uid) {
            var me = this;

            Loading.show();
           
            Ajax.post(Apimap.acceptDatingApi, {
                    'datingId': id,
                    'userId': uid
                },
                function(d){
                    Loading.hide();

                    Tips.show({
                        type: 'success',
                        title: '您已答应，准备赴约吧'
                    });
                },
                function(d){
                    Loading.hide();

                    Tips.show({
                        type: 'error',
                        title: d.resultMsg
                    });
                }
            );
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
                        if(!d.result.userInfo.id) {
                            Nodata.show('该用户不存在');
                            return false;
                        }
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
                listArr = data.postDatingInfoList;

            var sex = userInfo.sex,
                birthday = userInfo.birthday,
                cityId = userInfo.cityId,
                socialId = userInfo.socialId;
            userInfo.age = new Date().getFullYear() - parseInt(birthday.substr(0,4));
            userInfo.sex = sex === 'M' ? '男' : '女';
            userInfo.sexCls = sex === 'M' ? 'icon-male' : 'icon-female';
            userInfo.city = cityMap[cityId];    
            var profession = '混' + socialMap[socialId] + '圈';
            if(userInfo.career && userInfo.career !== '') {
                profession += '的' + userInfo.career;
            }
            userInfo.profession = profession;

            $.each(listArr, function(index, item){
                var datingTime = item.datingInfo.datingTime || '',
                    typeId = item.datingInfo.typeId;
                
                if(datingTime !== '') {
                    listArr[index].time = datingTime.substr(0,10);
                } else {
                    listArr[index].time = '随时';
                }
                listArr[index].iconCls = iconMap[typeId];
                listArr[index].typeName = typeName[typeId];   
                listArr[index].id = item.datingInfo.uUID;  
                listArr[index].article = item.datingInfo.article; 

                var requestUserInfos = item.requestUserInfos;
                if(requestUserInfos.length>0){ 
                    if(requestUserInfos[0].requestDatingAccept) { // 判断这个约会是否已完成
                        listArr[index].done = true;
                    }
                    $.each(requestUserInfos, function(i, item1){
                        if(item1.requestDatingTime) {
                            var requestDatingTime = item1.requestDatingTime;
                            requestDatingTime = requestDatingTime.substr(0,19).replace(/\-/g, '/');
                            listArr[index].requestUserInfos[i].requestDatingTime = DateFormat.ago(requestDatingTime);
                        }
                    });
                }

            });

        	var html = Utils.template($('#tmpl').html(), 
	        	{
                    'myHome': data.myHome,
                    'info': userInfo,
					'list': listArr
				});

			$('.page-content').html(html);
            document.title = userInfo.nickName;
            $('#header h1').text(userInfo.nickName);
        }
    };

    app.init();
});