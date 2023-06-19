import { makeAutoObservable, reaction, runInAction } from "mobx";
import React from "react";
import { Book, BreadcrumbPiece } from "../types";
import { fetchAPI } from "../api/booksAPI";

export class RootStore {
    content: Book[] | undefined = undefined;
    path: BreadcrumbPiece[] = [];
    selectedBook: Book | undefined;

    fetchData = async () => {
        this.content = undefined;
        try {
          const data = await fetchAPI(this.query);
          runInAction(() => {
            this.content = data;
          });
        } catch (error) {
          console.error("error fetching data");
        }
    }

    get query(): string {
        if(this.path.length) {
            if(this.path[this.path.length-1].type !== "none")
                return `${this.path[this.path.length-1].type}:${this.path[this.path.length-1].value}`;
            else 
                return this.path[this.path.length-1].value;
        } else return ""
    }
    setBreadcrumbs = (newPath: BreadcrumbPiece[]) => {
        this.path = newPath;
    }
    pushBreadcrumbs = (newElement: BreadcrumbPiece) => {
        this.setBreadcrumbs([...this.path, newElement]);
    }
    setBookSelected = (book: Book | undefined) => {
        this.selectedBook = book
    }
    constructor() {
        this.fetchData()
        makeAutoObservable(this);
        reaction(
            () => this.query,
            () => {
                this.fetchData();
            }
        );
    }
}

export const RootStoreContext = React.createContext<RootStore | null>(null);
export const rootStore = new RootStore();

export function useRootStore() {
    const context = React.useContext(RootStoreContext);
    if (!context) {
        throw new Error("Wrap element with context first!");
    }
    return context;
}
