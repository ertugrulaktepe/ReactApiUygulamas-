import { useEffect, useState } from "react";
import Recipe from './Recipe'
import "./style.css"
function App() {
  const APP_ID = "9c0d9a2a";
  const APP_KEY = "d588de895f74322ff57e4c8934ee333e";

  const [recipes,setRecipes] = useState([])
  const [search,setSearch] = useState("")
  const [query,setQuery] = useState("chicken")

  useEffect(()=>{
    getApi()
  },[query])
const getApi = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json()
  setRecipes(data.hits);
}
const updateSearch = (e)=>{
  setSearch(e.target.value)
}
const getSearch = (e)=>{
  setQuery(search);
  
  e.preventDefault()
}
  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input type="text" className="search-bar" value={search} onChange={updateSearch} />
      <button type="submit" className="search-button">Search</button>
    </form>
    <div className="recipes">
        {recipes.map(recipe =>(
      <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} img={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
    ))}
    </div>
  
    </div>
  );
}

export default App;
