export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      categories: string[];
      publisher: string;
      publishedDate: string;
      description: string;
    };
}
export interface BreadcrumbPiece {
    type: "inauthor" | "subject" | "inpublisher" |"none" ;
    value: string;
}

  