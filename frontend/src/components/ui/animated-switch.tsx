import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { type ReactNode, createContext, useContext } from 'react';

interface SwitchContainerProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: ReactNode;
}

type SwitchItemProps = {
  value: string;
  label?: string;
  disabled?: boolean;
  badge?: {
    text: string;
    className?: string;
  };
  children?: ReactNode;
  className?: string;
};

interface SwitchContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const SwitchContext = createContext<SwitchContextValue | null>(null);

function useSwitchContext(): SwitchContextValue {
  const ctx = useContext(SwitchContext);
  if (!ctx) {
    throw new Error('SwitchItem must be used within a SwitchContainer');
  }
  return ctx;
}

export function SwitchContainer({
  value,
  onValueChange,
  className,
  children
}: SwitchContainerProps) {
  return (
    <div
      className={cn(
        'relative flex w-fit items-center justify-between rounded-full px-px border border-border backdrop-blur-sm cursor-pointer h-11 flex-row bg-muted',
        className
      )}
    >
      <SwitchContext.Provider value={{ value, onValueChange }}>
        {children}
      </SwitchContext.Provider>
    </div>
  );
}

export function SwitchItem({
  value,
  label,
  disabled,
  badge,
  children,
  className
}: SwitchItemProps) {
  const { value: activeValue, onValueChange } = useSwitchContext();
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => !disabled && onValueChange(value)}
      disabled={disabled}
      data-active={isActive ? 'true' : 'false'}
      className={cn(
        'group relative z-1 px-3 py-2 h-10 flex items-center justify-center w-full',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        {
          'z-0': isActive
        },
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 rounded-full bg-card border border-border shadow-sm"
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 100,
            damping: 15,
            velocity: 1
          }}
        />
      )}
      <span
        className={cn(
          'relative block text-sm font-medium duration-200 shrink-0',
          disabled
            ? 'text-muted-foreground/50'
            : isActive
            ? 'text-black dark:text-white'
            : 'text-muted-foreground'
        )}
      >
        {children ?? label ?? value.charAt(0).toUpperCase() + value.slice(1)}
        {badge && (
          <span
            className={cn(
              'ml-2 text-xs font-semibold text-secondary-foreground bg-secondary border border-border py-0.5 w-[calc(100%+1rem)] px-1 rounded-full',
              badge.className
            )}
          >
            {badge.text}
          </span>
        )}
      </span>
    </button>
  );
}
