import type { Preview } from '@storybook/react-vite'
import { loadGoogleFonts, startLivePreviewReceiver } from '@bezel-labs/crystal'
import '../src/bezel/variables.css'
import { FONTS } from '../src/bezel/fonts'

// Load the fonts Bezel generated (src/bezel/fonts.ts). Re-runs on HMR when `npm run tokens`
// rewrites that file; the crystal receiver below also handles live font changes from Bezel.
loadGoogleFonts(FONTS.map(({ family, weights }) => ({ family, weights: [...weights] })))

// Receives live token CSS from Bezel (relayed by .storybook/manager.ts).
// The manager re-posts each message to this iframe, so the message arrives with the
// manager's origin (this same origin), not Bezel's. Allow both.
startLivePreviewReceiver({ allowedOrigins: ['https://app.bezel.new', window.location.origin] })

// Group props into collapsible sections in every docs table, like react-aria.adobe.com.
// First matching rule wins. Props that match nothing (isPending, isDisabled, children…)
// stay at the top, ungrouped. The array order is also the section order.
const categoryRules: [category: string, test: (name: string) => boolean][] = [
  ['Events', (name) => /^on[A-Z]/.test(name)],
  ['Styling', (name) => ['style', 'className'].includes(name)],
  ['Forms', (name) => /^form/.test(name) || ['name', 'value', 'type'].includes(name)],
  ['Accessibility', (name) => name.startsWith('aria-')],
  [
    'Advanced',
    (name) =>
      [
        'id', 'slot', 'render', 'autoFocus', 'excludeFromTabOrder', 'preventFocusOnPress',
        // Global HTML attributes and React internals that come along with ComponentProps<>.
        'dir', 'lang', 'hidden', 'inert', 'translate', 'suppressHydrationWarning', 'ref', 'key',
      ].includes(name),
  ],
];

const categoryOrder = categoryRules.map(([category]) => category);
const rankOf = (category?: string) => (category ? categoryOrder.indexOf(category) : -1);

const preview: Preview = {
  argTypesEnhancers: [
    ({ argTypes }) =>
      Object.fromEntries(
        Object.entries(argTypes)
          .map(([name, argType]) => {
            const category =
              argType.table?.category ?? categoryRules.find(([, test]) => test(name))?.[0];
            return [
              name,
              category && !argType.table?.category
                ? { ...argType, table: { ...argType.table, category } }
                : argType,
            ] as const;
          })
          // Ungrouped props first, then sections in categoryRules order (sort is stable).
          .sort(([, a], [, b]) => rankOf(a.table?.category) - rankOf(b.table?.category)),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;