export interface User {
  login: { uuid: string };
  name: { title: string; first: string; last: string };
  email: string;
  location: { city: string; country: string };
  picture: { medium: string };
}
