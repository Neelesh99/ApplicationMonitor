import React, {Component} from "react"
import Headliner from "./Headliner";
import UrlList from "./UrlList";
import ProgressBarLoc from "./ProgressBarLoc";
import Axios from "axios";
import FetchWebPage from "./FetchWebPage";
import CheckForStatus from "./CheckForStatus";
import UserDataBase from "./UserDataBase"
import LoadedToast from "./LoadedToast";

const firebase =require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCryoT5jDaSm04S_MOQYRZfu_zld-3YdKA",
    authDomain: "applicationmonitor-ffb62.firebaseapp.com",
    databaseURL: "https://applicationmonitor-ffb62.firebaseio.com",
    projectId: "applicationmonitor-ffb62",
    storageBucket: "applicationmonitor-ffb62.appspot.com",
    messagingSenderId: "955150365867",
    appId: "1:955150365867:web:259d462495d2fa4f73b3ee",
    measurementId: "G-E7NWF91ZLW"
});

var db =firebase.firestore();

class Wrapper extends Component{
    state = {
        Dab: db,
        urlList: ["https://www.goldmansachs.com/careers/students/programs/emea/new-analyst-programme.html"],
        currentValue: "None",
        checkedList: ["Not Checked"],
        progress: 0.0,
        max: 1,
        userKey: "None",
        showToast: false,
        saveName: "None"
    };

    render(){
        return(
            <div>
                <Headliner/>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Application site url" onChange={(e) => this.handleChange(e)}
                           aria-label="ApplicationUrl" aria-describedby="button-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-info" type="button" id="button-addon2" onClick={() => this.addToList()}>Submit
                            </button>
                        </div>
                </div>
                <UrlList urlList={this.state.urlList} checkedList={this.state.checkedList}/>
                <button type="button" className="btn btn-primary btn-lg btn-block mt-4" onClick={() => this.checkUrls()}>Check</button>
                <ProgressBarLoc progressVal={this.state.progress}/>
                <div className="input-group mt-3">
                    <input type="text" className="form-control" placeholder="Enter User Key" onChange={(e) => this.handleKeyChange(e)}
                           aria-label="ApplicationUrl" aria-describedby="button-addon3"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" type="button" id="button-addon3" onClick={() => this.getUserData()}>Get saved urls
                        </button>
                    </div>
                </div>
                <div className="input-group mt-3">
                    <input type="text" className="form-control" placeholder="Save User Key" onChange={(e) => this.handleNameChange(e)}
                           aria-label="ApplicationUrl" aria-describedby="button-addon3"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" type="button" id="button-addon3" onClick={() => this.setUserData()}>Save urls
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    addToList(){
        var previousList = this.state.urlList;
        previousList.push(this.state.currentValue)
        var previousCheck = this.state.checkedList;
        previousCheck.push("Not Checked")
        let newMax = this.state.max + 1;
        this.setState({urlList: previousList, checkedList: previousCheck, max: newMax});
    }

    handleChange(value){
        this.setState({currentValue: value.target.value});
    }

    handleKeyChange(value){
        this.setState({userKey: value.target.value});
    }

    handleNameChange(value){
        this.setState({saveName: value.target.value});
    }

    getUserData(){
        var userKey = this.state.userKey;
        let vx = new UserDataBase(db);
        vx.getProfile(userKey).then(urls => {
            this.setState({urlList: urls, max: urls.length, checkedList: new Array(urls.length).fill("Not Checked"), showToast: true});
        })
    }

    setUserData(){
        let vx = new UserDataBase(db);
        vx.createProfile(this.state.urlList, this.state.saveName)
    }

    checkUrls(){
        var checkList = this.state.checkedList;
        this.state.urlList.map(
            (x,i) => {
                this.handleFetchOp(x).then( (t) => {
                    if (t) {
                        checkList[i] = "Open"
                    }
                    else{
                        checkList[i] = "Not Open Yet"
                    }
                    let calc = this.state.progress + 1.0/this.state.max;
                    this.setState({checkedList: checkList, progress: calc})
                    }
                )
            }
        )

    }

    handleFetchOp(url){
        return FetchWebPage.getValue(url).then(
            (data) => {return CheckForStatus.checkAll(data)}
        )
    }
}

export default Wrapper;