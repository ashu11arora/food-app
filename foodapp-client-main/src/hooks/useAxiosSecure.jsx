import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({//instance of axios
  baseURL: "http://localhost:6001",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();//etch logout function from useauth()->useconxt(authcontext);
  // Add a request interceptor
  axiosSecure.interceptors.request.use(//intersector used for req and response   (req mein add kr denge token ).(response if 404 aaya toh user ko logout kr denge)
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;//add token in request ke ander header h header ke ander authorization
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },

    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");//redirect to login page.
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;





/**
 * Sabse pehle, ek custom Axios instance axiosSecure create kiya gaya hai, jiska base URL http://localhost:6001 hai.
Phir, ek custom hook useAxiosSecure define kiya gaya hai, jo axios ke sath integrate kiya gaya hai. Is hook
 mein useNavigate hook bhi use kiya gaya hai jo React Router v6 ke saath aata hai.
Request aur response ke liye interceptors add kiye gaye hain:
Request Interceptor: Request bhejne se pehle, yeh interceptor access token ko localStorage se fetch karta hai 
(localStorage.getItem("access-token")) aur usse request ke headers mein authorization ke saath add karta hai
 (config.headers.authorization = 'Bearer ' + token). Isse har request ke saath token bheja ja sakta hai, jo server ke 
 authentication ke liye use hota hai.
Response Interceptor: Response milne ke baad, yeh interceptor response ko check karta hai. Agar koi response 401 
(Unauthorized) ya 403 (Forbidden) status code se aata hai, toh yeh user ko logout karata hai (logOut() function ko call karta hai
 jo useAuth hook se aata hai) aur fir use /login page par redirect karta hai (navigate("/login")).
Yeh custom hook useAxiosSecure create kiya gaya hai taaki secure API requests bhejne ke liye axios instance ko 
customize kiya ja sake. Isse authentication headers add kiye jate hain aur agar koi response unauthorized hota hai, 
toh user ko logout karke login page par redirect kiya jaata hai.
 */