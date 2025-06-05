function FilterButton({ setArrObjs,btnTxt, func }) {
    
     function filter() {
        setArrObjs(prevArrObjs => {
            const filteredItems = prevArrObjs.all.filter(func);
            return { ...prevArrObjs, search: filteredItems };
        });
    }

    return (

            <button onClick={filter}>{btnTxt}</button>

    );
}

export default FilterButton;