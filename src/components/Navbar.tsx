import React from 'react';
import SearchBar from './SearchBar';
import Breadcrumbs from './Breadcrumbs';

const Navbar: React.FC = () => {
    return (
        <nav>
            <Breadcrumbs/>
            <SearchBar/>
        </nav>
    );
};

export default Navbar;