import React from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { RootStoreContext, rootStore } from './stores/rootStore';

export const App: React.FC = () => {
    return (
		<RootStoreContext.Provider value={rootStore}>
			<div className="appContainer">
				<Navbar/>
				<Table/>
			</div>
		</RootStoreContext.Provider>
    );
};
