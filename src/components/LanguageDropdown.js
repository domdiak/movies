import React from "react";

const LanguageDropdown = ({ languages, handleChangeFilters }) => {
    return (
        <>
            <select
                name="language"
                onChange={(e) =>
                    handleChangeFilters(e.target.value, e.target.name)
                }
            >
                {languages.map((language, index) => (
                    <option key={index} value={language.id}>
                        {" "}
                        {language.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default LanguageDropdown;
