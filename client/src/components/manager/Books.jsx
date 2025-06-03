import React, { useState, useEffect, useContext} from 'react';
import {GET} from '../general/queries'
import CreateNew from '../acts/CreateNew';
import Sort from '../acts/Sort';
import Search from '../acts/Search';
import Delete from '../acts/Delete';
import Edit from '../acts/Edit';
import { Context } from "../general/Routers";
import { Navigate } from 'react-router-dom';
import Nav from './Nav';
function Books() {
  const [books, setBooks] = useState({ all: [], search: [] });
  const [findFieldsVal, setFindFieldsVal] = useState({ id: "", name: "", authorName: "", category: "", shelf: "", isAvailable:"" })
  const [error, setError] = useState(null)
  const [ user ] = useContext(Context)
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
        setError(e.message)
      }
    }
    fetchBooks();
  }, []);

  return (
    user.role == 'manager' ?
      <>
      <Nav/>
        {Object.values(findFieldsVal).every(field => field === '') &&
          <CreateNew type='Books' fields={['name','authorName','category','img','cost','shelf']} newObjInit={{ }} setArr={setBooks} isSimpleArrObjects={false}/>}
        <div>
          <h1>All Books</h1>
          {error && <div>{error}</div>}

          <Sort arrObjs={books} setArrObjs={setBooks} sortFields = {['id', 'name', 'authorName','category','shelf','isAvailable']}/>
          <Search arrObjs={books} setArrObjs={setBooks} fields={['id', 'name', 'authorName','category','shelf','isAvailable']} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false}/>
          {books.search.length == 0
            ?
            <p className='noResaults'> no resaults </p >
            :
            <ul className='ul'>
              {books.search.map((book, i) => (
                <li key={i}>
                  <div className='bookItem'>
                    <p>{book.id}</p>
                    <p>{book.isAvailable}</p>
                    <img src={book.img} alt={book.name} width="100" height="80"/>
                    <Edit obj={book} arrObjs={books} setArrObjs={setBooks} type='books' displayFields={['name','authorName','category','img', 'cost','shelf']} isSimpleArrObjects={false}/>
                    <Delete id={book.id} type='books' setArrObjs={setBooks} isSimpleArrObjects={false}/>
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

export default Books;