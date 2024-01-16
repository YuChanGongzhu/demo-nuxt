const myGet = async (url: string): Promise<any> => {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`Network response was not ok (${response.statusText})`);
    }
    const res = await response.json();
    return res;
}
export default myGet;
