import Nav from "./Nav"
import { useContext } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"
function SubscriptionHomepage() {
    const [user] = useContext(Context)
    return (
        user?.role == 'subscription'
            ?
            <>
                <Nav />
                <h1>Supscription Homepage</h1>
                <h2>hello {user.name}</h2>
            </>
            : <Navigate to='/home' />
    )
}
export default SubscriptionHomepage