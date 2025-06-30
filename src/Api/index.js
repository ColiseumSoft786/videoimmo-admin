import axios from "axios";
import config from "./config/config";
import { handleResponseError } from "./errorHandling";
import { authAxiosInstance, pipelineAxiosInstance } from "./axiosInstance";

const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

const getAxiosInstance = (url) => {
  if (url?.startsWith(config.authUrl)) return authAxiosInstance;
  else if (url?.startsWith(config.pipelineUrl)) return pipelineAxiosInstance;
};

axios.interceptors.request.use(
  function (config) {
    // Modify the request before sending it
    // For example, you might want to add a token to the headers
    const token = localStorage.getItem("access_token");
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.endpoint = "/api/v1/openresearch/chat";
    }

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);
// Create a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    var originalRequest = error.config;

    if (error.response.status == 401) {
      // Token expired or invalid, redirect to login
      localStorage.clear();
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    // Any other error
    return Promise.reject(error);
  }
);


export const getAPI = async (url, tokenRequired = false) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };

  console.log("GET Request URL:", url);

  try {
    const headers = {
      Accept: "*/*",
    };

    // Add token if required
    if (tokenRequired) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["access-token"] = token; // Match backend expectation
      }
    }

    const resp = await axios.get(url, { headers });

    response.data = resp.data;
    response.error = false;
    response.message = "Success";
    response.headers = resp.headers;

    console.log("GET API Response:", response);
  } catch (ex) {
    console.error("GET API Error:", ex);
    response.error = true;
    response.message = ex?.response?.data?.message || "Request failed";
  }

  return response;
};
export const getUserHouseAPI = async (url, body, tokenRequired = false) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };

  console.log("FORCED GET Request URL:", url);
  console.log("FORCED GET Request Body:", body);

  try {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    if (tokenRequired) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["access-token"] = token;
      }
    }

    // Using axios.request to manually override method and attach data
    const resp = await axios.request({
      url,
      method: "get",
      headers,
      body, 
    });

    response.data = resp.data;
    response.error = false;
    response.message = "Success";
    response.headers = resp.headers;

    console.log("FORCED GET API Response:", response);
  } catch (ex) {
    console.error("FORCED GET API Error:", ex);
    response.error = true;
    response.message = ex?.response?.data?.message || "Request failed";
  }

  return response;
};


