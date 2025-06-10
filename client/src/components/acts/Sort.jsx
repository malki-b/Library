import React, { useState } from "react";

function Sort({arrObjs, setArrObjs, sortFields }) {
    const [sortBy, setSortBy] = useState("");

    async function sort() {
        const sortedObjs = [...arrObjs.search];
            sortedObjs.sort((t1, t2) => compareValues(t1[sortBy], t2[sortBy]));
        setArrObjs({ ...arrObjs, search: sortedObjs });
    };

    function compareValues(value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
            return value1 - value2; 
        } else {
            return value1.localeCompare(value2); 
        }
    }
    return (
        <>
            <div>
                <label htmlFor="sortBy">Sort by:</label>
                <select name="sortBy" id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    {sortFields.map((field, i) => (
                        <option key={i} value={field}>{field}</option>
                    ))}
                </select>
            </div>
            <button onClick={sort}>Sort</button>
        </>
    );
}

export default Sort;