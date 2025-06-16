import { POST } from '../general/queries';
import { useState } from "react";
import Modal from 'react-modal';


function CreateNew({ type, fields, newObjInit, setArr, isSimpleArrObjects, setMessage }) {

    const [displayFormNew, setDisplayFormNew] = useState(false);
    const [newObj, setNewObj] = useState(newObjInit);
    const [createdObj, setCreatedObj] = useState(null); // State to hold the created object
    const [isModalOpen, setIsModalOpen] = useState(false)
    Modal.setAppElement('#root')

    async function create() {
        setIsModalOpen(false)
        setDisplayFormNew(false);
        try {
            const responseObj = await POST(`http://localhost:3000/${type.toLowerCase()}`, newObj);
            setCreatedObj(responseObj);
            if (isSimpleArrObjects) {
                setArr(prev => [...prev, responseObj]);
            } else {
                setArr(prev => ({
                    all: [...prev.all, responseObj],
                    filtered: [...prev.all, responseObj],
                    search: [...prev.search, { ...responseObj, isEditState: false }]
                }));
            }
            setNewObj(newObjInit);
            setMessage({ txt: `A new ${type.slice(0, -1)} was added successfully`, className: 'success' })

        }
        catch (e) {
            setMessage({ txt: e.message, class: 'error' })
        }
    }

    return (
        <div>
            {createdObj && <div className='item'>
                <div>Newly Created Object:</div>
                {Object.keys(createdObj).map((key) => <div key={key}>
                    <span>{key}:</span>
                    <span>{createdObj[key]}:</span>
                </div>)}
                <button onClick={() => setCreatedObj(null)}>❌</button>
            </div>
            }
            <button className={`new${type}`} onClick={() => setDisplayFormNew(true)}>📄 New {type.slice(0, -1)}</button>
            {displayFormNew && <div>
                <button onClick={() => setDisplayFormNew(false)}>❌</button>
                {fields.map((field, i) => (
                    <input required onChange={(e) => setNewObj({ ...newObj, [field]: e.target.value })} key={i} placeholder={field} />
                ))}
                <button type='button' onClick={() => setIsModalOpen(true)}>ADD</button>
            </div>}

            <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                <h2>{`Confirm adding ${type.slice(0, -1)}`}</h2>
                <p>{`Are you sure you want to add ${type.slice(0, -1)}?`}</p>
                <button onClick={create}>אישור</button>
                <button onClick={() => setIsModalOpen(false)}>ביטול</button>
            </Modal>
        </div>
    );
}

export default CreateNew;