import React, { useState, useEffect, useContext } from 'react';
import { GET, POST } from '../general/queries'
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
function AllLends() {
    const [lends, setLends] = useState({ all: [], search: [] });
    const [findFieldsVal, setFindFieldsVal] = useState({ bookId: "", bookName: "", subscriptionId: "", subscriberName: "", lendDate: "", returnDate: "" })
    const [error, setError] = useState(null)
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
                setError(e.message)
            }
        }
        fetchLends();
    }, []);

    function isLendingOlderThanOneMonth(lend) {
        return lend.returnDate == null && new Date(lend.lendDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    async function sendEmail(lend) {
        try {
            const subscriber = await GET(`http://localhost:3000/users/${lend.subscriptionId}`)
            if (subscriber.length == 0 || subscriber == null)
                throw new Error('Subscriber not found')
            const emailAddress = subscriber[0].email
            const emailRequest = {
                recipient: emailAddress,
                subject: `Reminder: ${lend.bookName} Overdue Notice`,
                message: `Dear ${lend.subscriberName},\n\nThis is a reminder that the book "${lend.bookName}" has been borrowed for more than a month. Please return it at your earliest convenience.\n\nThank you!`,
            }
            await POST('http://localhost:3000/users/sendEmail', emailRequest)
        }
        catch(e){
            setError(e.message)
        }
    }

    return (
        user.role == 'manager' ?
            <>

                <div>
                    <h1>All Lends</h1>
                    {error && <div>{error}</div>}

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
                                    {isLendingOlderThanOneMonth(lend) && <button type='button' onClick={() => sendEmail(lend)}>send email</button>}
                                </li>
                            ))}
                        </ul>

                    }

                </div>
                {error&&<div>{error}</div>}
            </>
            : <Navigate to='/subscription/home' />
    );
}

export default AllLends;