export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export const fetchJSON = <T = {}>(
    url: string,
    method: Method = Method.GET,
    config: RequestInit = {}
): Promise<T> => processRequest<T>(url, method, config);

const DEFAULT_REQUEST_INIT: RequestInit = {
    cache: "default",
    credentials: "same-origin",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
};

const processRequest = <T>(
    url: string,
    method: Method,
    config: RequestInit = {}
): Promise<T> => {
    return <Promise<T>> fetch(url, {
        ...DEFAULT_REQUEST_INIT,
        method,
        ...config,
    })
        .then(checkStatus)
        .then(
            <A = any>(response: Response): Promise<A> =>
                response.status !== 204 ? response.json() : Promise.resolve("")
        );
};

const checkStatus = async (response: any) => {
    if (response.ok) {
        return response;
    } else {
        let body = await response.json();
        throw new Error(body.errorCode || response.statusText);
    }
};
