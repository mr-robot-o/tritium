import { createContext } from 'react';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'default' | 'lg';

// ToggleGroup provides this so its toggles share one variant and size.
export const ToggleGroupContext = createContext<{
  variant?: ToggleVariant;
  size?: ToggleSize;
}>({});
