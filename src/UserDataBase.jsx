import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css';
const firebase =require("firebase");
require("firebase/firestore");

class UserDataBase {
    constructor(database) {
        this.state.db = database
    }


    state = {
        db: null
    }

    createProfile(entries, username){
        let newDoc = {
            url: entries
        }
        let setDoc = this.state.db.collection("users").doc(username).set(newDoc)
    }

    getProfile(key){
        return this.state.db.collection("users").doc(key).get().then(doc => {
            return doc.data()["url"];
        })
    }


}
export default UserDataBase;