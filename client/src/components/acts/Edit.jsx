import { useState } from 'react';
import {PUT} from '../general/queries'
function Edit({ obj, arrObjs, setArrObjs, type, displayFields, isSimpleArrObjects }) {

        const [error, setError] = useState(null)
    

    async function saveChanges() {
        const object = obj
        delete object.isEditState
        try{
        await PUT(`http://localhost:3000/${type}`, object)
        }
        catch(e){
            setError(e)
        }
        setObjsField('isEditState', false, false, true)
    }

    function setObjsField(field, value, isToChangeAll = true, isToChangeSearch = true) {
        obj[field] = value
        if (isSimpleArrObjects) {
            setArrObjs(arrObjs.map(object => {
                return (object.id == obj.id ? { ...object, [field]: value } : object)
            }))
        }

        else {
            const prevObjsArr = { ...arrObjs }
            setArrObjs({
                all: isToChangeAll == false ? [...prevObjsArr.all] :
                    (prevObjsArr.all.map(object =>
                        (obj.id === object.id ? { ...object, [field]: value } : object))),
                search: isToChangeSearch == false ? [...prevObjsArr.search] :
                    (prevObjsArr.search.map(object =>
                        (obj.id === object.id ? { ...object, [field]: value } : object)))
            });
        }

    }

    return (
        <>
                {error && <div>{error}</div>}
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
                        <>
                        <span>{field}:</span>
                        <span>{obj[field]}</span>

                        </>
                    }
                </div>))}
            </div>
            {type == 'todos' &&
                <input type="checkbox"  onChange={() => setObjsField('completed', !obj.completed)} defaultChecked={obj.completed}/>}
            {obj.isEditState &&
                <button onClick={saveChanges} >save</button>}
        </>
    )
}

export default Edit