export const getAPITool = async (baseURL, endpoint, headers = {}) => {
  try {
    const accessToken = localStorage.getItem("access_token"); // Get token from localStorage

    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`, // Add Bearer token
        endpoint, // Sending endpoint in headers
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response of GET API TOOL KIT:", data);
    console.log("Endpoint:", endpoint);

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const postAPI = async (url, body, tokenRequired = false) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };

  console.log("URL AT POST API:", url);
  console.log("BODY AT POST API:", body);

  try {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    if (tokenRequired) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["access-token"] = token;
      }
    }

    const resp = await axios.post(url, body, { headers });

    response.data = resp.data;
    response.headers = resp.headers;
    response.error = false;
    response.message = "Success";

    console.log("POST API Response:", response);
  } catch (ex) {
    console.error("POST API Error:", ex);
    response.error = true;
    response.message = ex?.response?.data?.message || "Request failed";
  }

  return response;
};


export const patchAPI = async (url, body) => {
  try {
    var resp = await axios.patch(url, body);
    return resp;
  } catch (ex) {
    console.log(ex);
  }
};

export const deleteAPIReq = async (url) => {
  try {
    var resp = await axios.delete(url);
    return resp;
  } catch (ex) {
    console.log(ex);
  }
};

export const postAPIOpenReserch = async (url, body, chatId) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
  };
  const token = localStorage.getItem("access_token");

  let config = chatId
    ? {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "chat-id": chatId,
      },
      method: "POST",
      body: body,
    }
    : {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: body,
    };

  try {
    const resp = await fetch(url, config);
    response.data = resp;
    response.headers = resp.headers;
    response.error = !resp.ok;
    response.message = "Success";
    return response;
  } catch (error) {
    response.error = true;
    response.message = error.message || "Something went wrong";
  }

  return response;
};


export const getAPIFetch = async (url, tokenRequired = false) => {
  const access_token = getAccessToken();
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
  };
  let configBody = tokenRequired
    ? {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        endpoint: "/api/v1/openresearch/chat",
      },
      timeout: 100000,
    }
    : {
      method: "GET",
      headers: {
        endpoint: "/api/v1/openresearch/chat",
      },
      timeout: 100000,
    };

  await fetch(url, configBody)
    .then((res) => res.json())
    .then((data) => {
      response.data = data;
      response.error = false;
      response.message = "Success";
    })
    .catch((error) => {
      console.log(error, "YOOOO");
      response.error = true;
    });

  return response;
};

export const postAPIFetch = async (url, body, tokenRequired = false) => {
  const access_token = getAccessToken();
  // if (tokenRequired) {
  //   if (
  //     access_token == "" ||
  //     access_token == undefined ||
  //     access_token == null
  //   ) {
  //     console.log("token not provided");
  //   }
  // }
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };
  let configBody = tokenRequired
    ? {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: body,
    }
    : {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };
  console.log(url, response, configBody, "Calling API");

  await fetch(url, configBody)
    .then((res) => {
      response.headers = res.headers; // Capture the response headers
      return res.json(); // Parse the body as JSON
    })
    .then((data) => {
      response.data = data;
      response.error = false;
      response.message = "Success";
    })
    .catch((error) => {
      response.error = true;
      console.log(error, "YOOOOOOO");
    });
  return response;
};

// export const postAPIOpenReserchFetch = async (url, body, chatId) => {
//   const access_token = getAccessToken();
//   let response = {
//     error: false,
//     message: "Something went wrong",
//     data: "",
//     headers: {},
//   };
//   let configBody =
//     chatId != null && chatId != ""
//       ? {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//             "chat-id": chatId,
//           },
//           body: body,
//         }
//       : {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//           },
//           body: body,
//         };
//   await fetch(url, configBody)
//     .then((res) => {
//       response.headers = res.headers; // Capture the response headers
//       return res.json(); // Parse the body as JSON
//     })
//     .then((data) => {
//       response.data = data;
//       response.error = false;
//       response.message = "Success";
//     })
//     .catch((error) => {
//       response.error = true;
//       console.log(error);
//     });
//   return response;
// };

export const putAPI = async (url, body, tokenRequired = false) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };

  console.log("PUT Request URL:", url);
  console.log("PUT Request Body:", body);

  try {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    // Add token if required
    if (tokenRequired) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["access-token"] = token; // Match backend expectation
      }
    }

    const resp = await axios.put(url, body, { headers });

    response.data = resp.data;
    response.error = false;
    response.message = "Success";
    response.headers = resp.headers;

    console.log("PUT API Response:", response);
  } catch (ex) {
    console.error("PUT API Error:", ex);
    response.error = true;
    response.message = ex?.response?.data?.message || "Request failed";
  }

  return response;
};

export const put = async (url, body, headers = null) => {
  try {
    const access_token = getAccessToken();
    const config = {
      headers: {
        Authorization: access_token,
        ...headers,
      },
    };
    const response = await axios.put(url, body, config);
    if (response.status >= 200 && response.status < 300) {
      return { data: response.data, error: false };
    } else {
      return { error: true, message: response.data.message };
    }
  } catch (res) {
    if (res && res.response && res.response.data && res.response.data.message) {
      return { error: true, message: res.response.data.message };
    }
    return { error: true, message: "Something went wrong" };
  } finally {
  }
};




export const deleteAPI = async (url, body, tokenRequired = false) => {
  let response = {
    error: false,
    message: "Something went wrong",
    data: "",
    headers: {},
  };

  console.log("DELETE Request URL:", url);
  console.log("DELETE Request Body:", body);

  try {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    if (tokenRequired) {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["access-token"] = token;
      }
    }

    const config = {
      headers,
      data: body, // axios requires `data` field for DELETE body
    };

    const resp = await axios.delete(url, config);

    response.data = resp.data;
    response.error = false;
    response.message = "Success";
    response.headers = resp.headers;

    console.log("DELETE API Response:", response);
  } catch (ex) {
    console.error("DELETE API Error:", ex);
    response.error = true;
    response.message = ex?.response?.data?.message || "Request failed";
  }

  return response;
};

export const docDeleteAPI = async (url, body, chatId) => {
  // const axiosInstance = getAxiosInstance(url);
  try {
    const access_token = getAccessToken();

    if (!access_token) {
      console.error("Access token is missing!");
      return { error: true, message: "Access token missing" };
    }

    console.log("Deleting file with headers:", {
      Authorization: `Bearer ${access_token}`, // Ensure it's correctly formatted
      "chat-id": chatId, body
    });

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, // Ensure token format is correct
        "chat-id": chatId, // Ensure chat-id is included
        "Content-Type": "application/json", // Ensure JSON content type
      },
      data: body, // Required for DELETE requests with a body
    };

    const response = await axios.delete(url, config);
    const result = handleResponseError(response);

    if (result.error) {
      return { error: true, message: result.message };
    }
    return { data: result, error: false };
  } catch (res) {
    console.error("Error in DELETE request:", res?.response?.data || res);
    if (res?.response?.data?.message) {
      return { error: true, message: res.response.data.message };
    }
    return { error: true, message: "Something went wrong" };
  }
};


export const getAPIStream = async (url, onMessage) => {
  try {
    const access_token = getAccessToken();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: access_token,
      },
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser.");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      let splitData = buffer.split("data:");
      buffer = splitData.pop();

      for (let chunk of splitData) {
        const jsonData = chunk.trim();
        if (jsonData) {
          try {
            const parsedData = JSON.parse(jsonData);
            await new Promise((resolve) => setTimeout(resolve, 800));
            onMessage(parsedData);
          } catch (e) {
            console.error("Error parsing JSON data:", e);
          }
        }
      }
    }

    if (buffer.trim()) {
      try {
        const parsedData = JSON.parse(buffer.trim());
        onMessage(parsedData);
      } catch (e) {
        console.error("Error parsing final JSON data:", e);
      }
    }

    return { error: false };
  } catch (res) {
    if (res?.message) {
      if (res?.status === 401) {
        window.location.reload();
      }
      return {
        error: true,
        message: res.message,
        code: res.status,
      };
    }

    return {
      error: true,
      message: "Something went wrong",
      code: res?.status,
    };
  }
};

export const postAPIStream = async (
  url,
  data,
  onMessage,
  signal,
  onShimmering,
  onComplete
) => {
  try {
    const access_token = getAccessToken();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify(data),
    });
    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";
    let isCompleted = false;

    while (!isCompleted) {
      if (signal.aborted) {
        reader.cancel();
        break;
      }
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let splitData = buffer.split("\n\n");
      buffer = splitData.pop();

      for (let chunk of splitData) {
        if (chunk.startsWith("data: ")) {
          const jsonData = chunk.substring(6).trim();
          try {
            const parsedData = JSON.parse(jsonData);
            if (parsedData.status === "STARTED") {
              if (signal.aborted) {
                onShimmering("");
                reader.cancel();
                break;
              } else {
                await new Promise((resolve) => setTimeout(resolve, 50));
                onShimmering(parsedData);
              }
            } else {
              await new Promise((resolve) => setTimeout(resolve, 5));
              onMessage(parsedData);

              if (parsedData.status === "COMPLETED" || signal.aborted) {
                isCompleted = true;
                reader.cancel();
                break;
              }
            }
          } catch (e) {
            console.error("Error parsing JSON data:", e);
          }
        }
      }
    }
  } catch (error) {
    // onError(error);
  }
};
export const DeleteAPIFetch = async (url) => {
  let response = {
    error: false,
    data: "",
  };
  try {
    const resp = await axios.delete(url, {
      headers: {
        "Accept": "application/json",  // Ensure the correct header format
      },
    });

    response.error = false;
    response.data = resp.data;

    console.log("API Response:", response);
  } catch (error) {
    response.error = true;
    response.message =
      error.response?.data?.message || "Failed to delete chat history";
    console.error("API Error:", error.response);
  }

  return response;
};

export const patchAPIFetch = async (url, data) => {
  const access_token = getAccessToken();
  const config = {
    method: 'patch',
    url,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const response = await axios(config);
    return {
      error: false,
      message: 'Success',
      data: response.data,
    };
  } catch (error) {
    console.log(error, 'YOOOO');
    return {
      error: true,
      message: 'Something went wrong',
      data: '',
    };
  }
};
