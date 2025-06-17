import Nav from "./Nav";
import { useState, useEffect, useContext } from 'react';
import { GET, PUT } from '../general/queries';
import { Context } from "../general/Routers";
import { Navigate, useNavigate } from 'react-router-dom';
import '../../css/Modal.css'
import Modal from 'react-modal';

function ReturnBook() {
    const fineToLateReturn = 10;
    const [lends, setLends] = useState([]);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useContext(Context);
    const [isConfirmReturnBookModalOpen, setIsConfirmReturnBookModalOpen] = useState(false);
    const [isFineMessageModalOpen, setIsFineMessageModalOpen] = useState(false)
    const [selectedLendId, setSelectedLendId] = useState(null);
    const navigate = useNavigate()

    Modal.setAppElement('#root')
    useEffect(() => {
        const fetchLends = async () => {
            try {
                const data = await GET(`http://localhost:3000/lends?subscriberId=${user.id}&returnDate=null`);
                setLends(data);
            } catch (e) {
                setMessage({ txt: e.message, className: 'error' });
            }
        };
        fetchLends();
    }, []);

    const openModal = (lendId) => {
        setSelectedLendId(lendId);
        setIsConfirmReturnBookModalOpen(true);
    };

    const closeModal = () => {
        setIsConfirmReturnBookModalOpen(false);
    };

    function isLendingOlderThanOneMonth(lend) {
        return lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    const handleReturnBook = async () => {
        if (selectedLendId) {
            try {
                await PUT(`http://localhost:3000/lends/return`, { id: selectedLendId });
                setLends(prevState => (prevState.filter(lend => lend.id != selectedLendId)));
                setMessage({ txt: 'The book was returned successfully', className: 'success' });
            }
            catch (e) {
                setMessage({ txt: e.message, className: 'error' });
            }
            finally {
                closeModal();
            }
            const lend = lends.filter(l => l.id == selectedLendId)[0]
            if (isLendingOlderThanOneMonth(lend)) {
                try {
                    await PUT(`http://localhost:3000/users/${lend.subscriberId}/debt`, { amount: fineToLateReturn });
                    setUser(prev => ({ ...prev, debt: prev.debt + fineToLateReturn }));
                    setIsFineMessageModalOpen(true)
                }
                catch (e) {
                    setMessage({ txt: e.message, className: 'error' })
                }
            }
        }
    };

    return (
        user && user.role === 'subscriber' ?
            <div className="page backgroundColorPage">
                <Nav />
                <div style={{ height: "60px" }}></div>
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
                <Modal isOpen={isConfirmReturnBookModalOpen} className="modal" overlayClassName="overlay" >
                    <h2>{'Confirm return book'}</h2>
                    <p>{'Are you sure you want to return the book?'}</p>
                    <button onClick={handleReturnBook}>OK</button>
                    <button onClick={() => setIsConfirmReturnBookModalOpen(false)}>cancel</button>
                </Modal>
                <Modal isOpen={isFineMessageModalOpen} className="modal" overlayClassName="overlay" >
                    <h2>{'A fine for a late return book'}</h2>
                    <p>{`You have to pay ${fineToLateReturn} NIS as a fine`}</p>
                    <button onClick={()=>navigate('/subscriber/payment')}>OK</button>
                </Modal>
            </div>
            : <Navigate to='/home' />
    );
}

export default ReturnBook;
