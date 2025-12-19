import { useState } from 'react';
import Image from 'next/image';

const LanguageSwitcher = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const getFlagSrc = (lang) => {
        switch (lang) {
            case 'en':
                return '/images/angleterre.jpg';
            case 'fr':
                return '/images/france.png';
            default: '/images/france.png'
        }
    };

    return (
        <div className="flex items-center gap-2 px-1 py-0 text-gray-900 bg-gray-200 rounded-md z-50">
            <div className="w-[1rem] h-[1rem]">
                <img src={getFlagSrc(language)} alt="Language Flag" className="object-fill w-full h-full rounded-[50%]" />
            </div>
            <select value={language} onChange={handleLanguageChange} className="
             text-sm   border-none rounded  py-1 outline-none font-bold bg-gray-200">
                <option value="en">En</option>
                <option value="fr">Fr</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
