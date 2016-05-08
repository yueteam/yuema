// var apiPerfix = window.location.protocol + '//'+window.location.host+'/';
var apiPerfix = window.location.protocol + '//www.yuema.us/';
var Apimap = {
    loginApi: apiPerfix + 'open-api/login',
    registApi: apiPerfix + 'open-api/simple-regist',
    perfectApi: apiPerfix + 'action/user/update',
    provincesListApi: apiPerfix + 'open-api/query/provinces-list',
    citiesListApi: apiPerfix + 'open-api/query/cities-list',
    addressesListApi: apiPerfix + 'open-api/query/addresses-list',
    postDatingApi: apiPerfix + 'action/dating/post',
    requestDatingApi: apiPerfix + 'action/dating/request',
    acceptDatingApi: apiPerfix + 'action/dating/accept',
    listApi: apiPerfix + 'open-api/query/dating/dating-list',
    profileApi: apiPerfix + 'open-api/query/home-info'
};

module.exports = Apimap;
