import {action, observable } from 'mobx';
import { BASE_URL } from 'utils';
import axios from 'axios';

import { Error, User } from 'types';

class UserStore {

    constructor() {
        this.token = localStorage.getItem("token");
    }

    @observable token: string|null = null;
    @observable loading: boolean = false;
    @observable user: User|null = null;

    // null allows for 3 states of a single variable
    @observable isAuthenticated: boolean|null = null;
    @observable errors: Error|null = null; 

    @action
    setAuthenticated(bool: boolean): void {
        this.isAuthenticated = bool;
    }

    @action
    setLoading(bool: boolean): void {
        this.loading = bool;
    }

    @action
    setErrors(data: Error|null) {
        this.errors = data;
    }

    @action 
    getUser() {
        console.log(this.token);
        axios.get(`${BASE_URL}/auth/user/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`
            }
        })
        .then(resp => {
            this.setAuthenticated(true);
            this.user = resp.data;
        })
        .catch(error => {
            // invalidate the token
            console.log('here')
            this.token = null;
            localStorage.removeItem("token");
            this.setAuthenticated(false);
        })
    }

    @action
    getLogs(): any {
       return axios.get(`${BASE_URL}/lifting/logs/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    @action
    newLog(name: string) {
        let data = {
            name: name,
            owner: this.user?.pk
        }
        return axios.post(`${BASE_URL}/lifting/logs/`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`
            },

        })
        .catch(error => {
            console.log(error);
        })
    }

    @action
    getLifts(): any {
        return axios.get(`${BASE_URL}/lifting/lifts/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${this.token}`
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    @action
    login(username: string, password: string): void {
        this.setLoading(true);
        axios(`${BASE_URL}/auth/login/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        })
        .then(resp => {
            this.token = resp.data.key;
            localStorage.setItem("token", resp.data.key);
            this.setLoading(false);
            this.setErrors(null);
            this.getUser();
        })
        .catch(error => {
            this.setErrors(error.response.data);
            this.setLoading(false);
        })
    }
}

export default new UserStore();