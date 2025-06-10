import Nav from "./Nav"
import { useContext } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"
function SubscriptionHomepage() {
    const [user] = useContext(Context)
    const maxLoanBooks = user?.numOfFamilyMembers;
    return (
        user?.role == 'subscription'
            ?
            <>
                <Nav />
                <h1>Supscription Homepage</h1>
                <h2>hello {user.name}</h2>
                <div>You can lend {maxLoanBooks} books</div>
                {user.debt > 0 &&
                    <div>You owe the library {user.debt} shekels.</div>}
            </>
            : <Navigate to='/home' />
    )
}
export default SubscriptionHomepage