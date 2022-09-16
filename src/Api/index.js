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

export const chatRoomlist = async (data, header) => {
    try {
        const url = c.CHATROOM + "/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const chatfeedShow = async (data, header) => {
    try {
        const url = c.CHAT + "/" + data;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}


export const admin_mailVerifi = async (data) => {
    try {
        const url = c.ADMIN + "/otp-verification/" + data.id + "/" +  data.otp;
        const res = await axios.get(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};


export const reset_password_buyer = async (data) => {
    try {
        const url = c.BUYER + "/reset-password";
        const res = await axios.post(url, data);
        return res;
    } catch (e) {
        return e.response;
    }
};

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
export const edit_menufact = async (data, header) => {
    try {
        const url = c.MENUFACTURS;
        const res = await axios.patch(url, data, {
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

export const menufacther_listing_id = async (data, header) => {
    try {
        const url = c.MENUFACTURS + "/" + data;
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

export const showAll_sellerData = async (header) => {
    try {
        const url = c.SELLERS;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}

export const showAll_buyerData = async (header) => {
    try {
        const url = c.BUYER;
        const res = await axios.get(url,{
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
}

// ? manufacturer_saller)by id
export const manufacturer_saller = async (data, header) => {
    try {
        const url = c.SELLERS + "/" + data;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? manufacturer_saller)by id
export const delete_saller = async (data, header) => {
    try {
        const url = c.SELLERS + "/" + data;
        const res = await axios.delete(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? manufacturer_saller)by id
export const delete_buyer = async (data, header) => {
    try {
        const url = c.BUYER + "/" + data;
        const res = await axios.delete(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? manufacturer_saller)by id
export const buyer_count = async (header) => {
    try {
        const url = c.BUYER + "/report/all/user/count";
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


export const seller_count = async (header) => {
    try {
        const url = c.SELLERS + "/report/all/user/count";
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? REGISTRATION API
export const changesPassword_buyer = async (data, header) => {
    try {
        const url = c.BUYER;
        const res = await axios.patch(url, data, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? manufacturer_saller)by id
export const menufactrher_count = async (header) => {
    try {
        const url = c.MENUFACTURS + "/all/count";
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? manufacturer_saller)by id
export const manufacturer_buyer = async (data, header) => {
    try {
        const url = c.BUYER + "/" + data;
        const res = await axios.get(url, {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};

// ? UPDATE BUYER
export const user_update_seller = async (data, header) => {
    try {
        const url = c.SELLERS;
        const res = await axios.patch(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};


// ? UPDATE BUYER
export const user_update_buyer = async (data, header) => {
    try {
        const url = c.BUYER;
        const res = await axios.patch(url, data , {
            headers: JSON.parse(header),
          });
        return res;
    } catch (e) {
        return e.response;
    }
};
