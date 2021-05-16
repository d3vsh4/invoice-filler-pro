import BASE_URL from './BaseUrl';

const RequestURIs = {};
const URIs = {
    LOGIN: 'api/login/account'
}


Object.keys(URIs).forEach(key => {
    if (URIs.hasOwnProperty(key)) {
        RequestURIs[key] = BASE_URL + URIs[key];
    }
});

export default URIs;