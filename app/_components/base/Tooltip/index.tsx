// External Dependencies
import { twJoin } from 'tailwind-merge';

// Style Variables
const tooltipPositionStyles = {
  top: {
    tooltip: 'left-1/2 -translate-x-1/2 bottom-full mb-2',
    arrow:
      'left-1/2 -translate-x-1/2 top-full border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#757575]',
  },
  right: {
    tooltip: 'top-1/2 -translate-y-1/2 left-full ml-2',
    arrow:
      'top-1/2 -translate-y-1/2 right-full border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-[#757575]',
  },
  bottom: {
    tooltip: 'left-1/2 -translate-x-1/2 top-full mt-2',
    arrow:
      'left-1/2 -translate-x-1/2 bottom-full border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[#757575]',
  },
  left: {
    tooltip: 'top-1/2 -translate-y-1/2 right-full mr-2',
    arrow:
      'top-1/2 -translate-y-1/2 left-full border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-[#757575]',
  },
};

// Type Definitions
type TooltipProps = {
  children: React.ReactNode;
  content?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

// Component Definition
export default function Tooltip(props: TooltipProps) {
  const { children, content = '', position = 'bottom' } = props;

  return (
    <div role='tooltip' className='group relative'>
      {children}
      {content !== '' ? (
        <div
          className={twJoin(
            'absolute hidden w-max rounded bg-[#757575] px-2 py-1 text-xs text-white group-hover:block',
            tooltipPositionStyles[position].tooltip,
          )}
        >
          {content}
          <div className={twJoin('absolute h-0 w-0', tooltipPositionStyles[position].arrow)} />
        </div>
      ) : null}
    </div>
  );
}
