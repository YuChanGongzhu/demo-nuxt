<template>
    <div>
        <t-space>
            <p>任务列表</p>
            <t-button size="small" @click="addTask">
                <template #icon>
                    <TaskAddIcon />
                </template>
            </t-button>
        </t-space>

        <t-dialog header="新增任务" :visible="dialogVisible" :on-close="closeDialog" :on-confirm="onSubmitEdit">
            <template #body>
                <t-form v-model="task" :colon="true" :label-width="0">
                    <t-form-item name="title">
                        名称：
                        <t-input v-model="task.title" clearable placeholder="请输入任务名称">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="description">
                        描述：
                        <t-input v-model="task.description" clearable placeholder="请输入任务描述 ">
                        </t-input>
                    </t-form-item>
                    <t-form-item name="ddl">
                        截止时间：
                        <t-input v-model="task.ddl" clearable placeholder="请输入任务截止时间">
                        </t-input>
                    </t-form-item>
                </t-form>
            </template>
        </t-dialog>

        <t-list v-for="item in taskList" :key="item.id">
            <t-list-item>
                <t-list-item-meta>
                    <template #description>
                        <t-checkbox v-model="item.completed">{{ item.title }}</t-checkbox>
                    </template>
                </t-list-item-meta>
                <template #action>
                    <t-row>
                        <t-space>
                            <p>截止时间:{{ item.ddl }}</p>
                            <t-button shape="circle" theme="primary" @click="deleteTask(item.id)">
                                <template #icon>
                                    <Delete1Icon />
                                </template>
                            </t-button>
                        </t-space>
                    </t-row>
                </template>
            </t-list-item>
        </t-list>

    </div>
</template>

<script setup lang="ts">
import { Delete1Icon, TaskAddIcon } from 'tdesign-icons-vue-next'
import { MessagePlugin } from 'tdesign-vue-next';
import type { Task } from '~/myTypes/task';
import { addOneTask } from '~/utils/addTask'
import { userTaskStore } from '~/compasable/store'
//新建任务
const task = ref<Task>({
    title: '新任务',
    description: '重要',
    ddl: "今天",
    id: ' ',
    completed: false
})

//任务栏表单
const dialogVisible = ref(false)
const addTask = () => {
    dialogVisible.value = true
}
const closeDialog = () => {
    dialogVisible.value = false
};
const onSubmitEdit = async () => {
    try {
        task.value.id = Date.now().toString()
        //防止数据篡改
        const newTask: Task = {
            title: task.value.title,
            description: task.value.description,
            ddl: task.value.ddl,
            id: Date.now().toString(),  // 生成新的 ID
            completed: task.value.completed
        };
        addOneTask(newTask)
        MessagePlugin.success('添加任务成功')
        dialogVisible.value = false;
    } catch (error) {
        MessagePlugin.error('添加任务失败')
        console.log(error)
    }
    getTaskList()
}

//获取任务列表
const taskList = ref<Task[]>([])
const getTaskList = () => {
    const taskStore = userTaskStore()
    const newTaskList = taskStore.taskList
    taskList.value = newTaskList
}

//删除任务
const deleteTask = (id: string) => {
    const taskStore = userTaskStore()
    taskStore.deleteTaskById(id)
}
//test???
const onTaskList = () => {
    const taskStore = userTaskStore()
    console.log('现在', taskStore.taskList)
}

onMounted(() => {
    getTaskList()
})

</script>
  