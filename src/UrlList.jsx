import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css';

class UrlList extends Component{
    state = {
      urlList: [],
        checkedList: []
    };

    componentDidMount() {
        this.setState({urlList: this.props.urlList, checkedList: this.props.checkedList});
    };


    render() {
        return (
            <ul className={"list-group"}>
                {this.props.urlList.map((x, i) => {
                    console.log(x)
                    let badgeLine = this.getBadgeLine(this.props.checkedList[i]);
                    return (<li
                        key={i}
                        className="list-group-item list-group-item-light d-flex justify-content-between align-items-center"
                    >
                        <a href={x}>{x}</a>
                        <span className={badgeLine}>{this.props.checkedList[i]}</span>
                    </li>)
                })}
            </ul>
        );
    }

    getBadgeLine(val){
        if(val == "Open"){
            return "badge badge-success badge-pill"
        }
        else if(val == "Not Open Yet"){
            return "badge badge-warning badge-pill"
        }
        else{
            return "badge badge-primary badge-pill"
        }
    }
}
export default UrlList;