import Axios from "axios";

class FetchWebPage{

    static getValue(webPageAddress){
        let proxyVal = "https://cors-anywhere.herokuapp.com/";
        let final = proxyVal+webPageAddress;
        return Axios.get(final).then( (response) => {
                return response.data
            }
        )
    }

}
export default FetchWebPage;