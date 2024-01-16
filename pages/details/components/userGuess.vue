<template>
    <div>
        <h1>其他用户推荐</h1>
        <t-list :split="true" v-for="item in userList" :key="item.id">
            <t-list-item v-if="item.id !== id">
                <t-list-item-meta :image="item.avatar" :title="item.nickname" :description="item.school" />
                <template #action>
                    <t-button variant="text" shape="square" @click="onSeeUserDetail(item.id)">
                        <LookAroundIcon />
                    </t-button>
                </template>
            </t-list-item>
        </t-list>
    </div>
</template>

<script setup lang="ts">
import myGet from '~/utils/httpGet'
import { LookAroundIcon } from 'tdesign-icons-vue-next';
import type { LoginRes } from '~/myTypes/user';

//获取所有用户数据
const userList = ref<LoginRes[]>([])
const route = useRoute();
const id = route.query.id as string;
const getAllUser = async () => {
    const res = await myGet('/api/allUser')
    userList.value = JSON.parse(res.res)
    console.log(userList.value)
}

//查看其他用户详情
const onSeeUserDetail = async (id: string) => {//不能这样？？？
    const router = useRouter()
    router.push({ path: '/otherDetail/otherDetail', query: { id } });
    // navigateTo('/otherdetail/otherdetail')
}

onMounted(async () => {
    await getAllUser()
})
</script>
  