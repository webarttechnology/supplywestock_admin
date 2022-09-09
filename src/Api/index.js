import axios from "axios";
import * as c from "./constant";


// ? REGISTRATION API
export const admin_login = async (data) => {
    try {
        const url = c.ADMIN + "/login";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
}

// ? REGISTRATION API
export const forgot_password = async (data) => {
    try {
        const url = c.ADMIN + "/forgot-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
}


export const add_menufact = async (data, header) => {
    try {
        const url = c.MENUFACTURS;
        const res = await axios.post(url, data, {
            headers: JSON.parse(header),
          });
        //const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
}

export const menufacther_listing = async (header) => {
    try {
        const url = c.MENUFACTURS;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}

export const menufacther_delete = async (data, header) => {
    try {
        const url = c.MENUFACTURS + "/" + data;
        const res = await axios.delete(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const enquriys_list = async ( header) => {
    try {
        const url = c.ENQUIRIES ;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}

export const enquriys_approve = async (data,  header) => {
    try {
        const url = c.ENQUIRIES+ "/accept/" + data.userid + "/" + data.id;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}