import Nav from "./Nav"
import { useContext } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"

function ManagerHomepage() {
    const [user] = useContext(Context)
    return (
        user?.role == 'manager'
            ?
            <div className="page backgroundImagePage">
                <Nav />
                <h1  className="whiteText">Manager Homepage</h1>
                <h2  className="whiteText">hello {user.name}</h2>
            </div>
            : <Navigate to='/home' />
    )
}
export default ManagerHomepage