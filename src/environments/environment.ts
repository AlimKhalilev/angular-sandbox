export const environment = {
    production: false,
    version: require('../../package.json').version,
    site: 'https://thechampguess.ru/api',
    serverEndpoint: 'https://thechampguess.ru/api/wp-json/rest',
    authEndpoint: 'https://thechampguess.ru/api/?rest_route=/simple-jwt-login/v1',
};