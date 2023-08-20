interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_SIGNUP_CODE: string;
  // Add your environment variables below
  readonly NG_APP_OPENAI_KEY: string;
  // You can add more variables as needed
  [key: string]: any;
}