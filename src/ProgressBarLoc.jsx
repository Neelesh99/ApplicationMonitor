import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

class ProgressBarLoc extends Component{
    state = {
      progressVal: 0.0
    };

    componentDidMount() {
        this.setState({progressVal: this.props.progressVal});
    }

    render() {
        return (
            <div className="mt-3"><ProgressBar variant={this.getVariant()} animated now={this.convertValue() }/></div>
        );
    }

    getVariant(){
        if(this.props.progressVal == 1.0){
            return "success"
        }
        else{
            return "info"
        }
    }

    convertValue(){
        var num = this.props.progressVal*100;
        return parseInt(num, 10);
    }

}
export default ProgressBarLoc;