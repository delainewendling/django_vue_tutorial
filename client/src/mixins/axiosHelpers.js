import Vue from 'vue';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const axiosHelpers = {
    getRequest(url) {
        return axios.get(url, {withCredentials: true})
    },
    postRequest(url, data) {
        return axios.post(url, data, {withCredentials: true})
    },
    deleteRequest(url) {
        return axios.delete(url, {withCredentials: true})
    },
    putRequest(url, data) {
        return axios.put(url, data, {withCredentials: true})
    }
}

export { axiosHelpers };