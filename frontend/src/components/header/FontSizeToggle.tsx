import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { useFontSize } from '../FontSizeProvider';

interface Props {
  className?: string;
}

export function FontSizeToggle({ className }: Props) {
  const { fontSize, setFontSize } = useFontSize();

  const fontSizeOptions: Array<'14' | '16' | '18'> = ['14', '16', '18'];
  const currentIndex = fontSizeOptions.indexOf(fontSize);

  const decreaseFontSize = () => {
    if (currentIndex > 0) {
      setFontSize(fontSizeOptions[currentIndex - 1]);
    }
  };

  const increaseFontSize = () => {
    if (currentIndex < fontSizeOptions.length - 1) {
      setFontSize(fontSizeOptions[currentIndex + 1]);
    }
  };

  const isMinSize = currentIndex === 0;
  const isMaxSize = currentIndex === fontSizeOptions.length - 1;

  const fontSizeLabels: Record<'14' | '16' | '18', string> = {
    '14': 'Small font',
    '16': 'Normal font',
    '18': 'Big font'
  };

  const tooltipText = fontSizeLabels[fontSize];

  return (
    <div
      className={cn(
        'flex items-center gap-0 rounded-full bg-secondary border border-border overflow-hidden',
        className
      )}
      id="font-size-toggle"
    >
      <button
        onClick={decreaseFontSize}
        disabled={isMinSize}
        className={cn(
          'flex items-center justify-center h-10 px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
        aria-label="Decrease font size"
      >
        <Minus className="size-3.5" />
      </button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center px-3 py-1.5 text-foreground font-bold text-sm min-w-[2rem] cursor-default">
              A
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <button
        onClick={increaseFontSize}
        disabled={isMaxSize}
        className={cn(
          'flex items-center justify-center px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        )}
        aria-label="Increase font size"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
