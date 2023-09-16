export const environment = {
    production: false,
    version: require('../../package.json').version,
    site: 'https://thechampguess.ru/api',
    serverEndpoint: 'https://thechampguess.ru/api/wp-json/rest/',
    loginEndpoint: 'https://thechampguess.ru/api/?rest_route=/simple-jwt-login/v1/auth',
    validateTokenEndpoint: 'https://thechampguess.ru/api/?rest_route=/simple-jwt-login/v1/auth/validate',
};