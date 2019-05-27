'use strict';

const rp = require('request-promise');

function getAccessToken() {
    let options = {
        method: 'POST',
        uri: `https://${process.env.SPEECH_SERVICE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.SPEECH_SERVICE_KEY
        }
    }
    return rp(options);
}

module.exports.token = async (event, context, callback) => {
    try {
        const accessToken = await getAccessToken();
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(accessToken),
        };
        return response;
    } catch(error) {
        console.error(error);
        const response = {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Unable to fetch token.',
        };
        return response;
    }
};