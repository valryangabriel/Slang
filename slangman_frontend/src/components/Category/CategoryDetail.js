import React, { useState, useEffect } from 'react';
import UserAPI from '../../api/UserAPI';
import Word from '../Word/Word';
import WordForm from '../Word/WordForm'
import {
  Form, Button
} from 'react-bootstrap';
import './CategoryDetail.css'

const CategoryDetail = (props) => {
  const [category, setCategory] = useState([])
  const [words, setWords] = useState([])

  useEffect(()=>{
    getCategory()

    if (props.match.params.category_id)
      getWords(props.match.params.category_id)

  },[])

  const getWords = async (category_id) => {
    let res = await UserAPI.fetchWordList(category_id)
    setWords(res)
  }

  const getCategory = async () => {
    let category_id = props.match.params.category_id
    let res = await UserAPI.fetchCategoryDetail(category_id)
    setCategory(res)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    let category_name = evt.target.category_name.value

    if (category_name == '') {
      category_name = category.name
    }

    category_name = {
      name : category_name,
    }
    let res = UserAPI.editCategory(category.id, category_name)
    console.log(res)
  }

  const handleDelete = async () => {
    let res = await UserAPI.deleteCategory(category.id)
    console.log(res)
  }

  return(
    <div style={{marginTop: '10%'}}>
      <div style={{backgroundColor: 'RGBA(255,255,255,0.55)', borderRadius:'15px', padding: '5% 0%', marginBottom: '2%'}}>
        <h1 style={{textAlign:'center'}}>Edit Category: {category.name}</h1>
        <Form onSubmit = {handleSubmit} style={{width: '50%', margin:'auto', marginBottom: '5%'}}>
          <Form.Group>
            <Form.Label>Edit Category</Form.Label>
            <Form.Control name='category_name' type="text" placeholder={category.name}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Form>
      </div>

      
      {
        words.length > 0
        ?
        <div style={{marginBottom: '5%'}}>
          <div>
            <WordForm 
              categoryId = {props.match.params.category_id}
            />
          </div>

          <div style={{background: 'RGBA(255,255,255,0.55)', borderRadius:'15px', marginTop: '2%', padding: '5%'}}>
            <h1 style={{textAlign:'center',marginBottom:'2%'}}>Saved Words</h1>
            <Word words = {words} />
          </div>
        </div>
        :
        <div>
           <div>
            <WordForm 
              categoryId = {props.match.params.category_id}
            />
          </div>

          <div style={{background: 'RGBA(255,255,255,0.55)', padding: '5%',textAlign: 'center', marginTop: '2%', marginBottom:'10%', borderRadius: '15px'}}>
            <h2>No Saved Words Yet...</h2>
          </div>
        </div>
      }
    </div>
  )
}

export default CategoryDetail