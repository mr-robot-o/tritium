import { useState, type ComponentProps } from 'react';
import { Button } from '../button/button';
import './pagination.css';

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

// Always shows the first and last page and the current page with `siblings` on each side,
// replacing the gaps with ellipses. The item count stays constant so the control doesn't jump.
function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);
  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showStart = left > 2;
  const showEnd = right < total - 1;
  const edge = siblings * 2 + 3;
  if (!showStart) return [...range(1, edge), 'end-ellipsis', total];
  if (!showEnd) return [1, 'start-ellipsis', ...range(total - edge + 1, total)];
  return [1, 'start-ellipsis', ...range(left, right), 'end-ellipsis', total];
}

const chevron = (direction: 'left' | 'right') => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M10 3.5L5.5 8l4.5 4.5' : 'M6 3.5L10.5 8 6 12.5'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type PaginationProps = Omit<ComponentProps<'nav'>, 'onChange' | 'children'> & {
  /** Total number of pages. */
  totalPages: number;
  /** The current page, starting at 1. Makes the component controlled. */
  page?: number;
  /** The initial page when uncontrolled. */
  defaultPage?: number;
  /** Called with the new page when the user picks one. */
  onPageChange?: (page: number) => void;
  /** How many page numbers to show on each side of the current page. */
  siblingCount?: number;
};

export function Pagination({
  className,
  totalPages,
  page: pageProp,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const page = Math.min(Math.max(pageProp ?? internalPage, 1), Math.max(totalPages, 1));

  const goTo = (next: number) => {
    if (next === page || next < 1 || next > totalPages) return;
    if (pageProp === undefined) setInternalPage(next);
    onPageChange?.(next);
  };

  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={className ? `tritium-pagination ${className}` : 'tritium-pagination'}
    >
      <ul className="tritium-pagination__list">
        <li>
          <Button
            variant="ghost"
            startContent={chevron('left')}
            isDisabled={page <= 1}
            onPress={() => goTo(page - 1)}
          >
            Previous
          </Button>
        </li>
        {getPageItems(page, totalPages, siblingCount).map((item) => (
          <li key={item}>
            {typeof item === 'number' ? (
              <Button
                isIconOnly
                variant={item === page ? 'outline' : 'ghost'}
                aria-label={`Page ${item}`}
                aria-current={item === page ? 'page' : undefined}
                onPress={() => goTo(item)}
              >
                {item}
              </Button>
            ) : (
              <span className="tritium-pagination__ellipsis" aria-hidden="true">
                …
              </span>
            )}
          </li>
        ))}
        <li>
          <Button
            variant="ghost"
            endContent={chevron('right')}
            isDisabled={page >= totalPages}
            onPress={() => goTo(page + 1)}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}
