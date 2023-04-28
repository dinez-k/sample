import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
    url: 'http://103.108.220.162:8080/auth',
    realm: 'scrapify',
    clientId: 'portal'
});

export default keycloak;
