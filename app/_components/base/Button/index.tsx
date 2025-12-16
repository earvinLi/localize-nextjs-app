'use client';

// External Dependencies
import { twJoin } from 'tailwind-merge';

// Style Variables
// Todo: find better solutions for dynamic styles here considering variants like color, size, etc.
const buttonVariantStyle = {
  text: 'text-[#03A9F4] hover:bg-slate-50 hover:border-slate-400 focus-visible:bg-slate-50 focus-visible:border-slate-400 active:bg-slate-50 active:border-slate-400 disabled:pointer-events-none disabled:text-[#616161] disabled:bg-transparent disabled:opacity-50 disabled:shadow-none',
  outlined:
    'border border-[#03A9F4] text-[#03A9F4] hover:bg-slate-50 hover:border-[#039BE5] focus-visible:bg-slate-50 focus-visible:border-[#039BE5] active:bg-slate-50 active:border-[#039BE5] disabled:pointer-events-none disabled:text-[#616161] disabled:bg-transparent disabled:border-[#E0E0E0] disabled:opacity-50 disabled:shadow-none',
  contained:
    'bg-[#03A9F4] text-white shadow-sm hover:bg-[#039BE5] hover:border-transparent focus-visible:bg-[#039BE5] focus-visible:border-transparent active:bg-[#039BE5] active:border-transparent disabled:pointer-events-none disabled:text-[#616161] disabled:bg-[#E0E0E0] disabled:opacity-50 disabled:shadow-none',
};

// Type Definitions
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined' | 'link';
  disabled?: boolean;
  variantClassname?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
};

// Component Definition
export default function Button(props: ButtonProps) {
  const {
    children,
    onClick = undefined,
    variant = 'text',
    disabled = false,
    variantClassname = '',
    icon = null,
    iconPosition = 'start',
  } = props;

  if (variant === 'link') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={twJoin(
          'cursor-pointer border-none text-sm text-[#03A9F4] underline',
          variantClassname,
        )}
      >
        {children}
      </button>
    );
  }

  // Todo: whether we need to double validate 'variant' here like 'AuthModal'
  return (
    <button
      disabled={disabled}
      type='button'
      onClick={onClick}
      className={twJoin(
        'flex h-[40px] w-fit cursor-pointer flex-row items-center rounded-md px-4 py-2 text-center text-base transition-all',
        buttonVariantStyle[variant],
        variantClassname,
      )}
    >
      {icon && iconPosition === 'start' && <div className='mr-2.5'>{icon}</div>}
      {children}
      {icon && iconPosition === 'end' && <div className='ml-2.5'>{icon}</div>}
    </button>
  );
}
