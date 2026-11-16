import { useEffect } from "react";
// import Swal from "sweetalert2";
// import useAuth from "./useAuth";
import { axiosPrivate } from "../axios";


const useAxiosPrivate = () => {
    // const { auth, setAuth } = useAuth();



    useEffect(() => {
        const reqInterceptor = axiosPrivate.interceptors.request.use(                                               //request part
            config => {
                if (config.data instanceof FormData) {
                    config.headers["Content-Type"] = "multipart/form-data";
                } else {
                    config.headers["Content-Type"] = "application/json";
                }

                const token = localStorage.getItem("token");
                if (token && !config.headers['Authorization']) {
                    config.headers['Authorization'] = token;
                }

                return config;
            },
            error => {
                return Promise.reject(error)
            }
        );

        const resInterceptor = axiosPrivate.interceptors.response.use(                                           //response part
            response => {
                return response
            },
            async error => {
                return Promise.reject(error)
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(reqInterceptor);
            axiosPrivate.interceptors.response.eject(resInterceptor);
        };
    }, [])

    return axiosPrivate
}

export default useAxiosPrivate;