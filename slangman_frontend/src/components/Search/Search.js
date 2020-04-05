import React, { useState, useEffect } from 'react';
import UrbanDictAPI from '../../api/UrbanDictAPI';
import UserAPI from '../../api/UserAPI';
import Joke from '../Joke/Joke';

import {
  Card,
  Modal,
  Form,
  Button,
} from 'react-bootstrap'

const Search = (props) => {
  const [wordList, setWordList] = useState(null)
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState([])
  const [token, setToken] = useState([])

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
    if (token !== 'null' && token !== 'undefined') {
      getUser()
    }
  },[])



  const handleSearchClick = async (event) => {
    event.preventDefault()
    let word = event.target.word.value
    let data = await UrbanDictAPI.fetchWord(word)
    setWordList(data)
    console.log(data)
  }

  const getUser = async () => {
    let res = await UserAPI.getLoggedInUser()
    let data = await res.json()
    setUser(data)
    getCategories()
    console.log('User: ', user)
    console.log('categories: ', categories)
  }

  const getCategories = async () => {
    let res = await UserAPI.fetchCategories()
    setCategories(res)
  }

  const handleSaveBtn = async (event, word, def) => {
    event.preventDefault()
    let category_name = event.target.category_select.value
    let category_id = ''
    categories.forEach(category => {
      if (category.name == category_name) 
        category_id = category.id
    })
    
    // Save to Word and def to Category ID
    let word_obj = {
      word : word,
      definition : def
    }

    let res = await UserAPI.createWord(word_obj, category_id)
    let data = await res.json()
    console.log(data)
  }

  const RenderWords = () => {
    return wordList['list'].map((word, index)=> {
      return (
        <Form onSubmit={(event) => handleSaveBtn(event,word.word, word.definition)} style={{margin:'auto'}}>
          <Card key={index} style={{backgroundColor:'RGBA(255,255,255,0.85)', color:'black',}}>
            <Card.Body>
                <Card.Title name='word'>{word.word}</Card.Title>
                <hr />
              <Card.Text name='definition'>
                <b>Definition:</b> <br/>
                {word.definition}
              </Card.Text>
              {
                token
                ?
                <>
                  <hr/>
                  <Form.Group style={{width: '30%'}}>
                    <Form.Label><b>Categories</b></Form.Label>
                    <Form.Control name='category_select' as="select">
                      {
                        categories.map((category,index)=>{
                          return (<option key={index}>
                            {category.name}
                          </option>)
                        })
                      }
                    </Form.Control>
                  </Form.Group>
                  <Button type='submit'>Save</Button>
                </>
                :
                <></>
              }
            </Card.Body>
          </Card>
        </Form>
      )
    })
  }
  return (
    <div className='container'>
      <div className='search-form'>
        <Form onSubmit = {(event) => handleSearchClick(event)}>
            <p className='search-slang-logo'>Slang</p>
          <Form.Group style={{width: '80%', margin: '0 auto',height: '50px', zIndex: '3', width:'70%'}} >
            <Form.Control name='word' type="input" placeholder="Search for Word Here" /> 
          </Form.Group>
          <div className='search-button'>
            <button variant="dark" type="submit">
              Search
            </button>
            
            <Joke 
              fact = {props.fact}
            />
          </div>
        </ Form>
    </div>

    {
      wordList
      ?
      <div style={{marginBottom: '5%', marginTop: '3%'}}>
        <RenderWords />
      </div>
      :
      null
    }
    </div>
  )
}

export default Search;