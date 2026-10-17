import type { ComponentProps } from 'react';
import { Separator as AriaSeparator } from 'react-aria-components';
import './separator.css';

export type SeparatorProps = ComponentProps<typeof AriaSeparator>;

export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  const base = `tritium-separator tritium-separator--${orientation}`;
  return (
    <AriaSeparator
      {...props}
      orientation={orientation}
      className={className ? `${base} ${className}` : base}
    />
  );
}
