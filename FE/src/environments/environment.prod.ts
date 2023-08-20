export const environment = {
  production: true,
  signupCode: import.meta.env['SIGNUP_CODE'] || 'default-signup-code',
  openAiKey: import.meta.env['OPENAI_KEY'] || 'default-openai-key',
};
