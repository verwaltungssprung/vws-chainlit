import { cn } from '@/lib/utils';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomDropdown({
  options,
  defaultValue,
  value,
  onValueChange,
  placeholder = 'Select...',
  className
}: CustomDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || value || options[0]?.value || ''
  );

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  const currentValue = value !== undefined ? value : selectedValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          'h-10 w-fit min-w-[100px] rounded-full bg-white dark:bg-background border border-border px-4 text-sm font-medium text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-colors',
          className
        )}
      >
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
