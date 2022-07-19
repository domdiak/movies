import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
    return (
        <>
            <h1> Stuff is loading atm</h1>
            <Oval color="#00BFFF" height={80} width={80} />
        </>
    );
};

export default Loader;
