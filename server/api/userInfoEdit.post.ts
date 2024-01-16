import { LoginRes } from "~/myTypes/user"
import { myRead } from "~/utils/readFile"
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { realPath } from "~/utils/realPath";

export default defineEventHandler(async (event) => {
    const { id, avatar, account, nickname, school, password, mobile } = await readBody(event)
    const userList: Array<LoginRes> = await myRead('user.json')

    const userIndex = userList.findIndex(user => user.id === id)
    if (userIndex !== -1) {
        userList[userIndex] = {
            ...userList[userIndex],
            avatar,
            account,
            nickname,
            school,
            password,
            mobile
        }
        try {
            await writeFile(resolve(realPath), JSON.stringify(userList, null, 2)); // 写入数据
            return {
                code: 200,
                status: 'success',
                msg: '修改成功',
            }
        } catch (err) {
            return {
                code: 500,
                status: 'fail',
                msg: '修改json失败',
                err
            }

        }

    }
    else {
        return {
            code: 500,
            status: 'fail',
            msg: '修改失败'
        }
    }

})