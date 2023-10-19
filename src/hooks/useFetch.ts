// Employ Facade Design Pattern to isolate fetch API

interface HttpMethods {
    get: (
        url: string
    ) => Promise<any>
}

export const useFetch = () : HttpMethods => {

  async function get(
        url: string,
    ) : Promise<any> {
      return await fetch(url);
  }

  return {get};
};
