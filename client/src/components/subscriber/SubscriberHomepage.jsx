import Nav from "./Nav"
import { useContext, useState } from "react"
import { Context } from "../general/Routers"
import { Navigate } from "react-router-dom"
import Modal from 'react-modal';

function SubscriberHomepage() {
    Modal.setAppElement('#root')
    const [user] = useContext(Context)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const maxLoanBooks = user?.numOfFamilyMembers;
    return (
        user?.role == 'subscriber'
            ?
            <div className="page backgroundImagePage">
                <Nav />
                <h1  className="whiteText">Supscription Homepage</h1>
                <h2 className="whiteText">hello {user.name}</h2>
                <div className="whiteText">You can lend {maxLoanBooks} books</div>
                {user.debt > 0 &&
                    <div className="whiteText">You owe the library {user.debt} shekels.</div>}
                <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                    <h2>Borrowing Policy</h2>
                    <p>A subscriber may borrow books equal to the number of people in the family.</p>
                    <p> A book must be returned within 30 days of the borrowing date, later return will incur a fine of 10 NIS per book</p>
                    <p>A subscriber cannot borrow if he has a debt to the library.</p>
                    <button onClick={() => setIsModalOpen(false)}>I got</button>
                </Modal>
            </div>
            : <Navigate to='/home' />
    )
}
export default SubscriberHomepage