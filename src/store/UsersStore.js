import { makeAutoObservable } from "mobx";

export default class UsersStore {
    constructor() {
        this._users = [];
        makeAutoObservable(this);
    }

    set users(users) {
        this._users = users
    }
    
    get users() {
        return this._users
    }
}
