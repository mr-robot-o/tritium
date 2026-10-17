import type { MouseEvent } from 'react';

// Clicking the padding or a non-interactive start or end content should focus the input,
// the way clicking inside a plain input does.
export function focusInput(event: MouseEvent<HTMLElement>) {
  const target = event.target as HTMLElement;
  if (target instanceof HTMLInputElement || target.closest('button, a, [role="button"]')) return;
  event.preventDefault();
  event.currentTarget.querySelector('input')?.focus();
}
