import React from 'react';
import {
  Card,
  Button,
  Form,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import UserAPI from '../../api/UserAPI';

const removeWord = async (event, word_id) => {
  event.preventDefault()
  let res = await UserAPI.deleteWord(word_id)
  console.log(res)
}

const Word = (props) => {
  return (
    props.words.map((word, index) => {
      return (
        <div key = {index} >
          <Form onSubmit={(event)=>removeWord(event, word.id)} >
            <Card style={{backgroundColor: 'RGBA(255,255,255,0.25)', borderRadius:'15px'}}>
              <Card.Body>
                <Card.Title>
                  <b>{word.word}</b>
                </Card.Title>
                <hr/>
                <Card.Text>
                <b>Definition:</b> <br />
                  {word.definition}
                </Card.Text>
                <Button type='submit'>Remove</Button>
                  <Link to = {`/category/word/${word.id}/edit/`}> 
                    <Button>
                      Edit
                    </Button>
                  </Link>
              </Card.Body>
            </Card>
          </Form>
        </div>
      )
    })
  )
}

export default Word