import { useState, useEffect } from "react"
import Nav from "./Nav"
import { Navigate } from "react-router-dom"
import { GET, POST } from "../general/queries"
import { useContext } from "react"
import { Context } from "../general/Routers"
import { useNavigate } from "react-router-dom"
import Modal from 'react-modal';


function LendBook() {
    const [bookId, setBookId] = useState(0)
    const [message, setMessage] = useState(null)
    const [openLends, setOpenLends] = useState([])
    const [user] = useContext(Context)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    async function fetchOpenLends() {
        try {
            const data = await GET(`http://localhost:3000/lends?subscriptionId=${user?.id}&returnDate=null`);
            setOpenLends(data);

        }
        catch (e) {
            setMessage({ txt: e.message, className: 'error' })
        }
    }
    useEffect(() => {
        fetchOpenLends();
    }, []);
    async function handleLendBook() {
        setIsModalOpen(false)
        try {
            const response = await POST(`http://localhost:3000/lends`, { subscriptionId: user.id, bookId: bookId })
            setMessage({ txt: response, className: 'success' })
            await fetchOpenLends()
            console.log(openLends.length);

        }
        catch (e) {
            setMessage({ txt: e.message, className: 'error' })
        }
    }
    return (
        user?.role == 'subscription' ?
            <div className="page">
                <Nav />
                <h1>lend Book</h1>
                {message && <div className={message.className}>
                    <span >{message.txt}</span>
                    <button className={message.className} onClick={() => setMessage(null)}>ok</button>
                </div>}
                {user.debt > 0 &&
                    <>
                        <div>You are not allowed to lent a book because you have a deby, pay the debt first</div>
                        <button onClick={() => navigate("./payment")}>payment</button>
                    </>
                }
                {user.numOfFamilyMembers <= openLends.length &&
                    <div>You already lent {openLends.length} books, you can not lend more</div>
                }
                {
                    (user.debt <= 0 && user.numOfFamilyMembers > openLends.length) &&
                    <>
                        <label>
                            Enter book code you want to lend:
                            <input
                                type="number"
                                value={bookId}
                                onChange={e => setBookId(e.target.value)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => setIsModalOpen(true)}>Lend</button>
                        <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                            <h2>{'Confirm lend book'}</h2>
                            <p>{`are you sure you want to lend book ${bookId}?`}</p>
                            <button onClick={handleLendBook}>אישור</button>
                            <button onClick={() => setIsModalOpen(false)}>ביטול</button>
                        </Modal>
                    </>
                }

            </div>
            : <Navigate to='/home' />

    )
}
export default LendBook