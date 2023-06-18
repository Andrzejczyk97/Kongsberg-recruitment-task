import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/rootStore';

const SearchBar: React.FC = observer(() => {
  	const { pushBreadcrumbs } = useRootStore();

	const handleSearch = () => {
        const input = document.getElementById("searchInput") as HTMLInputElement;
        const value = input.value;
        if(value !== "") pushBreadcrumbs({type:"none", value:value});
    }

	return (
		<div className='searchBar'>
			<input id="searchInput" type="text" placeholder='Title, author, publisher...'/>
			<button type="submit" onClick={handleSearch}>Search</button>
		</div>
	);
});

export default SearchBar;