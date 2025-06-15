import Nav from "./Nav"
import { useContext, useState } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"
import Modal from 'react-modal';

function SubscriptionHomepage() {
    const [user] = useContext(Context)
    const [isModalOpen, setIsModalOpen] = useState(true)
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
                <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                    <h2>Borrowing Policy</h2>
                    <p>A subscriber may borrow books equal to the number of people in the family.</p>
                    <p> A book must be returned within 30 days of the borrowing date, later return will incur a fine of 10 NIS per book</p>
                    <p>A subscriber cannot borrow if he has a debt to the library.</p>
                    <button onClick={() => setIsModalOpen(false)}>I got</button>
                </Modal>
            </>
            : <Navigate to='/home' />
    )
}
export default SubscriptionHomepage