import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css';
import Toast from 'react-bootstrap/Toast'

class LoadedToast extends Component{

    state = {
        visible: false
    }

    componentDidMount() {
        this.setState({visible: this.props.visible})
    }


    render() {
        return (
            <div>
                <Toast show={this.props.visible} delay={300} autohide={true}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </div>
        );
    }


}
export default LoadedToast;