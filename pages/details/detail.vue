<template>
    <div class="detail">
        <UserMessage class="userMessage" />
        <UserGuess class="userGuess" />
        <PersonTask class="personTask" />
    </div>
</template>
<script setup lang="ts">
import UserMessage from './components/userMessage.vue'
import UserGuess from './components/userGuess.vue';
import PersonTask from './components/personTask.vue'
</script>

<style lang="less">
.detail {
    @apply flex flex-col;


    .userMessage {
        @apply flex justify-center; // 使 userMessage 水平居中
        height: 20%;
        width: 100%; // 根据需要调整宽度
    }
}
</style>

