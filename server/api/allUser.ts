import { myRead } from "~/utils/readFile"

export default defineEventHandler(async () => {
    const req = await myRead('user.json')
    return {
        res: JSON.stringify(req)
    }
})