import { DELETE } from '../general/queries'

function Delete({ id, type, setArrObjs, isSimpleArrObjects, setMessage }) {


    async function deleteObj() {
        try {
            await DELETE(`http://localhost:3000/${type}/${id}`);

            if (isSimpleArrObjects)
                setArrObjs(prevObjsArr => prevObjsArr.filter(object => object.id != id))
            else
                setArrObjs(prevObjsArr => {
                    return {
                        all: prevObjsArr.all.filter(object => object.id != id),
                        search: prevObjsArr.search.filter(object => object.id != id)
                    }
                })
            setMessage({txt: `${type.slice(0, -1)} ${id} was deleted succeessfully`})
        }
        catch (e) {
            setMessage({txt: e.message, className:'error'})
        }
    }
    return (
        <div>
            <button onClick={deleteObj} >🧺</button>
        </div>

    )
}
export default Delete