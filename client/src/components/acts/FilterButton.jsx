function FilterButton({ setArrObjs, btnTxt, func, activeFilter, setActiveFilter }) {

    function filter() {
        setActiveFilter(btnTxt)
        setArrObjs(prevArrObjs => {
            const filteredItems = prevArrObjs.all.filter(func);
            return { ...prevArrObjs, filtered: filteredItems, search: filteredItems };
        });
    }

    return (

        <button
            style={{ fontWeight: activeFilter === btnTxt ? 'bold' : 'normal' }}
            onClick={filter}>{btnTxt}</button>

    );
}

export default FilterButton;