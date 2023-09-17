export const environment = {
    production: true,
    site: 'https://thechampguess.ru/api',
    version: require('../../../package.json').version,
    serverEndpoint: 'http://thechampguess.ru/api/wp-json/rest/',
    authEndpoint: 'https://thechampguess.ru/api/?rest_route=/simple-jwt-login/v1',
};