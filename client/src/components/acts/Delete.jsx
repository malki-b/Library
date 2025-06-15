import { useState } from 'react';
import { DELETE } from '../general/queries'
import Confirmation from './Confirmation';

function Delete({ id, type, setArrObjs, isSimpleArrObjects, setMessage }) {
    const [isModalOpen, setIsModalOpen] =useState(false)
    async function deleteObj() {
        setIsModalOpen(false)
        try {
            await DELETE(`http://localhost:3000/${type}/${id}`);

            if (isSimpleArrObjects)
                setArrObjs(prevObjsArr => prevObjsArr.filter(object => object.id != id))
            else
                setArrObjs(prevObjsArr => {
                    return {
                        all: prevObjsArr.all.filter(object => object.id != id),
                        filtered: prevObjsArr.filtered.filter(object => object.id != id),
                        search: prevObjsArr.search.filter(object => object.id != id)
                    }
                })
            setMessage({txt: `${type.slice(0, -1)} ${id} was deleted succeessfully`, className: 'success'})
        }
        catch (e) {
            setMessage({txt: e.message, className:'error'})
        }
    }
    return (
        <div>
            <button onClick={()=>setIsModalOpen(true)} >🧺</button>
            <Confirmation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                header={`Confirm deleting a ${type.slice(0, -1)}`} txt={`Are you sure you want to delete ${type.slice(0, -1)} ${id}?`} func={deleteObj} />
        </div>

    )
}
export default Delete