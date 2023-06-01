import { BASE_URL } from "./base_url";
import axios from 'axios';

export const getAll = async()=>{
    let globalData;
    await axios.get(`${BASE_URL}/api/employees`)
    .then((res)=>{
        globalData = res.data;
    })
    return globalData;
}
export const deleteEmp = (id)=>{
    axios.delete(`${BASE_URL}/api/employees/${id}`);
}
export const postEmp = (payload)=>{
    axios.post(`${BASE_URL}/api/employees`,payload);
}