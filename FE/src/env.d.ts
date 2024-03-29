interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_SIGNUP_CODE: string;
  readonly NG_APP_OPENAI_KEY: string;
  readonly NG_APP_YAHOO_CLIENT_ID: string;
  readonly NG_APP_YAHOO_CLIENT_SECRET: string;
  [key: string]: any;
}