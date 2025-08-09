import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://cse-2100-project-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;