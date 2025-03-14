import React from "react";
import '../index.css'

const SearchBox = ({ city, setCity, onSearch }) => {
    return (
        <div className="search-box">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Şehir Giriniz..."
            />
            <button onClick={onSearch}>Ara</button>
        </div>
    );
};

export default SearchBox;
