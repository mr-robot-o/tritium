import type { ComponentProps, ReactNode } from 'react';
import './alert.css';

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type AlertVariant = 'default' | 'destructive' | 'info' | 'success' | 'warning';

export type AlertProps = ComponentProps<'div'> & {
  variant?: AlertVariant;
  /** An icon shown before the text. It is decorative and hidden from screen readers. */
  icon?: ReactNode;
};

export function Alert({
  className,
  variant = 'default',
  icon,
  children,
  role = 'alert',
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      role={role}
      className={cx(`tritium-alert tritium-alert--${variant}`, className)}
    >
      {icon != null && (
        <span className="tritium-alert__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="tritium-alert__body">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-alert__title', className)} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-alert__description', className)} />;
}
