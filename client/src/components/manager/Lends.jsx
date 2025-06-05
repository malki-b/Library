import { useState, useEffect, useContext } from 'react';
import { GET } from '../general/queries'
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import SendEmailBtn from './SendEmailBtn';
import Nav from './Nav';
import FilterButton from '../acts/FilterButton';
function Lends() {
    const [lends, setLends] = useState({ all: [], search: [] });
    const [findFieldsVal, setFindFieldsVal] = useState({ bookId: "", bookName: "", subscriptionId: "", subscriberName: "", lendDate: "", returnDate: "" })
    const [message, setMessage] = useState(null)
    const [user] = useContext(Context)
    useEffect(() => {
        const fetchLends = async () => {
            try {
                const data = await GET('http://localhost:3000/lends');
                setLends({
                    all: data,
                    search: data
                });

            }
            catch (e) {
                setMessage({ txt: e.message, className: 'error' })
            }
        }
        fetchLends();
    }, []);


    return (
        user && user.role == 'manager' ?
            <>
                <Nav />
                <div>
                    <h1>All Lends</h1>
                    {message && <div>
                        <span className={message.className}>{message.txt}</span>
                        <button onClick={() => setMessage(null)}>❌</button>
                    </div>}
                    <FilterButton setArrObjs={setLends} btnTxt={'all lends'} func={() => true} />
                    <FilterButton setArrObjs={setLends} btnTxt={'open lends'} func={(lend) => lend.returnDate == null} />
                    <FilterButton setArrObjs={setLends} btnTxt={'open late lends'} func={(lend) => lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)} />
                    <Sort arrObjs={lends} setArrObjs={setLends} sortFields={['id', 'subscriptionId', 'subscriberName', 'bookId', 'bookName', 'lendDate', 'returnDate']} />
                    <Search arrObjs={lends} setArrObjs={setLends} fields={['id', 'subscriptionId', 'subscriberName', 'bookId', 'bookName']} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
                    {lends.search.length == 0
                        ?
                        <p className='noResaults'> no resaults </p >
                        :
                        <ul className='ul'>
                            {lends.search.map((lend, i) => (
                                <li key={i}>
                                    <div className='lendItem'>
                                        {Object.keys(lend).map((field, j) => (
                                            lend[field] && <div key={j}>{field}: {lend[field]}</div>
                                        ))}
                                    </div>
                                    <SendEmailBtn lend={lend} setMessage={setMessage} />
                                </li>
                            ))}
                        </ul>

                    }

                </div>
            </>
            : <Navigate to='/home' />
    );
}

export default Lends;