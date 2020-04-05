const login = async (user) => {
  return await fetch('http://localhost:8000/token-auth/', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(user)
  })
}

const getLoggedInUser = async () => {
   return await fetch('http://localhost:8000/api/current_user/', {
    headers: {
      'Content-Type' : 'application/json',
      Authorization : `JWT ${localStorage.getItem('token')}`
    }
  })
}

const createNewUser = async (newUser) => {
  return await fetch('http://localhost:8000/api/users/', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(newUser)
  })
}

const fetchCategories = async () => {
  let userResponse  = await getLoggedInUser()
  let userId = await userResponse.json()
  let res = await fetch(`http://localhost:8000/api/category/${userId.id}/list/`, {
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    }
  })
  let data = await res.json()
  return data
}

const createCategories = async (user_id, category) => {
  let res = await fetch(`http://localhost:8000/api/category/${user_id}/create/`, {
    method : 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
     body : JSON.stringify(category)
  })
}

const fetchCategoryDetail = async (category_id) => {
  let res = await fetch(`http://localhost:8000/api/category/${category_id}/detail/`)
  let data = await res.json()
  return data
} 

const editCategory = async (category_id, category_name) => {
  let res = await fetch(`http://localhost:8000/api/category/${category_id}/edit/`, {
    method : 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : `JWT ${localStorage.getItem('token')}`,
    },
     body : JSON.stringify(category_name)
  })
  let data = await res.json()
  return data
}

const deleteCategory = async (category_id) => {
  let res = await fetch(`http://localhost:8000/api/category/${category_id}/delete/`, {
    method : 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : `JWT ${localStorage.getItem('token')}`,
    },
  })
  let data = await res.json()
  return data
}

const fetchWordList = async (category_id) => {
  let res = await fetch(`http://localhost:8000/api/category/${category_id}/word-list/`, {
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    }
  })
  let data = await res.json()
  return data 
}

const wordDetail = async (word_id) => {
  let res = await fetch(`http://localhost:8000/api/word/${word_id}/detail/`, {
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    }
  })
  let data = await res.json()
  return data 
}

const createWord = async (word_obj, category_id) => {
  return await fetch(`http://localhost:8000/api/category/${category_id}/word/create/`, {
    method : 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
     body : JSON.stringify(word_obj)
  })
}

const editWord = async (word_id, word_obj) => {
  return await fetch(`http://localhost:8000/api/word/${word_id}/edit/`, {
    method : 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    },
     body : JSON.stringify(word_obj)
  })
}

const deleteWord = async (word_id) => {
  let res = await fetch(`http://localhost:8000/api/category/${word_id}/del/`, {
    method : 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : `JWT ${localStorage.getItem('token')}`,
    },
  })
  let data = await res.json()
  return data
}

export default {
  login,
  getLoggedInUser,
  createNewUser,

  // CRUD CATEGORIES
  fetchCategories,
  createCategories,
  fetchCategoryDetail,
  editCategory,
  deleteCategory,

  // CRUD WORD
  fetchWordList,
  createWord,
  deleteWord,
  wordDetail,
  editWord,
}