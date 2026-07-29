const axios = require("axios");

const CODEBOX_URL = process.env.CODEBOX_URL;
const CODEBOX_AUTH_TOKEN = process.env.CODEBOX_AUTH_TOKEN;

async function executeCode({
    sourceCode,
    languageId,
    stdin = "",
    expectedOutput = null
}) {
    try {
        const response = await axios.post(
            `${CODEBOX_URL}/submissions?wait=true`,
            {
                source_code: sourceCode,
                language_id: languageId,
                stdin,
                expected_output: expectedOutput
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": CODEBOX_AUTH_TOKEN
                }
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data?.message ||
                error.response.data?.error ||
                JSON.stringify(error.response.data)
            );
        }

        throw error;
    }
}

module.exports = {
    executeCode
};