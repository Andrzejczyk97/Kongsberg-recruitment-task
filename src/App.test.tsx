import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import { RootStore, RootStoreContext } from './stores/rootStore';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { fetchAPI } from './api/booksAPI';
import { BreadcrumbPiece } from './types';

test('App should display "Loading" text while fetching data', async () => {
  const originalFetch = global.fetch;

  // Create a mock fetch function that waits for a certain time
  const mockFetch = jest.fn().mockImplementation(() => new Promise(() => {}));

  // Spy on the fetch function
  jest.spyOn(global, 'fetch').mockImplementation(mockFetch);

//   Render The APP
  const rootStore = new RootStore();
  render(
    <RootStoreContext.Provider value={rootStore}>
        <Navbar />
        <Table />
    </RootStoreContext.Provider>
  );

  // Check if the "Loading" text is displayed on the page
  expect(screen.getByText('Loading data...')).toBeInTheDocument();

  // Restore the original fetch implementation
  global.fetch = originalFetch;
});

jest.mock("./api/booksAPI", () => ({
  fetchAPI: jest.fn(),
}));
const mockData = [
  { id: "id1", volumeInfo: { title: "Harry Potter", authors: ["J K Rowling"], categories: ["fantasy"], publisher: "Great Books Publishing", publishedDate: "2000", description: "A book about The Boy who survived."} },
  { id: "id2", volumeInfo: { title: "Lord of The Rings", authors: ["J R R Tolkien"], categories: ["fantasy"], publisher: "Another Great Publisher", publishedDate: "1954", description: "A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring."} }
];

test('App should render data correctly', async () => {
        // Mock the API response with fixed data
    (fetchAPI as jest.Mock).mockResolvedValue(mockData);

    const rootStore = new RootStore();
    const { container } = render(
        <RootStoreContext.Provider value={rootStore}>
            <Navbar />
            <Table />
        </RootStoreContext.Provider>
    );

    // Assert that fetchData is called
    expect(fetchAPI).toHaveBeenCalled();

    // Ensure that data was loaded and rendered
    await waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument());

    // Should render 2 table rows in tbody
    const tbody = container.querySelector('tbody');
    const trElements = tbody?.querySelectorAll("tr");
    const trCount = trElements?.length;
    expect(trCount).toBe(2);

    // Should render provided books data
    expect(screen.queryByText(/Harry Potter/)).toBeInTheDocument();
    expect(screen.queryByText("Lord of The Rings")).toBeInTheDocument();
});

test('App should show details on row selection', async () => {
    (fetchAPI as jest.Mock).mockResolvedValue(mockData);

    const rootStore = new RootStore();
    const { container } = render(
        <RootStoreContext.Provider value={rootStore}>
            <Navbar />
            <Table />
        </RootStoreContext.Provider>
    );

    // Wait until the end of fetching
    await waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument());

    // Get the first tr element and select the row
    const tbody = container.querySelector('tbody');
    const firstTrElement = tbody?.querySelector("tr");
    expect(firstTrElement).toBeInTheDocument();

    if (firstTrElement) {
        fireEvent.click(firstTrElement);
    }

    // Should render correct Harry Potter details
    await waitFor(() => {
        expect(screen.queryByText("2000")).toBeInTheDocument();
        expect(screen.queryByText("fantasy")).toBeInTheDocument();
        expect(screen.queryByText("J K Rowling")).toBeInTheDocument();
    });
});

test('App should add breadcrumb on Author click', async () => {
    (fetchAPI as jest.Mock).mockResolvedValue(mockData);

    const rootStore = new RootStore();
    const { container } = render(
        <RootStoreContext.Provider value={rootStore}>
            <Navbar />
            <Table />
        </RootStoreContext.Provider>
    );

    // Wait until the end of fetching
    await waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument());

    // Get the first Author's name element and click on it
    const firstDiv = container.querySelector('div.authorName') as HTMLDivElement;
    fireEvent.click(firstDiv);

    // Should add item to path
    await waitFor(() => {
        expect(rootStore.path).toHaveLength(1);
    });

    // Path item should be correct
    expect(rootStore.path[0].type).toBe("inauthor");
    expect(rootStore.path[0].value).toBe("J K Rowling");
});

test('Breadcrumb click should set a correct query and cut the breadcrumbs', async () => {
    const breadcrumbs: BreadcrumbPiece[] = [
        { type: "inauthor", value: "BreadCrumb1" },
        { type: "inauthor", value: "BreadCrumb2" },
        { type: "subject", value: "BreadCrumb3" }
    ];

    (fetchAPI as jest.Mock).mockResolvedValue(mockData);

    const rootStore = new RootStore();
    rootStore.setBreadcrumbs(breadcrumbs);

    render(
        <RootStoreContext.Provider value={rootStore}>
            <Navbar />
            <Table />
        </RootStoreContext.Provider>
    );

    // Wait until the end of fetching
    await waitFor(() => {
        expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
        expect(screen.queryByText("BreadCrumb1")).toBeInTheDocument();
        expect(screen.queryByText("BreadCrumb2")).toBeInTheDocument();
        expect(screen.queryByText("BreadCrumb3")).toBeInTheDocument();
    });

    const breadcrumb2 = screen.queryByText("BreadCrumb2") as HTMLElement;
    fireEvent.click(breadcrumb2);
    // should call the api with correct data
    expect(fetchAPI).toHaveBeenLastCalledWith("inauthor:BreadCrumb2");
    // should splice the path array.
    expect(rootStore.path).toHaveLength(2);
});
