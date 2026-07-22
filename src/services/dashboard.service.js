import { axiosConfig } from "../helper/config";


export const getAllMasterDashboard = () => {
    return axiosConfig("get", `/v1/dashboard/index`);
}
