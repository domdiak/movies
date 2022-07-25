import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";

import Theme from "../theme/theme.js";

// import theme from "~/styles/theme";

// eslint-disable-next-line
// function ProvidersWrapper({ children }) {
//     return (
//         <MemoryRouter>
//             <ThemeProvider theme={theme}>{children}</ThemeProvider>
//         </MemoryRouter>
//     );
// }

function customRender(component, options) {
    return render(component, { wrapper: Theme, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
