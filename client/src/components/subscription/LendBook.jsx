import { useState, useEffect } from "react"
import Nav from "./Nav"
import { Navigate } from "react-router-dom"
import { GET, POST } from "../general/queries"
import { useContext } from "react"
import { Context } from "../general/Routers"

function LendBook() {
    const [bookId, setBookId] = useState(0)
    const [message, setMessage] = useState(null)
    const [openLends, setOpenLends] = useState([])
    const [user] = useContext(Context)
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
    async function handleLendBook(e) {
        e.preventDefault()
        try {
            const response = await POST(`http://localhost:3000/lends`, { subscriptionId: user.id, bookId: bookId })
            setMessage({ txt: response, className: 'message' })
            await fetchOpenLends()
            console.log(openLends.length);
            
        }
        catch (e) {
            setMessage({ txt: e.message, className: 'error' })
        }
    }
    return (
        user?.role == 'subscription' ?
            <>
                <Nav />
                <h1>lend Book</h1>
                {user.debt > 0 &&
                    <>
                        <div>You are not allowed to lent a book because you have a deby, pat the debt first</div>
                        <button onClick={() => navigate("/subscription/payment")}>payment</button>
                    </>
                }
                {user.numOfFamilyMembers <= openLends.length &&
                    <div>You already lent {openLends.length} book, you can not lend more</div>
                }
                {
                    (user.debt <= 0 && user.numOfFamilyMembers > openLends.length) &&
                    <>
                        {message && <div>
                            <span className={message.className}>{message.txt}</span>
                            <button onClick={() => setMessage(null)}>❌</button>
                        </div>}
                        <label>
                            Enter book code you want to lend:
                            <input
                                type="number"
                                value={bookId}
                                onChange={e => setBookId(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" onClick={(e) => handleLendBook(e)}>Lend</button>
                    </>
                }

            </>
            : <Navigate to='/home' />

    )
}
export default LendBook