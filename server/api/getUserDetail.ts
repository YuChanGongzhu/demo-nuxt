import { LoginRes } from "~/myTypes/user";
import { myRead } from "~/utils/readFile";

function desensitizeMobile(mobile: string): string {
    return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export default defineEventHandler(async (event) => {
    const id = await readBody(event);
    const userList: Array<LoginRes> = await myRead('user.json');
    const user = userList.find(user => user.id === id);

    if (user) {
        user.id = "can't tell you"
        user.mobile = desensitizeMobile(user.mobile);
        user.password = 'unknown';
    }
    return {
        code: 200,
        user
    };
});
