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