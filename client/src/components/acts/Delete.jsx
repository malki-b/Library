import { useState } from 'react';
import { DELETE } from '../general/queries'
import Modal from 'react-modal';


function Delete({ id, type, setArrObjs, isSimpleArrObjects, setMessage }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    Modal.setAppElement('#root')

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
            setMessage({ txt: `${type.slice(0, -1)} ${id} was deleted succeessfully`, className: 'success' })
        }
        catch (e) {
            setMessage({ txt: e.message, className: 'error' })
        }
    }
    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} >🧺</button>
            <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                <h2>{`Confirm deleting a ${type.slice(0, -1)}`}</h2>
                <p>{`Are you sure you want to delete ${type.slice(0, -1)} ${id}?`}</p>
                <button onClick={deleteObj}>OK</button>
                <button onClick={() => setIsModalOpen(false)}>cancel</button>
            </Modal>
        </div>

    )
}
export default Delete