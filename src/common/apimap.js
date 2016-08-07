var apiPerfix = window.location.protocol + '//'+window.location.host+'/';
if(window.location.hostname === 'w.yuema.us') {
    apiPerfix = window.location.protocol + '//www.yuema.us/';
}
var Apimap = {
    loginApi: apiPerfix + 'open-api/login', // 登录
    registApi: apiPerfix + 'open-api/simple-regist', // 注册
    perfectApi: apiPerfix + 'action/user/update', // 完善信息
    provincesListApi: apiPerfix + 'open-api/query/provinces-list',
    citiesListApi: apiPerfix + 'open-api/query/cities-list',
    addressesListApi: apiPerfix + 'open-api/query/addresses-list',
    postDatingApi: apiPerfix + 'action/dating/post', // 发起约会
    requestDatingApi: apiPerfix + 'action/dating/request', // 请求约会
    acceptDatingApi: apiPerfix + 'action/dating/accept', // 接受约会
    listApi: apiPerfix + 'open-api/query/dating/dating-list', // 约会列表
    profileApi: apiPerfix + 'open-api/query/home-info', // 个人页信息
    myRequestApi: apiPerfix + 'action/query/dating/my-request-dating-list', // 我回应的约会列表
    datingDetailApi: apiPerfix + 'open-api/query/dating/dating-info', // 约会详情
    chatRecordsApi: apiPerfix + 'action/query/message/message-list', // 聊天记录
    chatListApi: apiPerfix + 'action/query/chatting/my-chatting-list' // 消息列表
}; 

module.exports = Apimap;
