export interface SignAuthPayload {
  email: string
  password: string
}

export interface SignAuthResponse {
  authToken: string
  expiresIn?: number | null
  id?: number | null
}
export interface LoggedInUser {
  id: string;
  email: string;
  token: string;
  username: string;
  city: string;
}
