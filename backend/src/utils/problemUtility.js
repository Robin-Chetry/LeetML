const getLanguageById = (lang) => {

    const language = {
        python: 71,
        javascript: 63,
        java: 62,
        "c++": 54
    };

    return language[lang.toLowerCase()];
};

module.exports = {
    getLanguageById
};