# Dynamic Table with Row Selection and Breadcrumb Functionality

You can see the project [here](https://dynamic-table-task.surge.sh/)

This project is a React.js application that demonstrates the skills in building a dynamic table with row selection and breadcrumb functionality. The application fetches data from an API endpoint and populates the table dynamically. 
- The table is populated with some starting data.
- You can select any row by clicking on it - the detailed information will be shown underneath. 
- Clicking on Author, Category or Publisher will show You relevant books.
- For example: If You click on "Jo Nesbo" from authors You will be shown his books. "Jo Nesbo" will be added to breadcrumbs. Now if You click on Publisher of one of his books - the publisher will be added to breadcrumbs. You can return to Jo Nesbo in any while by clicking the breadcrumb.
- The app is also provided with a search bar. Just enter a phrase and hit 'search' - the table will be populated with relevant books.

## Project Structure

The project follows a typical React.js project structure:

- `src/`: This directory contains the source code of the application.
  - `components/`: This directory contains React components used in the application.
  - `api/`: This directory contains the code for fetching data from the API endpoint.
  - `App.js`: The main component that renders the application.
  - `index.js`: The entry point of the application.
- `public/`: This directory contains the public assets and the HTML file used as the entry point for the application.


## Stack

The following technologies and libraries were used in this project:

- TypeScript 
- React.js
- SASS
- Google Books API

Please ensure you have a stable internet connection to fetch data from the API endpoint.

## Conclusion

This project demonstrates the implementation of a dynamic table with row selection and breadcrumb functionality using React.js. The application fetches data from an API, populates the table, allows row selection, displays detailed data, and provides breadcrumb navigation. The project's code is organized, readable, and follows React.js best practices, ensuring a responsive and visually appealing user experience.

Feel free to explore and modify the code to enhance the application further!
