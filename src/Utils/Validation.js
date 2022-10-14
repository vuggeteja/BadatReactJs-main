/* eslint-disable import/prefer-default-export */
export const codeValidation = (value) => {
    if (value === '' || /^[0-9]+$/.test(value)) {
      return true;
      
    }
    return false;
  };
  export const codeValidationQuestion = (value) => {
    if (value === '' || /^[0-9?]+$/.test(value)) {
      return true;
    }
    return false;
  };
  export const alphaValidation = (value) => {
    if (value === '' || /^([a-z A-Z])+$/.test(value)) {
      return true;
    }
    return false;
  };
  export const alphaSpecialValidation = (value) => {
    if (value === '' || /^([a-zA-Z().: /,])+$/.test(value)) {
      return true;
    }
    return false;
  };
  export const alphaNumericValidation = (value) => {
    if (value === '' || /^[a-z0-9A-Z]+$/.test(value)) {
      return true;
    }
    return false;
  };
  export const CurrencyValidation = (value) => {
    if (value === '' || /^[0-9.]+$/.test(value)) {
      return true;
    }
    return false;
  };
  export const codeSlash = (value) => {
    // eslint-disable-next-line no-useless-escape
    if (value === '' || /\d+(\/{1,2})?$/.test(value)) {
      return true;
    }
    return false;
  };
  