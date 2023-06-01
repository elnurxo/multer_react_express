import { BASE_URL } from "./base_url";
import { axios } from "axios";

//get All Images
export const getAll = async()=>{
    let globalData;
    await axios.get(`${BASE_URL}/employees`)
    .then((res)=>{
        globalData = res.data;
    })
    return globalData
}

//post
export const post = async(payload)=>{
    axios.post(`${BASE_URL}/employees`,payload);

    return {
        data: payload,
        message: 'post success!'
    }
}