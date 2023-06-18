import React from "react";
import { Book } from "../types";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/rootStore";

interface ListItemProps {
    book: Book;
}

const BookDetails: React.FC<ListItemProps> = observer(({ book }) => {
    const { pushBreadcrumbs, selectedBook } = useRootStore();

    const handleDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const label = target.getAttribute('data-label');
        if(label === "Category" && book.volumeInfo.categories) {
            pushBreadcrumbs({
                type:"subject",
                value:book.volumeInfo.categories[0]
            });
        }
        if(label === "Publisher" && book.volumeInfo.publisher) {
            pushBreadcrumbs({
                type:"inpublisher",
                value:book.volumeInfo.publisher
            });
        }
    }

    return (
        <>{(selectedBook && selectedBook.id === book.id) && (
            <>
                <div className="bookDetails">
                    <div className="detailPiece">
                        <h4>Category</h4>
                        <div className="valueWithTooltip" data-label="Category" onClick={handleDetailClick}>
                            {book.volumeInfo.categories ? book.volumeInfo.categories : "(No data)"}
                            <span className="tooltipText">See more books on this subject!</span>
                        </div>
                    </div>
                    <div className="detailPiece">
                        <h4>Publisher</h4>
                        <div className="valueWithTooltip" data-label="Publisher" onClick={handleDetailClick}>
                            {book.volumeInfo.publisher ? book.volumeInfo.publisher : "(No data)"}
                            <span className="tooltipText">See more books from this publisher!</span>
                        </div>
                    </div>
                    <div className="detailPiece">
                        <h4>Published Date</h4>
                        <div data-label="Date">
                            {book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "(No data)"}
                        </div>
                    </div>
                </div>
                <details>
                    <summary>Book description</summary>
                    <p>{book.volumeInfo.description ? book.volumeInfo.description : "Sorry, no description available."}</p>
                </details>
            </>
        )}</>
    );
});

export default BookDetails;