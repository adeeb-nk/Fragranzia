import { useEffect } from "react";
// import Swal from "sweetalert2";
// import useAuth from "./useAuth";
import { axiosPrivate } from "../axios";


const useAxiosPrivate = () => {
    // const { auth, setAuth } = useAuth();



    useEffect(() => {
        axiosPrivate.interceptors.request.use(                                               //request part
            config => {
                if (config.data instanceof FormData) {
                    config.headers["Content-Type"] = "multipart/form-data";
                  } else {
                    config.headers["Content-Type"] = "application/json";
                  }

                if (!config.headers['Authorization']) {
                    // config.headers['Authorization'] = `Token ${auth?.accessToken}`;
                    // config.headers['Authorization'] = auth?.accessToken;
                    config.headers['Authorization'] = localStorage.getItem("token");
                }



                return config;
            },
            error => {
                return Promise.reject(error)
            }
        );

        axiosPrivate.interceptors.response.use(                                           //response part(respomse from backend reach here, ividen axiosservice kk povum avidenn front end kk)
            response => {
                return response
            },
           async error => {
 

                return Promise.reject(error)
            }
        );
    // }, [auth])
    }, [])

    return axiosPrivate
}

export default useAxiosPrivate;