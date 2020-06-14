
class CheckForStatus{

    static hasTalNet(data){
        return data.includes(".tal.net")
    }

    static hasApplyTo(data){
        return data.includes("Apply to")
    }

    static checkAll(data){
        return (this.hasTalNet(data) || this.hasApplyTo(data))
    }

}
export default CheckForStatus;