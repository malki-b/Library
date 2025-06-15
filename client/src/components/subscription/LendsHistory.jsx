import { useState, useEffect, useContext } from 'react';
import { GET } from '../general/queries';
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import Nav from './Nav';
import FilterButton from '../acts/FilterButton';
function LendsHistory() {
    const [lends, setLends] = useState({ all: [], filtered: [], search: [] });
    const [findFieldsVal, setFindFieldsVal] = useState({ bookId: "", bookName: "", lendDate: "", returnDate: "" })
    const [message, setMessage] = useState(null)
    const [user] = useContext(Context)
    useEffect(() => {
        const fetchLends = async () => {
            try {
                const data = await GET(`http://localhost:3000/lends?subscriptionId=${user.id}`);
                setLends({
                    all: data,
                    filtered: data,
                    search: data
                });
            } catch (e) {
                setMessage({ txt: e.message, className: 'error' })
            }
        }
        fetchLends();
    }, []);

    return (
        user && user.role == 'subscription' ?
            <>
                <div>
                    <Nav />
                    <h1>My Lends</h1>
                    {message && <div className={message.className}>
                            <span >{message.txt}</span>
                            <button className={message.className} onClick={() => setMessage(null)}>ok</button>
                        </div>}
                    <FilterButton setArrObjs={setLends} btnTxt={'all lends'} func={() => true} />
                    <FilterButton setArrObjs={setLends} btnTxt={'open lends'} func={(lend) => lend.returnDate == null} />
                    <FilterButton setArrObjs={setLends} btnTxt={'open late lends'} func={(lend) => lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)} />
                    <Sort arrObjs={lends} setArrObjs={setLends} sortFields={['id', 'bookId', 'bookName', 'lendDate', 'returnDate']} />
                    <Search arrObjs={lends} setArrObjs={setLends} fields={['id', 'bookId', 'bookName']} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
                    {lends.search.length == 0
                        ?
                        <p className='noResaults'> no resaults </p >
                        :
                        <ul className='ul'>
                            {lends.search.map((lend, i) => (
                                <li key={lend.id}>
                                <img src={lend.bookImg} alt={lend.bookName} width="200px" height="200px" />
                                <p>Book ID: {lend.bookId}</p>
                                <p>Book Name: {lend.bookName}</p>
                                <p>Lend Date: {lend.lendDate}</p>
                                <p>Return Date: {lend.returnDate}</p>
                            </li>
                            ))}
                        </ul>

                    }

                </div>
            </>
            : <Navigate to='/home' />
    );
}

export default LendsHistory;