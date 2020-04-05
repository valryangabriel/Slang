import React, { useState, useEffect } from 'react'
import {
  Form,
  Button
} from 'react-bootstrap';
import UserAPI from '../../api/UserAPI';

const EditWord = (props) => {

  const [word, setWord] = useState([])

  useEffect(()=> {
    getWord()
  },[])

  const getWord = async () => {
    let res = await UserAPI.wordDetail(props.match.params.word_id)
    setWord(res)
  }
  
  const saveEdit = async (event) => {
    event.preventDefault()
    let word_edit = event.target.word.value
    let defin = event.target.def.value

    let word_obj = {
      word: word_edit,
      definition: defin,
    }
    let res = await UserAPI.editWord(word.id, word_obj)
    let data = await res.json()
    console.log(res)
  }

  return(
    <Form onSubmit = {saveEdit}>
      <Form.Group >
        <Form.Label>Word</Form.Label>
        <Form.Control name='word' type="text" placeholder={word.word} required/>
      </Form.Group>

      <Form.Group >
        <Form.Label>Definition</Form.Label>
        <Form.Control name='def' type="textbox" placeholder={word.definition} required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  )
}

export default EditWord