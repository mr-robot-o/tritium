import { useContext, type ComponentProps, type ReactNode } from 'react';
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from 'input-otp';
import './input-otp.css';

export { REGEXP_ONLY_DIGITS };

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type InputOTPProps = Omit<ComponentProps<typeof OTPInput>, 'render' | 'children'> & {
  /** Content of the field: `InputOTPGroup`s and `InputOTPSeparator`s holding `InputOTPSlot`s. */
  children?: ReactNode;
  /** Marks the field as invalid. */
  isInvalid?: boolean;
};

/**
 * A one-time-code field drawn as separate boxes over a single real input, built on `input-otp`.
 * Typing, pasting, backspace, arrow keys and the browser's SMS autofill all work. Set
 * `maxLength` and give it an `aria-label`. Use `pattern={REGEXP_ONLY_DIGITS}` for numeric codes.
 */
export function InputOTP({ className, containerClassName, children, isInvalid, ...props }: InputOTPProps) {
  return (
    <OTPInput
      autoComplete="one-time-code"
      aria-invalid={isInvalid || undefined}
      {...props}
      data-invalid={isInvalid || undefined}
      containerClassName={cx('tritium-input-otp', containerClassName)}
      className={cx('tritium-input-otp__input', className)}
    >
      {children}
    </OTPInput>
  );
}

/** A run of slots drawn as one joined box. */
export function InputOTPGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cx('tritium-input-otp__group', className)} />;
}

export type InputOTPSlotProps = ComponentProps<'div'> & {
  /** Position of the character this box shows, starting at 0. */
  index: number;
};

export function InputOTPSlot({ index, className, ...props }: InputOTPSlotProps) {
  const { slots } = useContext(OTPInputContext);
  const slot = slots[index];
  const { char, hasFakeCaret, isActive } = slot ?? {};
  return (
    <div
      {...props}
      data-active={isActive || undefined}
      className={cx('tritium-input-otp__slot', className)}
    >
      {char}
      {hasFakeCaret && (
        <span className="tritium-input-otp__caret" aria-hidden="true" />
      )}
    </div>
  );
}

/** A dash between groups. */
export function InputOTPSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="separator"
      {...props}
      className={cx('tritium-input-otp__separator', className)}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M5 8h6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
