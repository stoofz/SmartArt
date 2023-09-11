import { createContext, useContext, useState } from 'react';

const SearchMode= createContext();

export function useSearchState() {
  return useContext(SearchMode);
}

export function SearchState({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchMode.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchMode.Provider>
  );
}