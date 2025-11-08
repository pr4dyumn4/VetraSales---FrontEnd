import { Link } from "react-router-dom";
import "./SearchResults.css";

export const SearchResult = ({ result }) => {
    return (
        <Link to={`/product/${result.id}`} className="search-result-link">
            <div className="search-result">
                <p>{result.name}</p>
            </div>
        </Link>
    );
};
