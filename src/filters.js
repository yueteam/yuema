"use strict"

import utils from  './libs/utils'

/**匹配icon class
 *  @param {string} typeId 类目id
 */
exports.getIconClass = (typeId) => {
    var iconMap = {
            '2': 'icon-coffee',
            '3': 'icon-food',
            '4': 'icon-film',
            '5': 'icon-run',
            '6': 'icon-photo',
            '7': 'icon-badminton',
            '8': 'icon-riding',
            '9': 'icon-drive',
            '11': 'icon-flight',
            '1': 'icon-lquote'
        };

    return iconMap[typeId];
}

/**匹配类目名称
 *  @param {string} typeId 类目id
 */
exports.getTypeName = (typeId) => {
    var typeMap = {
            '2': '喝咖啡/茶',
            '3': '美食',
            '4': '看电影',
            '5': '跑步',
            '6': '摄影',
            '7': '羽毛球',
            '8': '骑行',
            '9': '自驾',
            '11': '同行',
            '1': '其他'               
        };

    return typeMap[typeId];
}

/**匹配城市名称
 *  @param {string} cityId 城市id
 */
exports.getCityName = (cityId) => {
    var cityMap = {
            '110100': '北京',
            '310100': '上海',
            '440100': '广州',
            '440300': '深圳',
            '330100': '杭州',
            '510100': '成都'
        };

    return cityMap[cityId];
}
            
/**匹配职业名称
 *  @param {string} socialId 职业id
 */
exports.getProfession = (socialId,career) => {
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

    var profession = '混'+socialMap[socialId]+'圈';
    if(career) {
        profession += '的' + career;
    }    
    return profession;
}

/**计算年龄
 *  @param {string} birthday 生日
 */
exports.getAge = (birthday) => {
    if(birthday) {
        var age = new Date().getFullYear() - parseInt(birthday.substr(0,4));  
        return age;
    } else {
        return '';
    }
}  

/**获取性别
 *  @param {string} sex 性别
 */
exports.getSex = (sex) => {
    return sex === 'M' ? '男' : '女';
} 

/**获取性别class
 *  @param {string} sex 性别
 */
exports.getSexCls = (sex) => {
    return sex === 'M' ? 'icon-male' : 'icon-female';
} 

/**获取约会日期
 *  @param {string} datingTime 约会日期
 */
exports.getDatingDate = (datingTime) => {
    if(datingTime && datingTime !== '') {
       return datingTime.substr(0,10);
    } else {
       return '随时';
    }
}  

/**获取头像
 *  @param {string} url 头像图片地址
 *  @param {number} width 头像图片尺寸
 */
exports.getAvatar = (url, width) => {
    return url + '_s' + width;
}        
            
/**格式化时间
 *  @param {string} time 需要格式化的时间
 *  @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
    if (friendly) {
        return utils.MillisecondToDate(new Date() - new Date(time));
    } else {
        return utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
    }
}

/**
 * [format 日期格式化]
 * @param  {[type]} format ["YYYY年MM月dd日hh小时mm分ss秒"]
 * @return {[type]}        [string]
 */
exports.format = (date, format) => {
    var o = { 
        "M+" : date.getMonth()+1, //month 
        "d+" : date.getDate(), //day 
        "h+" : date.getHours(), //hour 
        "m+" : date.getMinutes(), //minute 
        "s+" : date.getSeconds(), //second 
        "q+" : Math.floor((date.getMonth()+3)/3), //quarter 
        "S" : date.getMilliseconds() //millisecond 
    }
    if(/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format; 
}

/**
 * [ago 多少小时前、多少分钟前、多少秒前]
 * @return {[type]} [string]
 */
exports.ago = (time) => {
    time = time.substr(0,19).replace(/\-/g, '/');
    var now = new Date().getTime(),
        past =  new Date(time).getTime(),
        diffValue = now - past,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue/year,
        _month = diffValue/month,
        _week = diffValue/(7*day),
        _day = diffValue/day,
        _hour = diffValue/hour,
        _min = diffValue/minute;

    if(_year>=1) {
        result = parseInt(_year) + "年前";
    } else if(_month>=1) {
        result = parseInt(_month) + "个月前";
    } else if(_week>=1) {
        result = parseInt(_week) + "周前";
    } else if(_day>=1) {
        result = parseInt(_day) +"天前";
    } else if(_hour>=1) {
        result = parseInt(_hour) +"小时前";
    } else if(_min>=1) {
        result = parseInt(_min) +"分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}