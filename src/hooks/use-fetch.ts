import axios from 'axios';

const _apiHost = 'http://www.omdbapi.com/?apikey=dd595e70';

const objectToQueryString = (obj: any) => {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
};

interface IRequestParams {
  method?: string;
  params: any;
}

const useFetch = async ({ method = 'GET', params }: IRequestParams) => {
  const options: any = {
    method,
    headers: { 'content-type': 'application/json' },
    url: _apiHost,
  };

  if (params) {
    if (method === 'GET') {
      options.url += '&' + objectToQueryString(params);
    } else {
      options.data = JSON.stringify(params);
    }
  }

  try {
    const response: any = await axios(options);
    if (response.status === 200) {
      return { payload: response.data };
    } else {
      throw new Error('Network Error');
    }
  } catch (err) {
    return { error: err.message };
  }
};

export default useFetch;
