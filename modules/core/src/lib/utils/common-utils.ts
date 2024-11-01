export interface IAddress {
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
  addressLine4?: string;
  city: string;
  county?: string;
  country: string;
  postcode: string;
}

export interface IBusinessAddress {
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  city: string;
  county?: string;
  country: string;
  postcode: string | undefined;
  postalCode: string | undefined;
}

export interface IJwtPayload {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
  sessionTokenID: string;
  userID: string;

  role: string;
}

export interface IPhoneNumberParts {
  countryCode: string;
  phoneNumber: string;
}


export function separatePhoneNumber(phone: string): IPhoneNumberParts {
  const cleanedPhone = phone.replace(/\D/g, '');

  const countryCodeLength = cleanedPhone.length > 10 ? cleanedPhone.length - 10 : 0;

  const countryCode = cleanedPhone.substring(0, countryCodeLength);
  const phoneNumber = cleanedPhone.substring(countryCodeLength);

  return {
    countryCode: countryCode || 'Unknown',
    phoneNumber: phoneNumber || 'Invalid',
  };
}

export function jwtDecode(token: string | null): IJwtPayload | null {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

export const combineAddress = (address: IAddress | IBusinessAddress | any): string => {
  const { addressLine1, addressLine2, addressLine3, addressLine4, city, county, country, postcode } = address;

  const addressParts = [addressLine1, addressLine2, addressLine3, addressLine4, city, county, country, postcode].filter((part) => part?.trim() !== '');

  return addressParts.join(', ');
};

export function combineNames(firstName: string, middleName: string | undefined, lastName: string | undefined): string {
  return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
}
