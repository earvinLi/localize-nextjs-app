'use client';

// External Dependencies
import React, { useState, useRef, useEffect } from 'react';

// Type Definitions
type DropdownMenuOptionProps = {
  name: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  anchorElement: React.ReactNode;
  optionData: DropdownMenuOptionProps[];
};

// Component Definition
export default function DropdownMenu(props: DropdownMenuProps) {
  const { anchorElement, optionData } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleAnchorElement = () => setIsOpen(!isOpen);

  const handleClickDropdownMenuOption = (onClickMenuOption?: () => void) => {
    if (onClickMenuOption) onClickMenuOption();
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block cursor-pointer' ref={dropdownMenuRef}>
      <div onClick={handleToggleAnchorElement}>{anchorElement}</div>
      {isOpen && (
        <ul className='absolute right-0 z-10 mt-2 w-max rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'>
          {optionData.map((optionItem) => {
            const { name, onClick } = optionItem;
            return (
              <li
                key={name}
                onClick={() => handleClickDropdownMenuOption(onClick)}
                className='block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
