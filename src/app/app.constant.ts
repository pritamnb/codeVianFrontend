import { environment } from '../environments/environment';
export class HttpConstants {
  /* Http.Service Constants */
  static CONTENT_TYPE = 'Content-Type';
  static CONTENT_TYPE_VALUE = 'application/json';
  static API_KEY = 'api-key';
  static AUTH_TOKEN = 'auth-token';
}
export class ApiEndPoints {
  static USER = {
    REGISTER: environment.API_URL + '/api/user/register',
    LOGIN: environment.API_URL + '/api/login',
    ME: environment.API_URL + '/api/user/me',
  };
}
