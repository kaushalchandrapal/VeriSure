export const KeyMaskType = {
  all: /[^\s\S\d\D]/g,

  alpha: /[^a-z\s]/gi,
  alphaNumeric: /[^a-z0-9\s]/gi,
  alphaNumericWithHyphen: /[^a-z0-9\s-]/gi, // For tenantName, orgName
  alphaSymbols: /[^\D]/gi,

  positiveInteger: /[^\d]/g,
  integer: /[^\d-]/g,

  positiveDecimal: /[^\d.]/g,
  decimal: /[^\d\-.]/g,

  phoneNumber: /[^\d+]/g,
  phoneCountryCode: /[^+\d]/g,

  email: /[^\x21-\x5f|\x61-\x7E]/gi,

  firstAndLastName: /[^a-z-‘’'\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]/gi,
  bankName: /[^a-z-‘’'&,.\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]/gi,
  address: /[^a-z-‘’'&,./\d\s\xC0-\xD6\xD8-\xF6\xF8-\xFF]/gi,
};
