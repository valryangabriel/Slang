import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UserAPI from './api/UserAPI';
import Categories from './components/Category/Categories';
import EditWord from './components/Word/EditWord';
import Navigation from './components/Navigation/Navigation';
import CategoryDetail from './components/Category/CategoryDetail';
import Search from './components/Search/Search';
import CategoriesLayout from './components/Category/CategoriesLayout';
import LoginLayout from './components/Login/LoginLayout';

const App = () => {
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [jod, setJod] = useState([])
  const [fact, setFact] = useState([])

  useEffect(() => {
    getLoggedInUser()
    getJoke()
    if (isRegistered)
      setIsRegistered(false)
  },[])

  const getJoke = async () => {
    let res = await fetch('https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts')
    let data = await res.json()

    if (data.all) {
      console.log('inside IFFF')
      console.log()
      let r1 = Math.floor(Math.random() * 200)
      setFact(data.all[r1].text)
    }
  }

  const getLoggedInUser = async () => {
    let token = localStorage.getItem('token')
    if (token !== 'null' && token !== 'undefined') {
      console.log('token: ', token)
      let res = await UserAPI.getLoggedInUser()
      let data = await res.json()
      if (data['detail']) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
        setUser(data)
      }
    } 
  }

  const handleLogin = async (evt) => {
    evt.preventDefault()
    let user = {
      username : evt.target.username.value,
      password : evt.target.password.value
    }
    let res = await UserAPI.login(user)
    let data = await res.json()
    console.log(data.token !== undefined)
    if (data.token !== undefined && data.token !== null) {
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsLoggedIn(true)
    } else {
      alert('Invalid Username or Password')
    }
  }

  const renderLogin = () => {
    return (
      <LoginLayout
      handleLogin = {handleLogin}
      handleSignUp = {handleSignUp}
      isLoggedIn = {isLoggedIn}
      />
    )
  }

  const handleLogout = () => {
    // localStorage.setItem('token', null)
    localStorage.clear()
    setIsLoggedIn(false)
    setUser(null)
  }

  const handleSignUp = async (evt) => {
    evt.preventDefault()
    let newUser = {
      username : evt.target.username.value,
      password : evt.target.pw.value,
      first_name : evt.target.fname.value,
      last_name : evt.target.lname.value,
    }
    let res = await UserAPI.createNewUser(newUser)
    let data = await res.json()
    if (data.username[0] == 'A user with that username already exists.') {
      alert('Username is Already Taken')
    } else {
      setIsRegistered(true)
      alert('Successfully Registered')

    }
  }

  // const renderCategories = () => {
  //   return (
  //     <Categories  
  //       isLoggedIn = {isLoggedIn}
  //     />
  //   )
  // }

    const renderCategories = () => {
    return (
      <CategoriesLayout 
        isLoggedIn = {isLoggedIn}
        fact={fact}
      />
    )
  }

  const renderSearch = () => {
    return (
      <Search 
        isLoggedIn = {isLoggedIn}
        fact={fact}
      />
    )
  }


  

  return (
    <div className="App">
        <Router>
          <Navigation 
            isLoggedIn = {isLoggedIn}
            handleLogout = {handleLogout}
          />
          <div className='container'>
            <Route exact path = '/' render = {renderSearch} />
            <Route exact path = '/login' render = {renderLogin} />
            <Route exact path = '/categories' render = {renderCategories} />
            <Route exact path = '/category/:category_id/detail/' component ={CategoryDetail}/>
            <Route exact path = '/category/word/:word_id/edit/' component = {EditWord} />
          </div>
        </Router>
    </div>
  );
}

export default App;
