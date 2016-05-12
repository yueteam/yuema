$(function() {
	var Utils = require("../../common/utils");
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Nodata = require('../../components/nodata');
	var Loading = require('../../components/loading/loading');
	var Yue = require("../../mods/yue/yue");
    var Nav = require("../../mods/Nav/Nav");
	var Mscroll = require('../../components/mscroll');
    var Notice = require("../../mods/notice/notice");

	var pageNo = 1;
	var pageEnd = false;
    var listType = 100;

	var app = {
    	init: function() {
    		var me = this;          

            Nav.init();

            Loading.show();
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
            Notice.initialize();

        	//滚动监控
            Mscroll.init({
                'scrollToBottom': function(){
                    if(pageEnd) {
                        Mscroll.stop();
                        return;
                    }

                    pageNo > 1 && $('#loadmore').html('');
                    Loading.show({
                        renderTo: '#loadmore'
                    });

                    me.getData(function(){
                        Mscroll.after();
                    });
                }
            });

            //筛选
            $(document).on('tap', '.menu-filter', function() {
                Utils.stopEventTap();
                $('.g-panel').addClass('open');
            });

            $(document).on('tap', '.tag-item', function() {
                Utils.stopEventTap();

                var $this = $(this),
                    tagId = $this.data('val');
                if($this.hasClass('active')) {
                    $this.removeClass('active');
                    listType = 100;
                } else {
                    $('.tag-list .active').removeClass('active');
                    $this.addClass('active');
                    listType = tagId;
                }
                $('.g-panel').removeClass('open');
                me.switchTag();
            });
		},

        /**
         * 筛选后的渲染操作
         * @return {[type]} [description]
         */
        switchTag : function() {
            var me = this;

            //初始化配置
            pageNo = 1;
            pageEnd = false;
            $('.list').html('');
            $('#loadmore').html('');
            Nodata.hide();
            $('body').scrollTop(0);
            Mscroll.reopen();
            me.getData();
        },

		/**
         * 获取列表数据
         */
        getData: function (cb) {
            var me = this;
           
            var apiData = {
                'page': pageNo
            };

            if(listType != 100) {
                apiData = {
                    'page': pageNo,
                    'type': 'category',
                    'category': listType
                };
            }
            Ajax.get(Apimap.listApi, apiData,
				function(d){
					Loading.hide();

				    if(d.result && d.result.datingList) {
				    	var listData  = d.result.datingList;

				    	if(listData.length === 0) {
				    		pageEnd = true;
				    		if(pageNo === 1) {
				    			Nodata.show('暂时没什么约会，过会来看看吧~');
				    		} else {
				    			$('#loadmore').html('没有更多约会了~');
				    		}
				    	} else {
				    		me.renderData(listData);
				    		$('#loadmore').html('上拉加载更多');
				    		pageNo++;
				    	}
				    	cb && cb();
				    } else {
				    	Tips.show({
		                    type: 'error',
		                    title: '返回的数据格式有问题'
		                });
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
        renderData: function (listArr) {
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
        	$.each(listArr, function(index, item){
        		var sex = item.postUserInfo.sex,
        			birthday = item.postUserInfo.birthday,
        			datingTime = item.datingInfo.datingTime || '',
                    cityId = item.postUserInfo.cityId,
                    socialId = item.postUserInfo.socialId,
        			typeId = item.datingInfo.typeId;

        		listArr[index].age = new Date().getFullYear() - parseInt(birthday.substr(0,4));
        		listArr[index].sex = sex === 'M' ? '男' : '女';
                if(datingTime !== '') {
        		    listArr[index].time = datingTime.substr(0,10);
                }
        		listArr[index].iconCls = iconMap[typeId];
        		listArr[index].typeName = typeName[typeId];
                listArr[index].city = cityMap[cityId];

                var profession = '混'+socialMap[socialId]+'圈';
                if(item.postUserInfo.career && item.postUserInfo.career !== '') {
                    profession += '的'+item.postUserInfo.career;
                }
                listArr[index].profession = profession;

        	});
        	var html = Utils.template($('#listTmpl').html(), 
	        	{
					list: listArr
				});

			$('.list').append(html);
        }
    };

    app.init();

});