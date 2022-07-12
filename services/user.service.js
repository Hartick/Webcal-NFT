import axios from 'axios';

const server_url = process.env.server_url;

export async function getUser(wallet) {

    const response = await fetch(server_url + "/user/"+wallet);
    if(response.status != 200) {
        return null
    }
    return await response.json();
}

export async function updateUser(user) {
    const response = await axios.post(server_url + "/user/", user);
    if(response.status != 200) {
        return null
    }
    return response;
}