import { render, screen } from "@testing-library/react";
import App from "../App.js";
import SearchResults from "../src/components/SearchResults.js";

describe("App", () => {
    test("renders App component", () => {
        render(<SearchResults />);
        screen.getByRole("");
        screen.debug();
    });
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
