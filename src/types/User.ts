export interface User {
  login: { uuid: string };
  name: { title: string; first: string; last: string };
  email: string;
  location: { city: string; country: string; street: string };
  picture: { medium: string };
}
