import { userTaskStore } from "~/compasable/store"
import type { Task } from "~/myTypes/task"
export const addOneTask = (task: Task) => {
    const taskStore = userTaskStore()
    taskStore.addTask(task)
    // console.log(taskStore.taskList)
}