import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls, Description, Heading, Stories, Title } from '@storybook/addon-docs/blocks';
import { Pagination } from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { totalPages: 10, defaultPage: 1 },
  argTypes: {
    totalPages: { description: 'Total number of pages.', control: 'number' },
    page: { description: 'The current page, starting at 1. Makes the component controlled.', control: 'number' },
    defaultPage: { description: 'The initial page when uncontrolled.', control: 'number' },
    siblingCount: { description: 'Page numbers shown on each side of the current page.', control: 'number' },
    onPageChange: { description: 'Called with the new page when the user picks one.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Navigation between pages of content. It renders a labelled `<nav>` with Previous and Next buttons and page numbers; the current page is marked `aria-current="page"` and long ranges collapse into ellipses. It does not fetch anything itself: respond to `onPageChange`. Styling comes from Bezel CSS variables, and the stable `tritium-pagination` class is available for overrides.',
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
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MiddlePage: Story = { args: { totalPages: 20, defaultPage: 10 } };

export const FewPages: Story = { args: { totalPages: 4 } };

export const LastPage: Story = { args: { totalPages: 10, defaultPage: 10 } };
