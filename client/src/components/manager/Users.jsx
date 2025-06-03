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
function Users() {
  const [users, setUsers] = useState({ all: [], search: [] });
  const [findFieldsVal, setFindFieldsVal] = useState({ id: "", name: "", email: "", address: "", role: "", numOfFamilyMembers:"", debt:"" })
  const [error, setError] = useState(null)
  const [ user ] = useContext(Context)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GET('http://localhost:3000/users');
        setUsers({
          all: data,
          search: data.map(user => {
            return { ...user, isEditState: false }
          })
        });

      }
      catch (e) {
        setError(e.message)
      }
    }
    fetchUsers();
  }, []);

  return (
    user.role == 'manager' ?
      <>
      <Nav/>
        {Object.values(findFieldsVal).every(field => field === '') &&
          <CreateNew type='Users' fields={['name','email','address','role','numOfFamilyMembers', 'debt']} newObjInit={{ }}  setArr={setUsers} isSimpleArrObjects={false}/>}
        <div>
          <h1>All Users</h1>
          {error && <div>{error}</div>}

          <Sort arrObjs={users} setArrObjs={setUsers} sortFields = {['id','name','email','address','role','numOfFamilyMembers','debt']}/>
          <Search arrObjs={users} setArrObjs={setUsers} fields={['id','name','email','address','role','numOfFamilyMembers','debt']} findFieldsVal={findFieldsVal} setFindFieldsVal={setFindFieldsVal} isSimpleArrObjects={false}/>
          {users.search.length == 0
            ?
            <p className='noResaults'> no resaults </p >
            :
            <ul className='ul'>
              {users.search.map((user, i) => (
                <li key={i}>
                  <div className='userItem'>
                    <p>{user.id}</p>
                    <p>{user.role}</p>
                    <Edit obj={user} arrObjs={users} setArrObjs={setUsers} type='users' displayFields={['name','email','address','numOfFamilyMembers','debt']} isSimpleArrObjects={false}/>
                    <Delete id={user.id} type='users' setArrObjs={setUsers} isSimpleArrObjects={false}/>
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

export default Users;