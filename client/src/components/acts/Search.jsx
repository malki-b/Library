import React from "react";
function Search({ arrObjs, setArrObjs, fields, findFieldsVal, setFindFieldsVal }) {

    
    function find() {
        let searchObjs = [...arrObjs.all]
        fields.forEach(field => {
            if (field == 'id') {
                if (findFieldsVal.id != "") {
                    const object = searchObjs.find(obj =>obj.id == findFieldsVal.id)
                    searchObjs = object == null ? [] : [object]
                }
            }
            else {
                if (findFieldsVal[field] != '') {
                    searchObjs = searchObjs.filter(obj => (String)(obj[field]).includes(findFieldsVal[field]))
                }
            }

        });
        setArrObjs({ ...arrObjs, search: searchObjs })
    }

    return (<>
        <div>
            {
                fields.map((field, i) =>
                    <div key={i}>
                        <label htmlFor={field}>{field}</label>
                        <input type='text' name={field} id={field} onChange={(e) => setFindFieldsVal(prev => ({ ...prev, [field]: e.target.value }))} />
                    </div>
                )
            }
        </div>
        <button onClick={find}>search</button>
    </>
    )

}
export default Search