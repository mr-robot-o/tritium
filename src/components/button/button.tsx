import type { ComponentProps } from 'react';
import { Button as AriaButton } from 'react-aria-components';

export type ButtonProps = ComponentProps<typeof AriaButton>;

export function Button(props: ButtonProps) {
  return <AriaButton {...props} />
}
