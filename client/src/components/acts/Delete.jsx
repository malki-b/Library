import requests from "../../tools/requests";
import { useState } from 'react';

function Delete({ id, type, setArrObjs, isSimpleArrObjects }) {

        const [error, setError] = useState(null)
    
    async function deleteObj() {
        try{
            await requests.deleteData(`${type}/${id}`);
        }
        catch(e){
            setError(e)
        }
        if (isSimpleArrObjects)
            setArrObjs(prevObjsArr => prevObjsArr.filter(object => object.id != id))
        else
            setArrObjs(prevObjsArr => {
                return {
                    all: prevObjsArr.all.filter(object => object.id != id),
                    search: prevObjsArr.search.filter(object => object.id != id)
                }
            })
    }
    return (
        <div>
        {error && <div>{error}</div>}
        <button onClick={deleteObj} >🧺</button>
        </div>
        
    )
}
export default Delete