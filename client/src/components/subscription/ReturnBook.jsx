import Nav from "./Nav";
import { useState, useEffect, useContext } from 'react';
import { GET, PUT } from '../general/queries';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal';
import './ReturnBook.css'; // נוודא שהקובץ CSS קיים

Modal.setAppElement('#root');

function ReturnBook() {
    const [lends, setLends] = useState({ all: [], search: [] });
    const [message, setMessage] = useState(null);
    const [user] = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLendId, setSelectedLendId] = useState(null);

   useEffect(() => {
    const fetchLends = async () => {
        try {
            const data = await GET(`http://localhost:3000/lends?subscriptionId=${user.id}`);
            const filteredLends = data.filter(lend => lend.returnDate === null);
            setLends({
                all: filteredLends,
                search: filteredLends
            });
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
                setLends(prevState => ({
                    ...prevState,
                    search: prevState.search.filter(lend => lend.id !== selectedLendId)
                }));

                setMessage({ txt: `book ${selectedLendId} was returned successfully`, className: 'success' });
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
                {message && <p className={message.className}>{message.txt}</p>}
                <div>
                    {lends.search.length > 0 ? (
                        lends.search.map(lend => (
                            <div key={lend.id}>
                                <p>Book ID: {lend.bookId}</p>
                                <p>Lend Date: {lend.lendDate}</p>
                                <button onClick={() => openModal(lend.id)}>החזר ספר</button>
                            </div>
                        ))
                    ) : (
                        <p>No lends available</p>
                    )}
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>אישור החזרת ספר</h2>
                    <p>ברצונך להחזיר את הספר?</p>
                    <button onClick={handleReturnBook}>אישור</button>
                    <button onClick={closeModal}>ביטול</button>
                </Modal>
            </>
            : <Navigate to='/home' />
    );
}

export default ReturnBook;
