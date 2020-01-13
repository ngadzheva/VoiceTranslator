type HTTPMethod = 'GET' | 'POST';

const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
};
  
async function sendRequest(url: string, key: string, method: HTTPMethod, data?: any, options?: any): Promise<any> {
    let requestOptions = { method, ...headers, ...options };
  
    if (data) {
      requestOptions = {
        ...requestOptions,
        body: JSON.stringify(data),
      };
    }
  
    const response = await fetch(`${url}key=${key}`, requestOptions);
  
    return response.json();
}

export async function getRequest(path: string, options?: any): Promise<any> {
    return sendRequest(path, 'GET', null, options);
}

export async function postRequest(url: string, key: string, data: any, options?: any): Promise<any> {
  return sendRequest(url, key, 'POST', data, options);
}  
  