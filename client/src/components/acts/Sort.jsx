import React, { useState } from "react";
function Sort({todos, setTodos}) {
    const [sortBy, setSortBy] = useState(" ");

    async function sort() {
        const sortedTodos = [...todos.search];
        switch (sortBy) {
            case 'id':
                sortedTodos.sort((t1, t2) => parseInt(t1.id, 16) - parseInt(t2.id, 16));
                break;
            case 'title':
                sortedTodos.sort((t1, t2) => t1.title.localeCompare(t2.title));
                break;
            default:
                sortedTodos.sort((t1, t2) => (t1[sortBy] - t2[sortBy]));
                break;
        }
        setTodos({ ...todos, search: sortedTodos });
    };

    return (
        <>
            <div>
                <label htmlFor="sortBy">Sort by:</label>
                <select name="sortBy" id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">  </option>
                    <option value="id">id</option>
                    <option value="title">title</option>
                    <option value="completed">is completed</option>
                </select>
            </div>
            <button onClick={sort}>sort</button>
        </>
    )
}
export default Sort