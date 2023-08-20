import { environment } from '../environments/environment'

export const getServerUrl = () => {
  if (environment.production) {
    return 'https://paynroll-server.onrender.com'
  } 
  return "http://localhost:9000";
}