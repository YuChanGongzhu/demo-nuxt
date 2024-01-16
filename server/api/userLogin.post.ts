//登录接口

import { LoginRes } from "~/myTypes/user"
import { myRead } from "~/utils/readFile"
import { generateToken } from "~/utils/token"

export default defineEventHandler(async (event) => {
    const req = await readBody(event)
    const userList: Array<LoginRes> = await myRead('user.json')
    const hasUser = userList.find(user => JSON.stringify(user.account) === JSON.stringify(req.account) && JSON.stringify(user.password) === JSON.stringify(req.password))
    let id, isAdmin
    if (hasUser) {
        id = hasUser.id
        isAdmin = hasUser.isAdmin
        const token = generateToken(id)
        return {
            code: 200,
            status: 'success',
            msg: '登录成功',
            id,
            token,
            isAdmin
        }
    } else {
        return {
            code: 500,
            status: 'error',
            msg: '登录失败'
        }
    }
})
