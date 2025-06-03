import React, { useState, useEffect, useContext } from 'react';
import { GET } from '../general/queries'
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
function AllLends() {
    const [lends, setLends] = useState({ all: [], search: [] });
    const [findFieldsVal, setFindFieldsVal] = useState({ bookId: "", subscriptionId: "", lendDate: "", returnDate: "" })
    const [error, setError] = useState(null)
    const [user] = useContext(Context)
    const fieldsArr = ['bookId', 'subscriptionId', 'lendDate', 'returnDate']
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

    return (
        user.role == 'manager' ?
            <>

                <div>
                    <h1>All Lends</h1>
                    {error && <div>{error}</div>}

                    <Sort arrObjs={lends} setArrObjs={setLends} sortFields={fieldsArr} />
                    <Search arrObjs={lends} setArrObjs={setLends} fields={fieldsArr} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
                    {lends.search.length == 0
                        ?
                        <p className='noResaults'> no resaults </p >
                        :
                        <ul className='ul'>
                            {lends.search.map((lend, i) => (
                                <li key={i}>
                                    <div className='lendItem'>
                                        {fieldsArr.map((field, j) => (
                                            <div key={j}>{field}: {lend[field]}</div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>

                    }

                </div>
            </>
            : <Navigate to='/subscription/home' />
    );
}

export default AllLends;