import { createLivePreviewRelay } from '@bezel-labs/crystal';

// Bezel embeds this Storybook; the manager forwards live-preview messages
// one hop down to the preview iframe, where the receiver (preview.tsx) applies them.
createLivePreviewRelay({
  allowedOrigins: ['https://app.bezel.new'],
  getTargetWindow: () =>
    (document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null)?.contentWindow,
  targetOrigin: window.location.origin,
});
