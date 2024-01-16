import { readFile } from 'fs/promises';
import { resolve } from 'path';
export const myRead = async (file: string) => {
    const filePath = resolve(`C:/Users/ivy/Desktop/restarter-3/public/${file}`); // 确定文件路径
    const fileContents = await readFile(filePath, 'utf8'); // 读取文件
    const data = JSON.parse(fileContents); // 解析 JSON
    return data;
}
