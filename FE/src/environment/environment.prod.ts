export const environment = {
  production: true,
  signupCode: process.env.SIGNUP_CODE || 'default-signup-code',
  openAiKey: process.env['OPENAI_KEY'] || 'default-openai-key',
};
