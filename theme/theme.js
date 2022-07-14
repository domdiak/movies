import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        blue1: "#dceaff",
        blue2: "#5576d9",
        blue3: "#1d52f2",

        green1: "#bdf2ed",
        green2: "#81e3d9",
        green3: "#2a9187",

        orange1: "#f2db94",

        pink2: "#f2eae4",

        grey1: "#e4e4e4",
        grey2: "#727272",
        grey3: "#484848",
    },
};

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
