import axios from "axios";

const baseurl = "http://localhost:48829/api/"

export default{
    dCandidate(url=baseurl+'dcandidate/'){
        return{
            fetchAll: ()=> axios.get(url),
            fetchById:id=>axios.get(url+id),
            create: newRecond=>axios.post(url,newRecond),
            update:(id,updateRecord)=>axios.put(url+id,updateRecord),
            delete:id=>axios.delete(url+id),
        }
    }
}