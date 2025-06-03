import requests from "../../tools/requests";
import { useState } from "react";
function CreateNew({ type, fields, newObjInit, setArr, isSimpleArrObjects }) {

    const [displayFormNew, setDisplayFormNew] = useState(false)
    const [newObj, setNEwObj] = useState(newObjInit)
    const [error, setError] = useState(null)

    async function create(e) {
        e.preventDefault()
        setDisplayFormNew(false);
        try {
            const createdObj = await requests.storeData(type.toLowerCase(), newObj, 'POST');
            if (isSimpleArrObjects)
                setArr(prev => [...prev, createdObj])
            else
                setArr(prev => ({
                    all: [...prev.all, createdObj],
                    search: [...prev.search, { ...createdObj, isEditState: false }]
                }));
            setNEwObj(newObjInit);
        }
        catch (e) {
            setError(e)
        }
    }
    return (

        <div>
            {error && <div>{error}</div>}
            <button className={`new${type}`} onClick={() => setDisplayFormNew(true)}>📄 New {type.slice(0, -1)}</button>
            {displayFormNew && <div>
                <button onClick={() => setDisplayFormNew(false)}>❌</button>
                {fields.map((field, i) => <input required onChange={(e) => setNEwObj({ ...newObj, [field]: e.target.value })} key={i} placeholder={field} />)}
                <button type='submit' onClick={(e) => create(e)}>ADD</button>
            </div>}
        </div>
    )
}

export default CreateNew


