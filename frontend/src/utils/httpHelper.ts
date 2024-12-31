type httpObjType = {
    body?: {
        email?: FormDataEntryValue,
        password?: FormDataEntryValue,
        message?: string, 
    },
    endpoint: string,
    method: string,
}

const httpHelper = async (httpObj: httpObjType) => {
    const baseUrl = "http://localhost:9000/api"
    let response;
    let result;
    try {
        switch (httpObj?.method) {
            case 'GET':
                response = await fetch(`${baseUrl}${httpObj?.endpoint}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                result = await response.json();
                break;
            case 'POST':
                response = await fetch(`${baseUrl}${httpObj?.endpoint}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(httpObj?.body),
                });
                result = await response.json();
                break;
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
            default:
                break
        }
    } catch (err) {
        console.log(err);
    }
    return result;
}

export default httpHelper;