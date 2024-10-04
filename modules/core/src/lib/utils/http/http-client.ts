import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import FileSaver from 'file-saver';

export const axiosInstance = axios.create({
  baseURL: '',
  headers: { 'Cache-Control': 'no-cache, private', Expires: 0 },
});

function AuthRequestTransformer(config = {} as AxiosRequestConfig, isUnAuthRequest = false, noHeaders = false) {
  // Clone the config to avoid modifying the original object
  const newConfig = { ...config };
  const token = sessionStorage.getItem('accessToken');

  if (isUnAuthRequest) {
    // Define a new transformRequest function
    newConfig.transformRequest = [
      (data: any, headers: AxiosRequestHeaders) => {
        // Safely check and delete the Authorization header
        if (headers) {
          delete headers['Authorization'];
        }
        return data;
      },
      ...(Array.isArray(config.transformRequest) ? config.transformRequest : [config.transformRequest ?? ((data) => data)]),
    ];
  } else if (noHeaders) {
    // Define a new transformRequest function for noHeaders scenario
    newConfig.transformRequest = [
      (data: any, headers: AxiosRequestHeaders) => {
        if (headers) {
          headers['Cache-Control'] = 'private, max-age=86400';
          delete headers['Pragma'];
          delete headers['Expires'];
        }
        return data;
      },
      ...(Array.isArray(config.transformRequest) ? config.transformRequest : [config.transformRequest ?? ((data) => data)]),
    ];
  } else {
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Return the modified copy of the config
  return newConfig;
}

/*
    NOTE: DO NOT ADD one off methods to this API.
    Use the axiosInstance or the config param of the respective API to extend your functionality.
 */
export const HttpClient = {
  get: <T>(url: string, config: AxiosRequestConfig<T> = axiosInstance.defaults as AxiosRequestConfig<T>, noAuth = false, noHeaders = false) => {
    return axiosInstance.get<T>(url, AuthRequestTransformer(config, noAuth, noHeaders) as AxiosRequestConfig<T>);
  },

  post: <T>(url: string, data?: any, config: AxiosRequestConfig<T> = axiosInstance.defaults as AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.post<T>(url, data, AuthRequestTransformer(config, noAuth) as AxiosRequestConfig<T>);
  },

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.put<T>(url, data, AuthRequestTransformer(config, noAuth) as AxiosRequestConfig<T>);
  },

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.patch<T>(url, data, AuthRequestTransformer(config, noAuth) as AxiosRequestConfig<T>);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.delete<T>(url, config);
  },

  upload: <T>(url: string, data?: any, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.postForm<T>(url, data, AuthRequestTransformer(config, noAuth) as AxiosRequestConfig<T>);
  },

  // NOTE: For GET pass config = { method: 'GET' }
  download: <T>(url: string, data: any, config?: AxiosRequestConfig<T>, noAuth = false, downloadDoc = true) => {
    return axiosInstance<T>(url, { method: 'POST', data: data, responseType: 'blob', ...AuthRequestTransformer(config, noAuth) }).then((response) => {
      const matches = response.headers['content-disposition'].match(/filename\s*=(.*)/) || 'file';

      if (matches && downloadDoc) {
        FileSaver.saveAs(response.data as Blob, matches[1]);
      }

      return response;
    });
  },

  getDocument: <T>(url: string, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.get<T>(url, { responseType: 'blob', ...AuthRequestTransformer(config, noAuth) });
  },

  getBASE64Document: <T>(url: string, config?: AxiosRequestConfig<T>, noAuth = false) => {
    return axiosInstance.get<T>(url, { responseType: 'arraybuffer', responseEncoding: 'base64', ...AuthRequestTransformer(config, noAuth), ...config });
  },
};
