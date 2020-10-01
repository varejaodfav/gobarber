declare namespace NodeJS {
  export interface ProcessEnv {
    API_PORT: number;
    API_URL: string;
    API_AUTH_KEY: string;
    API_AUTH_EXPIRES: string;
  }
}
