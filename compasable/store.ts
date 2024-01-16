import { defineStore } from 'pinia'
import type { Task } from '~/myTypes/task'

export const userTaskStore = defineStore('taskStore', {
    state: () => {
        return {
            taskList: [] as Task[],
        }

    },
    actions: {
        addTask(task: Task) {
            this.taskList.push(task)
        },
        deleteTaskById(id: string) {
            const index = this.taskList.findIndex(task => task.id === id);
            if (index !== -1) {
                this.taskList.splice(index, 1);
            }
        }
    }
})