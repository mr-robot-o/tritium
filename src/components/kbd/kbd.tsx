import type { ComponentProps } from 'react';
import { Keyboard } from 'react-aria-components';
import './kbd.css';

export type KbdProps = ComponentProps<typeof Keyboard>;

export function Kbd({ className, ...props }: KbdProps) {
  return <Keyboard {...props} className={className ? `tritium-kbd ${className}` : 'tritium-kbd'} />;
}
