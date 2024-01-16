import { LoginRes } from "~/myTypes/user"
import { myRead } from "~/utils/readFile"

export default defineEventHandler(async (event) => {
    const id = await readBody(event)
    const userList: Array<LoginRes> = await myRead('user.json')
    const user = userList.find(user => user.id === id)
    return {
        user
    }
})