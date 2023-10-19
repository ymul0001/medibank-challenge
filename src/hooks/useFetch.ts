// Employ Facade Design Pattern to isolate fetch API

interface HttpMethods {
    get: (
        url: string
    ) => Promise<any>
}

export const useFetch = () : HttpMethods => {

    async function get(
        url: string
    ) : Promise<any> {
        try {
            return await fetch(url);
        }
        catch (err) {
            throw err;
        }
    }

    return  { get };
}