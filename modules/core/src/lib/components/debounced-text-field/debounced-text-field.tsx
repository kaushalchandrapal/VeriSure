import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { RHFTextField } from '../hook-form';

interface DebouncedSearchInputProps {
  label: string;
  name: string;
  delay?: number;
  onSearch: (query: string) => void;
  resetValuesFunction?: () => void;
  methods: UseFormReturn;
}

const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  label,
  methods,
  name,
  delay = 3000,
  onSearch,
  resetValuesFunction,
  ...textFieldProps
}) => {
  const [value] = useState<string>('');

  return <RHFTextField label={label} name={name} value={value} {...textFieldProps} />;
};

export default DebouncedSearchInput;
