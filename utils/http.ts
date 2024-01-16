const myPost = async (url: string, data: any) => {
    const requestOptions: RequestInit = {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',

    };
    const response = await fetch(url, requestOptions);
    const res = await response.json()
    return res
}
export default myPost
