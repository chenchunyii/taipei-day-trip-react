export interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message: string;
}

export interface MemberInfo {
  Id: number;
  Nickname: string;
  Email: string;
}
