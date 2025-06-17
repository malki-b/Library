import { useState, useEffect } from 'react';
import { GET } from '../general/queries'
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import FilterButton from '../acts/FilterButton';
import { useNavigate } from "react-router-dom";

function DisplayBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState({ all: [], filtered: [], search: [] });
    const [findFieldsVal, setFindFieldsVal] = useState({ id: "", name: "", authorName: "", category: "", shelf: "", isAvailable: "" });
    const [message, setMessage] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all books');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await GET('http://localhost:3000/books');
                setBooks({
                    all: data,
                    filtered: data,
                    search: data.map(book => {
                        return { ...book, isEditState: false }
                    })
                });
            }
            catch (e) {
                setMessage({ txt: e.message, className: 'error' });
            }
        }
        fetchBooks();
    }, []);

    return (
        <div className='page backgroundColorPage'>
            <div className="books-container">
                <button onClick={() => navigate('/')}>Home</button>
                <h1>All Books</h1>
                {message && <div className={message.className}>
                    <span >{message.txt}</span>
                    <button className={message.className} onClick={() => setMessage(null)}>ok</button>
                </div>}
                <FilterButton setArrObjs={setBooks} btnTxt={'available books'} func={(book) => book.isAvailable == 'available'} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <FilterButton setArrObjs={setBooks} btnTxt={'all books'} func={() => true} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <Sort arrObjs={books} setArrObjs={setBooks} sortFields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']} />
                <Search arrObjs={books} setArrObjs={setBooks} fields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']}
                     findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
                {books.search.length === 0
                    ?
                    <p className='noResaults'> no results </p>
                    :
                    <ul>
                        {books.search.map((book, i) => (
                            <li key={i}>
                                <div className={book.isAvailable}>
                                    <img src={book.img} alt={book.name} width="200px" height="200px" />
                                    {['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable'].map((field, i) =>
                                        (<p key={i}>{field}: {book[field]}</p>)
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
}

export default DisplayBooks;
