import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, REGEXP_ONLY_DIGITS } from './input-otp';

const meta = {
  title: 'Components/Input OTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number', description: 'Number of characters in the code.' },
    disabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A one-time-code field drawn as separate boxes, built on `input-otp`. It is a single real input underneath, so paste, backspace, arrow keys and SMS autofill behave like a normal field. Give it an `aria-label`. Styling comes from Bezel CSS variables, and the stable `tritium-input-otp` class is available for overrides.',
      },
      page: () => (
        <>
          <Title />
          <Description />
          <Stories title="Examples" includePrimary />
          <Heading>Props</Heading>
          <Controls />
        </>
      ),
    },
  },
  args: { maxLength: 6, 'aria-label': 'One-time code' },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DigitsOnly: Story = { args: { pattern: REGEXP_ONLY_DIGITS } };

export const Invalid: Story = { args: { isInvalid: true, defaultValue: '123456' } };

export const Disabled: Story = { args: { disabled: true, defaultValue: '123' } };

export const FourDigitPin: Story = {
  args: { maxLength: 4, pattern: REGEXP_ONLY_DIGITS },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Controlled: Story = {
  args: { pattern: REGEXP_ONLY_DIGITS },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <InputOTP {...args} value={value} onChange={setValue}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <span>{value === '' ? 'Enter your code.' : `You entered: ${value}`}</span>
      </div>
    );
  },
};
