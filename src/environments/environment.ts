export const environment = {
  production: false,
  appEnvironment: 'desenvolvimento local',
  url: 'http://localhost:8080',
  urlApi: 'http://localhost:8080/api',
  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'http://127.0.0.1:4200/authorized',
  logoutRedirectToUrl: 'http://127.0.0.1:4200'
};
