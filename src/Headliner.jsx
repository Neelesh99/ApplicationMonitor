import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css';

class Headliner extends Component{
    state = {
        Title: "Application Status Monitoring",
        Description: "Hello, this simple web app is designed to help you keep tabs on what intern/graduate roles are open."
    };

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">{this.state.Title}</h1>
                <p className="lead">{this.state.Description}</p>
            </div>
        );
    }
}
export default Headliner;