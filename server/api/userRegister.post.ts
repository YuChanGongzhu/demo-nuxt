import { LoginRes } from "~/myTypes/user";
import { writeFile, readFile } from 'fs/promises';
import { resolve } from 'path';
import { ref } from "vue";
import { myRead } from "~/utils/readFile";
import { realPath } from "~/utils/realPath";

export default defineEventHandler(async (event) => {
    const req = await readBody(event)
    const userList: Array<LoginRes> = await myRead('user.json')
    const hasUser = userList.some(user => JSON.stringify(user.account) === JSON.stringify(req.account))
    if (hasUser) {
        return {
            code: 500,
            status: 'fail',
            msg: '账号已存在',
        };
    } else {
        const existingData = ref<Array<LoginRes>>([]);
        const fileContents = ref<string>('')
        const id = Date.now().toString()
        const isAdmin = false
        try {
            //改一下？？？
            const filePath = resolve(realPath); // 文件路径
            fileContents.value = await readFile(filePath, 'utf8'); // 尝试读取文件
            if (!(fileContents.value === '')) {
                existingData.value = JSON.parse(fileContents.value); // 解析现有数据
            }
            existingData.value.push({ ...req, id, isAdmin })
            await writeFile(filePath, JSON.stringify(existingData.value, null, 2)); // 写入数据
        } catch (error) {
            return {
                code: 500,
                status: false,
                msg: '文件写入错误'
            };
        }
        return {
            code: 200,
            status: 'success',
            msg: '注册成功',
            id,
        }
    }
})
