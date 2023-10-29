let DEBUG = true;
let host = "http://127.0.0.1:8000";
let stripePublishKey =
  "pk_test_51LeuVyGw2Eh7fxU3fDMc83gz7JTG4HL87hDY29G0qjQvZRWA4rTelOYKAFgpSYGuI9fRC0j0hmijdviFAx1xfgdw00Fq2BvzDq";
if (DEBUG === false) {
  host = "";
  stripePublishKey = "";
}

export { stripePublishKey };

export const APIEndpoint = `${host}/api`;

export const fileUploadURL = `${APIEndpoint}/demo/`;
export const facialRecognitionURL = `${APIEndpoint}/upload/`;
export const emailURL = `${APIEndpoint}/email/`;
export const changeEmailURL = `${APIEndpoint}/change-email/`;
export const changePasswordURL = `${APIEndpoint}/change-password/`;
export const billingURL = `${APIEndpoint}/billing/`;
export const subscribeURL = `${APIEndpoint}/subscribe/`;
export const APIkeyURL = `${APIEndpoint}/api-key/`;
export const cancelSubscriptionURL = `${APIEndpoint}/cancel-subscription/`;

export const loginURL = `${host}/rest-auth/login/`;
export const signupURL = `${host}/rest-auth/registration/`;
