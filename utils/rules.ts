export const rules = {
    nickname: [
        { required: true, message: '昵称不能为空' },
        { min: 3, message: '昵称长度不能小于3' }
    ],

    school: [
        { required: true, message: '学校不能为空' }
    ],

    mobile: [
        { required: true, message: '手机号不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
    ],

    account: [
        { required: true, message: '账号不能为空' },
        { minLength: 5, message: '账号长度不能小于5' }
    ],

    password: [
        { required: true, message: '密码不能为空' },
        { min: 6, message: '密码长度不能小于6' }
    ],

    avater: [
        { required: true, message: '请上传正确格式的头像' }
    ],

};