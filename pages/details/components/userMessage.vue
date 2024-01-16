<template>
    <div>
        <t-card :title="user.nickname" :description="user.school" :style="{ width: '400px' }">
            <template #avatar>
                <t-avatar :image="user.avatar" size="56px"></t-avatar>
            </template>
            <template #actions>
                <t-button shape="circle" theme="primary" @click="dialogVisible = true">
                    <template #icon>
                        <Edit2Icon />
                    </template>
                </t-button>
            </template>
            <template #footer>
                今天你心情好吗？
            </template>
        </t-card>

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
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RegisterRes } from '~/myTypes/user';
import { Edit2Icon } from 'tdesign-icons-vue-next';
import myPost from '~/utils/http';
import { MessagePlugin } from 'tdesign-vue-next';
//页面传递userId
const route = useRoute();
const id = route.query.id as string;
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

//弹框修改信息
const dialogVisible = ref(false);
const closeDialog = () => {
    dialogVisible.value = false
    newUser.value = user.value
};
import { rules } from '~/utils/rules'

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
            MessagePlugin.success('个人信息修改成功')
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

onMounted(async () => {
    await findUser(id)
})

</script>


