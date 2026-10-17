import type { ComponentProps } from 'react';
import './aspect-ratio.css';

export type AspectRatioProps = ComponentProps<'div'> & {
  /** Width divided by height, for example `16 / 9`. Defaults to 1 (square). */
  ratio?: number;
};

export function AspectRatio({ className, style, ratio = 1, ...props }: AspectRatioProps) {
  return (
    <div
      {...props}
      className={className ? `tritium-aspect-ratio ${className}` : 'tritium-aspect-ratio'}
      style={{ aspectRatio: ratio, ...style }}
    />
  );
}
