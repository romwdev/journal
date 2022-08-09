import React from 'react';
import { useState } from 'react';
import Login from './Login.jsx';
import axios from 'axios';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');

  const getUser = (user, callback) => {
    axios.get('/users', {
      params: user
    })
      .then((results) => {
        console.log(results.data);
        callback(results.data);
      })
      .catch((err) => { console.error(err) })
  }

  return (
    <div>
      <h1 className='title'>{currentUser ? `${currentUser.username}'s Journal` : 'Journal'}</h1>
      <Login getUser={getUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  )
}

export default App;