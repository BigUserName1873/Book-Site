import "../css/PokeCard.css"
import { usePokeContext } from "../context/PokeContext";
import { Link } from "react-router-dom";
 
 
function PokeCard({ pokemon }) {
    const {isFavorite, addToFavorites, removeFromFavorites} = usePokeContext()
    const favorite = isFavorite(pokemon.id)
 
    function onFavoriteClick (e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(pokemon.id)
        else addToFavorites(pokemon)
    }
    return(
        <Link to={`${pokemon.id}`}>
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://pokeapi.co/api/v2/pokemon/${pokemon.sprites.other.showdown.front_default}`} alt={pokemon.name} />
                </div>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ''}`} onClick={onFavoriteClick}>♡</button>
                </div>
            <div className="movie-info">
                <h3>{pokemon.name}</h3>
                <p>{pokemon.types}</p>
            </div>
            
            </div>
        </Link>
 
    )
}
 
export default PokeCard