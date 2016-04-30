var apiPerfix = 'http://www.yuema.us:8888/';
var Apimap = {
    loginApi: apiPerfix + 'open-api/login',
    registApi: apiPerfix + 'open-api/regist',
    provincesListApi: apiPerfix + 'open-api/get/provinces-list',
    citiesListApi: apiPerfix + 'open-api/get/cities-list',
    addressesListApi: apiPerfix + 'open-api/get/addresses-list',
    postDatingApi: apiPerfix + 'action/post/dating',
    requestDatingApi: apiPerfix + 'action/request/dating',
    acceptDatingApi: apiPerfix + 'action/accept/dating'
};

module.exports = Apimap;
