interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly SIGNUP_CODE: string;
  // Add your environment variables below
  readonly OPENAI_KEY: string;
  // You can add more variables as needed
  [key: string]: any;
}