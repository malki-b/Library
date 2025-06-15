import Nav from "./Nav";
import { useState, useEffect, useContext } from 'react';
import { GET, PUT } from '../general/queries';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../../css/Modal.css'
import Confirmation from "../acts/Confirmation";

Modal.setAppElement('#root');

function ReturnBook() {
    const [lends, setLends] = useState([]);
    const [message, setMessage] = useState(null);
    const [user] = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLendId, setSelectedLendId] = useState(null);

   useEffect(() => {
    const fetchLends = async () => {
        try {
            const data = await GET(`http://localhost:3000/lends?subscriptionId=${user.id}&returnDate=null`);
            setLends(data);
        } catch (e) {
            setMessage({ txt: e.message, className: 'error' });
        }
    };
    fetchLends();
}, [user.id]);

    const openModal = (lendId) => {
        setSelectedLendId(lendId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleReturnBook = async () => {
        if (selectedLendId) {
            try {
                await PUT(`http://localhost:3000/lends/return`, { id: selectedLendId });
                setLends(prevState => (prevState.filter(lend => lend.id != selectedLendId)));
                setMessage({ txt: `The book was returned successfully`, className: 'success' });
            } catch (e) {
                setMessage({ txt: e.message, className: 'error' });
            } finally {
                closeModal();
            }
        }
    };

    return (
        user && user.role === 'subscription' ?
            <>
                <Nav />
                <h1>ReturnBook</h1>
                {message && <div className={message.className}>
                            <span >{message.txt}</span>
                            <button className={message.className} onClick={() => setMessage(null)}>ok</button>
                        </div>}
                <div>
                    {lends.length > 0 ? (
                        <ul>
                        {lends.map(lend => (
                            <li key={lend.id}>
                                <img src={lend.bookImg} alt={lend.bookName} width="200px" height="200px" />
                                <p>Book ID: {lend.bookId}</p>
                                <p>Book Name: {lend.bookName}</p>
                                <p>Lend Date: {lend.lendDate}</p>
                                <button onClick={() => openModal(lend.id)}>החזר ספר</button>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="noResults">No lends available</p>
                    )}
                </div>

                <Confirmation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                    header={'Confirm return book'} txt={'Are you sure you want to return the book?'} func={handleReturnBook}/>
            </>
            : <Navigate to='/home' />
    );
}

export default ReturnBook;
