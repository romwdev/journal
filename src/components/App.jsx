import React from 'react';
import Login from './Login.jsx';
import axios from 'axios';

const App = () => {

  const getUser = (user) => {
    axios.get('/users', {
      params: user
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => { console.error(err) })
  }

  return (
    <div>
      <h1 className='title'>Journal</h1>
      <Login getUser={getUser} />
    </div>
  )
}

export default App;