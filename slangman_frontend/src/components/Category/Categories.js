import React, { useState, useEffect } from 'react';
import UserAPI from '../../api/UserAPI';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  ListGroup,
  Card,
} from 'react-bootstrap';

const Categories = (props) => {

  useEffect(()=> {
    getCategories()
  },[])

  const [wordList, setWordList] = useState(null)
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    let data = await UserAPI.fetchCategories()
    setCategories(data)
  }

  const RenderCategories = () => {
    return categories.map((category, index) => {
        return(
          <ListGroup.Item key ={index} style={{backgroundColor: 'RGBA(255,255,255,0.25)'}}>
            <Link to={`category/${category.id}/detail/`}>
              {category.name}
            </Link>
        </ListGroup.Item>
        )
    })
  }

  const createCategoryBtn = async (event) => {
    event.preventDefault()
    let categoryName = event.target.categoryName.value
    let userResponse  = await UserAPI.getLoggedInUser()
    let userId = await userResponse.json()
    let category = {
      'name' : categoryName,
    }
    await UserAPI.createCategories(userId.id, category)
    window.location.reload()
  }
  console.log(props.isLoggedIn)
  return (
    <div>
      {
        props.isLoggedIn
        ?
        <div>
          <Card style={{ margin:'auto', textAlign:'center'}}>
            <Card.Header>Categories</Card.Header>
            <ListGroup variant="flush">
              <RenderCategories />
            </ListGroup>
          </Card>
          <br />

          <Form onSubmit={(event) => {createCategoryBtn(event)}} style={{margin: 'auto', textAlign: 'center', width: '50%'}}>
            <Form.Group>
              <Form.Label><b>Create Category </b></Form.Label>
              <Form.Control name='categoryName' type="text" placeholder="Enter Name Here" />
            </Form.Group>
            <Button type='submit' variant='primary'>Add Category</Button>
          </Form>
    
        </div>
        :
        <></>
      }
  
    </div>
  )
}

export default Categories
