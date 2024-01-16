<template>
    <div class="otherDetail">
        <t-card :title="`昵称:${user.nickname}`" :description="`学校:${user.school}`" :style="{ width: '400px' }">
            <template #avatar>
                <t-avatar :image="user.avatar" size="56px"></t-avatar>
            </template>
            <template #actions>
                账号:{{ user.account }}
            </template>
            <template #footer>
                电话号码:{{ user.mobile }}
            </template>
        </t-card>
    </div>
</template>
<script setup lang="ts">
import type { LoginRes } from '~/myTypes/user';
import myPost from '~/utils/http';

//获取其他用户信息
const user = ref<LoginRes>({
    nickname: '',
    isAdmin: false,
    password: '',
    mobile: '',
    account: '',
    avatar: '',
    school: '',
    id: ''
})
const route = useRoute();
const id = route.query.id as string;
const getUserDetail = async () => {
    const res = await myPost('/api/getUserDetail', id)
    // console.log(res.user)
    if (res.code == 200) {
        user.value = res.user
    }
}

onMounted(async () => {
    await getUserDetail()
})
</script>

<style>
.otherDetail {
    @apply flex justify-center items-center min-h-screen;
}
</style>