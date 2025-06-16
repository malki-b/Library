import { useState } from 'react'
import { PUT } from '../general/queries'
import Modal from 'react-modal';

function Edit({ obj, arrObjs, setArrObjs, type, displayFields, isSimpleArrObjects, setMessage }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    Modal.setAppElement('#root')


    async function saveChanges() {
        setIsModalOpen(false)
        const object = obj
        delete object.isEditState
        try {
            await PUT(`http://localhost:3000/${type}`, object)
            setObjsField('isEditState', false, false, true)
            setMessage({ txt: `${type.slice(0, -1)} ${object.id} was updated succeessfully`, className: 'success' })
        }
        catch (e) {
            setMessage({ txt: e.message, className: 'error' })
        }
    }

    function setObjsField(field, value, isToChangeAllAndFiltered = true, isToChangeSearch = true) {
        obj[field] = value
        if (isSimpleArrObjects) {
            setArrObjs(arrObjs.map(object => {
                return (object.id == obj.id ? { ...object, [field]: value } : object)
            }))
        }

        else {
            const prevObjsArr = { ...arrObjs }
            setArrObjs({
                all: isToChangeAllAndFiltered == false ? [...prevObjsArr.all] :
                    (prevObjsArr.all.map(object =>
                        (obj.id === object.id ? { ...object, [field]: value } : object))),
                filtered: isToChangeAllAndFiltered == false ? [...prevObjsArr.filtered] :
                    (prevObjsArr.filtered.map(object =>
                        (obj.id === object.id ? { ...object, [field]: value } : object))),
                search: isToChangeSearch == false ? [...prevObjsArr.search] :
                    (prevObjsArr.search.map(object =>
                        (obj.id === object.id ? { ...object, [field]: value } : object)))
            });
        }

    }

    return (
        <>
            <div>
                <button onClick={() => setObjsField('isEditState', !obj.isEditState, false, true)}>✏️</button>
                {displayFields.map((field, i) =>
                (<div key={i}>
                    {obj.isEditState ?
                        <div>
                            <label htmlFor={field}>{field}:</label>
                            <input
                                onChange={(e) => setObjsField(field, e.target.value)}
                                placeholder={field}
                                value={obj[field]}
                                name={field} />
                        </div>
                        :
                            <p>{field} {obj[field]}:</p>
                    }
                </div>))}
            </div>
            {obj.isEditState &&
                <button onClick={() => setIsModalOpen(true)} >save</button>}
            <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                <h2>{`Confirm update a ${type.slice(0, -1)}`}</h2>
                <p>{`Are you sure you want to update the ${type.slice(0, -1)} ${obj.id} details?`}</p>
                <button onClick={saveChanges}>אישור</button>
                <button onClick={() => setIsModalOpen(false)}>ביטול</button>
            </Modal>
        </>
    )
}

export default Edit