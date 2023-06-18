import React from "react";
import { Book } from "../types";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/rootStore";
import BookDetails from "./BookDetails";

interface ListItemProps {
    book: Book;
    index: number;
}

const ListItem: React.FC<ListItemProps> = observer(({ book, index }) => {
    const { pushBreadcrumbs, selectedBook, setBookSelected } = useRootStore();
    const handleBookSelect = () => {
        if(selectedBook !== book) setBookSelected(book);
        else setBookSelected(undefined);
    }
    return (
        <>
            <tr key={book.id} onClick={handleBookSelect} className={ (selectedBook && book.id === selectedBook.id) ? "selected" : ""}>
                <td data-label="Result number" >{index+1}</td>
                <td data-label="Title" >{book.volumeInfo.title}</td>
                <td data-label="Author">
                {
                    book.volumeInfo.authors
                        ? <div className="authorName" onClick={() => pushBreadcrumbs({ type: "inauthor", value: book.volumeInfo.authors?.[0]})}>
                           {book.volumeInfo.authors.length === 1
                                ? book.volumeInfo.authors[0]
                                : `${book.volumeInfo.authors[0]} and others`}
                            <span className="tooltipText">See more books from this author!</span>
                        </div>
                        : "Author unknown"
                }
                </td>
            </tr>
            {(selectedBook && selectedBook.id === book.id) && 
                <tr className="detailsRow">
                    <td colSpan={3}>
                        <BookDetails book={book}/> 
                    </td>
                </tr>
            }
        </>
    );
});

export default ListItem;