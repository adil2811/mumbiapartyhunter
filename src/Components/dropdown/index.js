import React, { useState, useEffect, useRef } from 'react';

const SelectedButton = () => {

    const options = ["rating", "Date", "Trending"];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    
    const buttonRef = useRef(null);

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        closeDropdown();

    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (buttonRef.current && !buttonRef.current.contains(event.target) && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex justify-center items-center mt-2'>
            <div className="relative inline-block">
                <div
                    ref={buttonRef}
                    className="px-4 py-2 text-white bg-gray-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    {selectedOption} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </div>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {options.map((option) => (
                                <li key={option}>
                                    <button
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedButton;
