import { useState } from "react";
import Nav from "./Nav"

function Lends() {
    const [isAllLends, setIsAllLends] = useState(true)

    return(
        <>
        <Nav/>
        <button type="button" onClick={setIsAllLends(true)}>display all lends</button>
        <button type="button" onClick={setIsAllLends(false)}>display open later lends</button>
        {
            isAllLends ?
            <AllLends/>
            :
            <OpenLaterLends/>
        }
        </>
    )
}
export default Lends 