'use client';

// External Dependencies
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

// Internal Dependencies
import Tooltip from '@/components/base/Tooltip';

// Type Definitions
type IconButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  variantClassname?: string;
};

// Todo: design different sizes for the icon button
// Component Definition
export default function IconButton(props: IconButtonProps) {
  const {
    icon,
    onClick = undefined,
    disabled = false,
    tooltip = '',
    tooltipPosition = 'bottom',
    variantClassname = '',
  } = props;

  const renderIconButton = () => (
    <button
      disabled={disabled}
      type='button'
      onClick={onClick}
      // Todo: find better ways to deal with long classnames
      className={twJoin(
        'flex h-[42px] w-[42px] cursor-pointer flex-row items-center justify-center rounded-full border border-transparent p-2 transition-all hover:bg-slate-100 focus-visible:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        variantClassname,
      )}
    >
      {icon}
    </button>
  );

  return tooltip && !disabled ? (
    <Tooltip content={tooltip} position={tooltipPosition}>
      {renderIconButton()}
    </Tooltip>
  ) : (
    renderIconButton()
  );
}
