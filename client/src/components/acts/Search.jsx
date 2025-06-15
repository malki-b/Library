import React from "react";

function Search({ arrObjs, setArrObjs, fields, findFieldsVal, setFindFieldsVal }) {
    
    function find() {
        let searchObjs = [...arrObjs.filtered];
        fields.forEach(field => {
            if (findFieldsVal[field] !== '') {
                searchObjs = searchObjs.filter(obj => filterNumbersAndStrings(obj, field));
            }
        });
        setArrObjs({ ...arrObjs, search: searchObjs });
    }

    function filterNumbersAndStrings(obj, field) {
        const objValue = obj[field];
        const searchValue = findFieldsVal[field];
        const objNumber = Number(objValue);
        const searchNumber = Number(searchValue);
        const objIsNumeric = !isNaN(objNumber);
        const searchIsNumeric = !isNaN(searchNumber);
        
        if (objIsNumeric && searchIsNumeric) {
            return objNumber === searchNumber;
        } else {
            return String(objValue).includes(searchValue);
        }
    }

    return (
        <>
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
            <button onClick={find}>Search</button>
        </>
    );
}

export default Search;