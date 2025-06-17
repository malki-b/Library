import React, { useState, useEffect, useContext } from 'react';
import { GET } from '../general/queries'
import CreateNew from '../acts/CreateNew';
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import Delete from '../acts/Delete';
import Edit from '../acts/Edit';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import Nav from './Nav';
function Books() {
  const [books, setBooks] = useState({ all: [], filtered: [], search: [] });
  const [findFieldsVal, setFindFieldsVal] = useState({ id: "", name: "", authorName: "", category: "", shelf: "", isAvailable: "" })
  const [message, setMessage] = useState(null)
  const [user] = useContext(Context)
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
        setMessage({ txt: e.message, className: 'error' })
      }
    }
    fetchBooks();
  }, []);

  return (
    user && user.role == 'manager' ?
      <div className='page backgroundColorPage'>
        <Nav />
        {Object.values(findFieldsVal).every(field => field === '') &&
          <CreateNew type='Books' fields={['name', 'authorName', 'category', 'img', 'cost', 'shelf']} newObjInit={{}} setArr={setBooks} isSimpleArrObjects={false} setMessage={setMessage} />}
        <div>
          <h1>All Books</h1>
          {message && <div className={message.className}>
            <span >{message.txt}</span>
            <button className={message.className} onClick={() => setMessage(null)}>ok</button>
          </div>}

          <Sort arrObjs={books} setArrObjs={setBooks} sortFields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']} />
          <Search arrObjs={books} setArrObjs={setBooks} fields={['id', 'name', 'authorName', 'category', 'shelf', 'isAvailable']} 
            findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false} />
          {books.search.length == 0
            ?
            <p className='noResults'> no resaults </p >
            :
            <ul className='ul'>
              {books.search.map((book, i) => (
                <li key={i}>
                  <div className={book.isAvailable}>
                    <p>{book.id}</p>
                    <p>{book.isAvailable}</p>
                    <img src={book.img} alt={book.name} width="100" height="80" />
                    <Edit obj={book} arrObjs={books} setArrObjs={setBooks} type='books' displayFields={['name', 'authorName', 'category', 'cost', 'shelf']} isSimpleArrObjects={false} setMessage={setMessage} />
                    <Delete id={book.id} type='books' setArrObjs={setBooks} isSimpleArrObjects={false} setMessage={setMessage} />
                  </div>
                </li>
              ))}
            </ul>
          }

        </div>
      </div>
      : <Navigate to='/home' />
  );
}

export default Books;