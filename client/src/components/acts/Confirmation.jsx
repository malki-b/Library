import Modal from 'react-modal';

function Confirmation({ isModalOpen, setIsModalOpen, header, txt, func }) {
    return (
        <Modal isOpen={isModalOpen} className="modal" overlayClassName="overlay" >
            <h2>{header}</h2>
            <p>{txt}</p>
            <button onClick={func}>אישור</button>
            <button onClick={() => setIsModalOpen(false)}>ביטול</button>
        </Modal>
    )
}

export default Confirmation;