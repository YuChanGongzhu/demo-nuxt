<template>
    <div>
        <t-list :split="true" v-for="item in userList" :key="item.id">
            <t-list-item v-if="item.id != id">
                <t-list-item-meta :image="item.avatar" :title="item.nickname" :description="item.school" />
                <template #action>
                    <t-button theme="danger" @click="deleteUser(item.id)">
                        <EditOffIcon />
                    </t-button>
                    <t-button variant="text" shape="square" @click="editUserInfo(item.id)">
                        <Edit2Icon />
                    </t-button>
                </template>
            </t-list-item>
        </t-list>

        <t-dialog header="修改个人信息" :visible="dialogVisible" :on-close="closeDialog" :on-confirm="onSubmitEdit">
            <template #body>
                <t-avatar :image="newUser.avatar" />
                <label for="fileInput" class="custom-file-input-label">选择文件</label>
                <input id="fileInput" class="custom-file-input" type="file" @change="handleFileChange" />
                <t-form ref="newFormRef" :data="newUser" :rules="rules" :colon="true" :label-width="0"
                    @submit="handleFormSubmit">
                    <t-form-item name="nickname">
                        昵称：
                        <t-input v-model="newUser.nickname" clearable placeholder="请输入昵称">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="school">
                        学校：
                        <t-input v-model="newUser.school" clearable placeholder="请输入学校">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="mobile">
                        手机号码：
                        <t-input v-model="newUser.mobile" clearable placeholder="请输入手机号码">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="account">
                        账号：
                        <t-input v-model="newUser.account" clearable placeholder="请输入账号">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="password">
                        密码：
                        <t-input v-model="newUser.password" clearable placeholder="请输入密码">
                        </t-input>
                    </t-form-item>
                </t-form>
            </template>
        </t-dialog>

        <t-dialog :visible="deleteVisible" header="是否删除用户" :on-close="closeDelete" :on-confirm="deleteUserComfirm">
            <template #body>
                删除
            </template>
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import myGet from '~/utils/httpGet'
import { Edit2Icon, EditOffIcon } from 'tdesign-icons-vue-next';
import type { LoginRes, RegisterRes } from '~/myTypes/user';

//获取所有用户数据
const userList = ref<LoginRes[]>([])
const route = useRoute();
const id = route.query.id as string;
const getAllUser = async () => {
    const res = await myGet('/api/allUser')
    userList.value = JSON.parse(res.res)
}

//获取单个用户的信息
const findUser = async (id: string) => {//展示用户信息
    const res = await myPost('/api/getUser', id)
    user.value = res.user
}
//新旧user
const user = ref<RegisterRes>({
    id: '',
    school: '',
    avatar: '',
    account: '',
    password: '',
    mobile: '',
    isAdmin: false
})
const newUser = ref({ ...user.value });
watch(user, (newValue) => {
    newUser.value = { ...newValue };
}, { deep: true });

const editUserInfo = (id: string) => {
    dialogVisible.value = true
    findUser(id)
}
//弹框修改信息
const dialogVisible = ref(false);
const closeDialog = () => {
    dialogVisible.value = false
    newUser.value = user.value
};
import { rules } from '~/utils/rules'
import myPost from '~/utils/http';
import { MessagePlugin } from 'tdesign-vue-next';

//弹框出来
const newFormRef = ref()
const onSubmitEdit = async () => {
    newFormRef.value?.submit()
}
//提交弹框表单
const handleFormSubmit = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        const res = await myPost('/api/userInfoEdit', newUser.value)
        await findUser(id)
        if (res.code == 200) {
            MessagePlugin.success('用户信息修改成功')
        }
        dialogVisible.value = false;

    } else {
        console.log('错误: ', validateResult);
        MessagePlugin.warning(firstError);
    }

}
//修改用户头像
const handleFileChange = (e: any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
        newUser.value.avatar = reader.result as string;
    };
}


//删除用户
const deleteVisible = ref(false)
const deleteUserId = ref<string>('')
const deleteUser = (id: string) => {
    deleteVisible.value = true
    deleteUserId.value = id
}
const deleteUserComfirm = async () => {
    const res = await myPost('/api/userDelete', deleteUserId.value)
    if (res.code == 200) {
        MessagePlugin.success(
            '用户删除成功'
        )
    } else {
        MessagePlugin.warning('用户删除失败')
    }
    await getAllUser()
    deleteVisible.value = false
}
const closeDelete = () => {
    deleteVisible.value = false
}


onMounted(async () => {
    await getAllUser()
})
</script>
  