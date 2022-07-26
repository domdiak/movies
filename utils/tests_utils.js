import React from "react";
import { render } from "@testing-library/react";

import Theme from "../theme/theme.js";

function customRender(component, options) {
    return render(component, { wrapper: Theme, ...options });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
