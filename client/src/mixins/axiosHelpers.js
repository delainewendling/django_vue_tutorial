import Vue from 'vue';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const axiosHelpers = {
    getRequest(url) {
        return new Promise (function (resolve, reject) {
            axios.get(url, {withCredentials: true})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        })
    },
    postRequest(url, data) {
        return new Promise (function (resolve, reject) {
            axios.post(url, data, {withCredentials: true})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        })
    },
    deleteRequest(url) {
        return new Promise (function (resolve, reject) {
            axios.delete(url, {withCredentials: true})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        })
    },
    putRequest(url, data) {
        return new Promise (function (resolve, reject) {
            axios.put(url, data, {withCredentials: true})
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        })
    }
}

export { axiosHelpers };