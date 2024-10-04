import { createContext, useContext } from 'react';

import { ReactNode } from 'react';

export interface ICommonsContext {
  portal: string;
}

const CommonsContext = createContext<ICommonsContext>({ portal: '' });

export const CommonsConfig = () => useContext(CommonsContext);

export const CommonsProvider = ({ config, children }: { config: ICommonsContext; children: React.ReactNode }) => (
  <CommonsContext.Provider value={config}>{children}</CommonsContext.Provider>
);

export enum PortalNameType {
  ADVISOR = 'advisor',
  RETAIL = 'retail',
}

export interface INavDataType {
  label: string;
  path: string;
  icon: () => ReactNode;
}

