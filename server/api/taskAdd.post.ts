import { userTaskStore } from "~/compasable/store"
import { Task } from "~/myTypes/task"
//用不了
export default defineEventHandler(async (event) => {
    const { title, description, ddl, completed } = await readBody(event)
    const task: Task = {
        id: Date.now().toString(),
        title,
        description,
        ddl,
        completed
    }
    //使用pinia
    try {
        const taskStore = userTaskStore()
        taskStore.addTask(task)//value???
        return {
            code: 200,
            status: '任务添加成功',
            // taskId: task.id
        }
    } catch (error) {
        return {
            code: 500,
            status: '添加失败',
            error
        }
    }
})