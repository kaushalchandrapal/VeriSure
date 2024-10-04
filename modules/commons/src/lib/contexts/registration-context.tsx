import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { IRegistrationState } from '@verisure-types';

export const initialRegistationState: IRegistrationState = {
  registrationMethod: '',
  accountType: '',
  fcaDetails: {
    advisorFCANumber: '',
    individualSelected: '',
    firmSelected: {
      name: '',
      reference: '',
      roles: [],
    }
  },
  personalDetails: {
    email: '',
    phoneNumber: '',
    countryCode: {
      label: '',
      name: '',
      phone: '',
    },
    lastName: '',
    firstName: '',
    middleName: '',
    companyName: '',
    companyNumber: '',
    companyAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      country: '',
      postalCode: '',
      combined: '',
    },
  },
  verification: {
    emailOTPSessionID: '',
    mobileOTPSessionID: '',
    isEmailVerified: false,
    isPhoneVerified: false,
    emailCode: '',
    phoneCode: '',
  },
  skip: false
};

interface RegistrationContextType {
  registrationState: IRegistrationState;
  setRegistrationState: React.Dispatch<React.SetStateAction<IRegistrationState>>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

interface RegistrationContextProviderProps {
  children: ReactNode;
}

export const RegistrationContextProvider = ({ children }: RegistrationContextProviderProps) => {
  const [registrationState, setRegistrationState] = useState<IRegistrationState>(() => {
    const savedState = sessionStorage.getItem('registrationState');
    return savedState ? JSON.parse(savedState) : initialRegistationState;
  });

  useEffect(() => {
    sessionStorage.setItem('registrationState', JSON.stringify(registrationState));
  }, [registrationState]);

  const registrationStateValue = useMemo(() => ({ registrationState, setRegistrationState }), [registrationState, setRegistrationState]);

  return <RegistrationContext.Provider value={registrationStateValue}>{children}</RegistrationContext.Provider>;
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrationContext must be used within a RegistrationContextProvider');
  }
  return context;
};
