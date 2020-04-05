let url = `http://api.urbandictionary.com/v0/define?term=`

const fetchWord = async (word) => {
  let res = await fetch(`${url}${word}`) 
  let data = await res.json()
  return data
}

export default {
  fetchWord,
}
