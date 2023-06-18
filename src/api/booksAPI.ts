export async function fetchData(query: string) {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${query}"`);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("error fetching data");
      return undefined;
    }
  }
  