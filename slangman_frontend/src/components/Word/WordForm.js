import React from 'react'
import UserAPI from '../../api/UserAPI'
import {
  Form,
  Button,
} from 'react-bootstrap'

const WordForm = (props) => {

  const createWord = async (event) => {
    event.preventDefault()
    let word = event.target.word.value
    let def = event.target.def.value
    let word_obj = {
      word : word,
      definition : def,
    }

    let res = await UserAPI.createWord(word_obj, props.categoryId)
    let data = await res.json()
    console.log(data)
  }

  return (
    <div style={{backgroundColor: 'RGBA(255,255,255,0.55)', borderRadius: '15px',padding: '5% 0%'}}>
      <h1 style={{color:'black', textAlign:'center'}}>Create Word</h1>
      <Form onSubmit = {createWord} style={{width:'50%', margin:'auto'}}>
        <Form.Group >
          <Form.Label style={{color:'black', fontSize:'20px'}}>Word</Form.Label>
          <Form.Control name='word' type="text" placeholder="Word" />
        </Form.Group>

        <Form.Group >
          <Form.Label style={{color:'black', fontSize:'20px'}}>Definition</Form.Label>
          <Form.Control name='def' type="textbox" placeholder="definition" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default WordForm