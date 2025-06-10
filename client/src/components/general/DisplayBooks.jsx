import  { useState, useEffect, useContext } from 'react';
import { GET } from '../general/queries'
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import FilterButton from '../acts/FilterButton';
function DisplayBooks() {
  const [books, setBooks] = useState({ all: [], search: [] });
  const [findFieldsVal, setFindFieldsVal] = useState({ id: "", name: "", authorName: "", category: "", shelf: "", isAvailable: "" })
  const [message, setMessage] = useState(null)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await GET('http://localhost:3000/books');
        setBooks({
          all: data,
          search: data.map(book => {
            return { ...book, isEditState: false }
          })
        });

      }
      catch (e) {
        setMessage({ txt: e.message, className: 'error' })
      }
    }
    fetchBooks();
  }, []);

  return (
      <>
      <div>
          <h1>All Books</h1>
          {message && <div>
            <span className={message.className}>{message.txt}</span>
            <button onClick={() => setMessage(null)}>❌</button>
          </div>}
            <FilterButton setArrObjs={setBooks} btnTxt={'available books'} func={(book) => book.isAvailable == 'available'} />
            <FilterButton setArrObjs={setBooks} btnTxt={'all books'} func={() => true} />
          <Sort arrObjs={books} setArrObjs={setBooks} sortFields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']} />
          <Search arrObjs={books} setArrObjs={setBooks} fields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
          {books.search.length == 0
            ?
            <p className='noResaults'> no resaults </p >
            :
            <ul className='ul'>
              {books.search.map((book, i) => (
                <li key={i}>
                  <div className='bookItem'>
                    <img src={book.img} alt={book.name} width="100" height="80" />
                    {['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable'].map((field, i)=>
                        (<p key={i}>{field}: {book[field]}</p>)
                    )}
                  </div>
                </li>
              ))}
            </ul>
          }

        </div>
      </>
  );
}

export default DisplayBooks;