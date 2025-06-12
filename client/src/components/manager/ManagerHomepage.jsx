import Nav from "./Nav"
import { useContext } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"
function ManagerHomepage() {
    const [user] = useContext(Context)
    return (
        user?.role == 'manager'
            ?
            <>
                <Nav />
                <h1>Manager Homepage</h1>
                <h2>hello {user.name}</h2>
            </>
            : <Navigate to='/home' />
    )
}
export default ManagerHomepage