import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
} from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { Button, type ButtonProps } from '../button/button';
import './carousel.css';

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;
type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];
type EmblaPlugins = Parameters<typeof useEmblaCarousel>[1];

type CarouselContextValue = {
  viewportRef: UseEmblaCarouselType[0];
  api: UseEmblaCarouselType[1];
  orientation: 'horizontal' | 'vertical';
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('Carousel parts must be used inside a <Carousel>.');
  return context;
}

const cx = (base: string, className?: string) => (className ? `${base} ${className}` : base);

export type CarouselProps = ComponentProps<'div'> & {
  /** Direction the slides scroll in. */
  orientation?: 'horizontal' | 'vertical';
  /** Embla options, for example `{ loop: true, align: 'start' }`. */
  opts?: EmblaOptions;
  /** Embla plugins, for example autoplay. */
  plugins?: EmblaPlugins;
  /** Receives the Embla API once it is ready, to read or control the carousel. */
  setApi?: (api: EmblaApi) => void;
};

/**
 * A swipeable row of slides, built on Embla Carousel. Put a `CarouselContent` of `CarouselItem`s
 * inside, and optionally `CarouselPrevious` and `CarouselNext`. Arrow keys scroll while it has
 * focus. Give it an `aria-label`.
 */
export function Carousel({
  orientation = 'horizontal',
  opts,
  plugins,
  setApi,
  className,
  children,
  onKeyDownCapture,
  ...props
}: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  );
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on('reInit', onChange).on('select', onChange);
      return () => {
        api.off('reInit', onChange).off('select', onChange);
      };
    },
    [api],
  );
  const canScrollPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false);
  const canScrollNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false);

  useEffect(() => {
    if (api) setApi?.(api);
  }, [api, setApi]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDownCapture?.(event);
    if (event.defaultPrevented) return;
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (event.key === prevKey) {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      scrollNext();
    }
  };

  const value = useMemo(
    () => ({ viewportRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }),
    [viewportRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext],
  );

  return (
    <CarouselContext.Provider value={value}>
      <div
        role="region"
        aria-roledescription="carousel"
        {...props}
        onKeyDownCapture={handleKeyDown}
        data-orientation={orientation}
        className={cx('tritium-carousel', className)}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/** The scrolling track that holds the slides. */
export function CarouselContent({ className, ...props }: ComponentProps<'div'>) {
  const { viewportRef, orientation } = useCarousel();
  return (
    <div ref={viewportRef} className="tritium-carousel__viewport">
      <div
        {...props}
        data-orientation={orientation}
        className={cx('tritium-carousel__content', className)}
      />
    </div>
  );
}

/** One slide. It takes the full width by default; set `flex-basis` through `className` to show more. */
export function CarouselItem({ className, ...props }: ComponentProps<'div'>) {
  const { orientation } = useCarousel();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      {...props}
      data-orientation={orientation}
      className={cx('tritium-carousel__item', className)}
    />
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' | 'up' | 'down' }) {
  const paths = {
    left: 'M10 3 5 8l5 5',
    right: 'm6 3 5 5-5 5',
    up: 'm3 10 5-5 5 5',
    down: 'm3 6 5 5 5-5',
  } as const;
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={paths[direction]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type CarouselButtonProps = Omit<ButtonProps, 'isIconOnly' | 'onPress' | 'children'>;

/** Scrolls to the previous slide. Disabled at the start unless the carousel loops. */
export function CarouselPrevious({ className, variant = 'outline', size = 'sm', ...props }: CarouselButtonProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      aria-label="Previous slide"
      {...props}
      variant={variant}
      size={size}
      isIconOnly
      isDisabled={!canScrollPrev}
      onPress={scrollPrev}
      className={cx(`tritium-carousel__nav tritium-carousel__nav--previous`, className as string | undefined)}
    >
      <ArrowIcon direction={orientation === 'horizontal' ? 'left' : 'up'} />
    </Button>
  );
}

/** Scrolls to the next slide. Disabled at the end unless the carousel loops. */
export function CarouselNext({ className, variant = 'outline', size = 'sm', ...props }: CarouselButtonProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      aria-label="Next slide"
      {...props}
      variant={variant}
      size={size}
      isIconOnly
      isDisabled={!canScrollNext}
      onPress={scrollNext}
      className={cx(`tritium-carousel__nav tritium-carousel__nav--next`, className as string | undefined)}
    >
      <ArrowIcon direction={orientation === 'horizontal' ? 'right' : 'down'} />
    </Button>
  );
}
