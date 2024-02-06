interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_SIGNUP_CODE: string;
  readonly NG_APP_OPENAI_KEY: string;
  [key: string]: any;
}