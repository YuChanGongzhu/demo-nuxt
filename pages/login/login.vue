<template>
    <div class="bg">
        <div class="tabs-container">
            <t-tabs class="tabs" :value="value" @change="handlerChange">
                <div>
                    <t-tab-panel value="login">
                        <template #label> <t-icon name="login" class="tabs-icon-margin" /> 登录 </template>
                        <t-form ref="formDataRef" :data="formData" :colon="true" :label-width="0" @reset="onReset"
                            @submit="onSubmitLogin">
                            <t-form-item name="account">
                                <t-input v-model="formData.account" clearable placeholder="请输入账户名">
                                    <template #prefix-icon>
                                        <desktop-icon />
                                    </template>
                                </t-input>
                            </t-form-item>
                            <t-form-item name="password">
                                <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
                                    <template #prefix-icon>
                                        <lock-on-icon />
                                    </template>
                                </t-input>
                            </t-form-item>
                            <t-form-item>
                                <t-button type="submit" block>登录</t-button>
                                <t-button type="reset" block>重置</t-button>
                            </t-form-item>
                        </t-form>
                    </t-tab-panel>
                </div>

                <t-tab-panel value="register">
                    <template #label> <t-icon name="user-add" class="tabs-icon-margin" /> 注册 </template>
                    <t-avatar :image="pic" />
                    <label for="fileInput" class="custom-file-input-label">选择文件</label>
                    <input id="fileInput" class="custom-file-input" type="file" @change="handleFileChange" />
                    <t-form ref="formRef" :rules="rules" :data="form" :colon="true" :label-width="0" @reset="onReset"
                        @submit="onSubmitRegister">
                        <t-form-item name="nickname">
                            <t-input v-model="form.nickname" clearable placeholder="请输入昵称">
                            </t-input>
                        </t-form-item>
                        <t-form-item name="school">
                            <t-input v-model="form.school" clearable placeholder="请输入学校">
                            </t-input>
                        </t-form-item>
                        <t-form-item name="mobile">
                            <t-input v-model="form.mobile" clearable placeholder="请输入手机号码">
                            </t-input>
                        </t-form-item>
                        <t-form-item name="account">
                            <t-input v-model="form.account" clearable placeholder="请输入账号">
                            </t-input>
                        </t-form-item>
                        <t-form-item name="password">
                            <t-input v-model="form.password" clearable placeholder="请输入密码">
                            </t-input>
                        </t-form-item>
                        <t-form-item>
                            <t-button type="submit" block>注册</t-button>
                            <t-button type="reset" block>重置</t-button>
                        </t-form-item>
                    </t-form>
                </t-tab-panel>

            </t-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import myPost from '~/utils/http'

onMounted(() => {
})

//切换tab登录注册
const value = ref('login');
const handlerChange = (newValue: any) => {
    value.value = newValue;
};

//登录
const formData = reactive({
    account: '',
    password: '',
});
//登录（成功则跳转）/重置
const onReset = () => {
    MessagePlugin.success('重置成功');
};
const onSubmitLogin = async () => {
    const res = await myPost('/api/userLogin', formData)
    if (res.code == 200) {
        MessagePlugin.success('登录成功');
        const router = useRouter();
        if (res.isAdmin) {
            router.push({ path: '/admin/admin', query: { id: res.id } })
        }
        else {
            router.push({ path: '/details/detail', query: { id: res.id } });
        }
        sessionStorage.setItem('token', res.token)
    } else {
        MessagePlugin.warning('账号不存在或密码错误')//需要修改
    }
};


//注册
const form = reactive({
    nickname: '',
    school: '',
    mobile: '',
    account: '',
    password: '',
    avatar: ''
});
//头像
const pic = ref('https://tdesign.gtimg.com/site/avatar.jpg')
const handleFileChange = async (e: any) => {
    pic.value = e.target.files[0];
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!(file!.type.startsWith('image/'))) {
        alert('请选择图片类型文件');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
        form.avatar = reader.result as string;
    };

}
//校验函数
import { rules } from '~/utils/rules'
//注册函数
const onSubmitRegister = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        const res = await myPost('/api/userRegister', form)
        if (res.code == 200) {
            MessagePlugin.success('注册成功');
        } else {
            MessagePlugin.warning('账号已存在')//需要修改
        }
    } else {
        console.log('错误: ', validateResult);
        MessagePlugin.warning(firstError);
    }
};



</script>
<style lang="less">
.bg {
    @apply bg-no-repeat bg-cover;
    background-image: url('../../public/bg.png');

    .tabs-container {
        @apply flex justify-center items-center h-screen;

        .tabs {
            @apply p-4 rounded-lg border border-gray-300;

            .tabs-icon-margin {
                margin-right: 4px;
            }

            .custom-file-input {
                @apply hidden;
            }

            .custom-file-input-label {
                @apply cursor-pointer inline-block p-2 border border-gray-300;
                color: blue;
            }
        }


    }

}
</style>
  