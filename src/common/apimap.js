// var apiPerfix = window.location.protocol + '//'+window.location.hostname+'/';
var apiPerfix = window.location.protocol + '//www.yuema.us/';
var Apimap = {
    loginApi: apiPerfix + 'open-api/login',
    registApi: apiPerfix + 'open-api/regist',
    provincesListApi: apiPerfix + 'open-api/get/provinces-list',
    citiesListApi: apiPerfix + 'open-api/get/cities-list',
    addressesListApi: apiPerfix + 'open-api/get/addresses-list',
    postDatingApi: apiPerfix + 'action/post/dating',
    requestDatingApi: apiPerfix + 'action/request/dating',
    acceptDatingApi: apiPerfix + 'action/accept/dating',
    listApi: apiPerfix + 'open-api/query/dating/dating-list'
};

module.exports = Apimap;
