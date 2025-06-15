import Nav from "./Nav";
import { useState, useEffect, useContext } from 'react';
import { GET, PUT } from '../general/queries';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import '../../css/Modal.css'
import Modal from 'react-modal';


function ReturnBook() {
    const [lends, setLends] = useState([]);
    const [message, setMessage] = useState(null);
    const [user] = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLendId, setSelectedLendId] = useState(null);

    Modal.setAppElement('#root')
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
            <div className="page">
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
                <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
                    <h2>{'Confirm return book'}</h2>
                    <p>{'Are you sure you want to return the book?'}</p>
                    <button onClick={handleReturnBook}>אישור</button>
                    <button onClick={() => setIsModalOpen(false)}>ביטול</button>
                </Modal>
            </div>
            : <Navigate to='/home' />
    );
}

export default ReturnBook;
