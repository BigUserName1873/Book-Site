import PokeCard from "../components/PokeCard"
import { useState, useEffect } from "react"
import { searchPokemon, getRandomPokemonList } from "../services/api"
import "../css/Home.css"
 
function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [pokemons, setPokemon] = useState([])  
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
 
 
    useEffect(() => {
      const loadRandomPokemon = async () => {
          try {
              const randomPokemon = await getRandomPokemonList();
              setPokemon([...pokemons, ...randomPokemon]); // Correctly update state
              console.log(randomPokemon);
          } catch (err) {
              console.log(err);
              setError("Failed to load Pokémon...");
          } finally {
              setLoading(false);
          }
      };
  
      loadRandomPokemon();
  }, []);
    
      const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
    
        setLoading(true);
        try {
            const searchResult = await searchPokemon(searchQuery);
    
            // Ensure `setPokemon` always receives an array
            setPokemon(Array.isArray(searchResult) ? searchResult : [searchResult]);
            setError(null);
        } catch (err) {
            console.log(err);
            setError('Failed to search Pokémon...');
        } finally {
            setLoading(false);
        }
      };
    
      return (
        <div className="home">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for pokemon..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
    
            {error && <div className="error-message">{error}</div>}
    
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="movies-grid">
              {console.log(pokemons)}
              {console.log('Pokemons:', pokemons)}
              {pokemons.map((pokemon) => (
                <PokeCard pokemon={pokemon} key={pokemon.id} />
              ))}
            </div>
          )}
        </div>
      );
    }
    
    export default Home;