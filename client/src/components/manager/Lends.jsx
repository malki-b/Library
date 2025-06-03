import { useState } from "react";
import Nav from "./Nav"
import AllLends from "./AllLends";
import OpenLateLends from "./OpenLateLends";
function Lends() {
    const [isAllLends, setIsAllLends] = useState(false)

    return(
        <>
        <Nav/>
        <button type="button" onClick={()=>setIsAllLends(true)}>display all lends</button>
        <button type="button" onClick={()=>setIsAllLends(false)}>display open late lends</button>
        {
            isAllLends ?
            <AllLends/>
            :
            <OpenLateLends/>
        }
        </>
    )
}
export default Lends 