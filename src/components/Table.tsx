import React from 'react';
import ListItem from './ListItem';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/rootStore';
const Table: React.FC = observer( function Table () {
    const { content } = useRootStore()

    return (
        <table>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Title</th>
                    <th>Authors</th>
                </tr>
            </thead>
            <tbody>
                {content && content.length //Checking if there are books to show
                    ? content.map((book, index) => 
                        <ListItem key={book.id} index={index} book={book} />
                    ) : ( 
                        <tr>
                            <td colSpan={3}> 
                                {content 
                                    ? "Sorry, no books found" 
                                    : "Loading data..."
                                }
                                {/* Showing suitable message - undefined means loading, empty array means no books */}
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    );
});

export default Table;