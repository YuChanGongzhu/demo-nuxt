export type BaseInfo = {//展示
    id: string,
    /** 用户学校 */
    school: string,
    /** 头像  */
    avatar: string,
    /** 账户名  */
    account: string,
    /** 昵称 */
    nickname?: string,

    isAdmin: boolean
}

export type LoginRes = BaseInfo & {
    password: string
    /** 手机号 */
    mobile: string,
}

export type RegisterRes = BaseInfo & {
    password: string
    mobile: string,
}