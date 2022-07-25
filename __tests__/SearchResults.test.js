import { screen } from "@testing-library/react";
import { render } from "../utils/tests_utils";

import App from "../App.js";
import SearchResults from "../src/components/SearchResults.js";
import Theme from "../theme/theme.js";

import { server } from "../__mocks__/server.js";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test("renders SearchResults component with the correct first result", async () => {
    render(<SearchResults />);
    const heading = await screen.findByText(/Jurassic World Dominion/i);
    expect(heading).toBeInTheDocument();

    const description = await screen.findByText(
        /Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world./i
    );
    expect(description).toBeInTheDocument();

    const genres = await screen.findByText(
        "Adventure | Action | Science Fiction",
        { exact: true }
    );

    expect(genres).toBeInTheDocument();

    const rating = await screen.findByText("7", { exact: true });

    expect(rating).toBeInTheDocument();

    screen.debug();
});

test("it renders all 20 results", async () => {
    render(<SearchResults />);

    const movieItems = await screen.findAllByTestId("movieItem");
    expect(movieItems).toHaveLength(20);
});
