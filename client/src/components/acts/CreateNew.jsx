import { POST } from '../general/queries';
import { useState } from "react";

function CreateNew({ type, fields, newObjInit, setArr, isSimpleArrObjects }) {

    const [displayFormNew, setDisplayFormNew] = useState(false);
    const [newObj, setNewObj] = useState(newObjInit);
    const [error, setError] = useState(null);
    const [createdObj, setCreatedObj] = useState(null); // State to hold the created object

    async function create(e) {
        e.preventDefault();
        setDisplayFormNew(false);
        try {
            const responseObj = await POST(`http://localhost:3000/${type.toLowerCase()}`, newObj);
            setCreatedObj(responseObj);
            if (isSimpleArrObjects) {
                setArr(prev => [...prev, responseObj]);
            } else {
                setArr(prev => ({
                    all: [...prev.all, responseObj],
                    search: [...prev.search, { ...responseObj, isEditState: false }]
                }));
            }
            setNewObj(newObjInit);
        } catch (e) {
            setError(e);
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            {createdObj &&<>
                <div>Newly Created Object:</div>
                {Object.keys(createdObj).map((key)=><div key={key}>
                    <span>{key}:</span>
                    <span>{createdObj[key]}:</span>
                </div>)}
                <button onClick={() => setCreatedObj(null)}>❌</button>
            </>
             } 
            <button className={`new${type}`} onClick={() => setDisplayFormNew(true)}>📄 New {type.slice(0, -1)}</button>
            {displayFormNew && <div>
                <button onClick={() => setDisplayFormNew(false)}>❌</button>
                {fields.map((field, i) => (
                    <input required onChange={(e) => setNewObj({ ...newObj, [field]: e.target.value })} key={i} placeholder={field} />
                ))}
                <button type='submit' onClick={(e) => create(e)}>ADD</button>
            </div>}
        </div>
    );
}

export default CreateNew;