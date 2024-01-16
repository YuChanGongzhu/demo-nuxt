import { LoginRes } from "~/myTypes/user";
import { myRead } from "~/utils/readFile";
import { writeFile } from 'fs/promises';
import { resolve } from 'path'
import { realPath } from "~/utils/realPath"

export default defineEventHandler(async (event) => {
    const id = await readBody(event);
    const userList: Array<LoginRes> = await myRead('user.json');

    const userIndex = userList.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        userList.splice(userIndex, 1); // 删除指定索引的用户
        try {
            await writeFile(resolve(realPath), JSON.stringify(userList, null, 2));
            return { code: 200, status: 'success', msg: '用户删除成功' };
        } catch (err) {
            return { code: 500, status: 'fail', msg: '删除失败', err };
        }
    } else {
        return { code: 500, status: 'fail', msg: '未找到用户' };
    }
});
