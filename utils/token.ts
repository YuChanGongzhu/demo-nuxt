import crypto from 'crypto';
export const generateToken = (id: string) => {
    const secret: string = 'your-secret-key'; // 保持安全性的秘钥
    const hash: string = crypto.createHmac('sha256', secret)
        .update(id.toString())
        .digest('hex');

    return hash;
}