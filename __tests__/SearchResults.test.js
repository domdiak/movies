import { render, screen } from "@testing-library/react";
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

test("renders App component", async () => {
    render(
        <Theme>
            {" "}
            <SearchResults />
        </Theme>
    );
    await screen.findByText(/Jurassic World Dominion/i);
    screen.debug();
});

// 20 results are displayed
// each contains: image, title, genres, description, score

// it("renders the first container", () => {

//     expect(true).toBe(true);

//     const heading = screen.getByRole("heading", {
//         name: /Minions: The Rise of Gru/i,
//     });

//     expect(heading).toBeInTheDocument();
// });
