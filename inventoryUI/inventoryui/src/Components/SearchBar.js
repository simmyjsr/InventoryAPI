import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
    <input
        type="text"
        placeholder="Search by name or price"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '10px'
        }}
    />
);

export default SearchBar;
