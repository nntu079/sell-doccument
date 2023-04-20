import axios from "axios";

export const instance = axios.create({
  //baseURL: "http://localhost:5000",
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const instance2 = Axios.create();

const tokenKey = "auth-token";

const getToken = () => {
  return localStorage.getItem(tokenKey);
};

const setToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

const isTokenExpired = () => {
  const decoded = jwt_decode(getToken);
  return decoded.iat > Date.now();
};

const getRefreshedToken = () => {
  return instance2.post("/refresh_endpoint");
};

const refreshToken = async () => {
  const newToken = await getRefreshedToken();
  setToken(newToken);
};

instance2.interceptors.request.use(async (req) => {
  if (isTokenExpired()) {
    await refreshToken();
  }
});

//https://axios-http.com/docs/interceptors
//https://stackoverflow.com/questions/73257365/how-do-i-automatically-do-a-refresh-token-once-it-expired-with-react-query-axios
