import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#fff', borderColor: '#8bc34a' }),
    option: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isFocused ? '#dcedc8' : isSelected ? '#8bc34a' : undefined,
        color: '#333',
    }),
    singleValue: (styles) => ({ ...styles, color: '#333' }),
};

const SearchableDropdown = ({ name, value, onChange, options, placeholder = 'Select an option', isRequired = false }) => {
    return (
        <Select
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            styles={customStyles}
            placeholder={placeholder}
            isSearchable
            required={isRequired}
        />
    );
};

export default SearchableDropdown;
