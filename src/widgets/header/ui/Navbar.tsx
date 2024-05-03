import React, { useState } from 'react';
import logo from '../constant/img/logo.jpeg';
import { SearchIcon } from '../../../shared/icons/Icons';
import {useNavigate} from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    let debounceTimer: NodeJS.Timeout;

    const fetchSuggestions = async (query: string) => {
        try {
            if (query.trim() !== '') {
                const response = await fetch(`http://localhost:8000/autocomplete/?query=${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setSuggestions(data.suggestions);
                } else {
                    console.error('Failed to fetch suggestions:', response.statusText);
                }
            } else {
                // Clear suggestions when the query is empty
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchSuggestions(newQuery);
        }, 300); // Adjust the debounce delay as needed (e.g., 300 milliseconds)
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-x-12 items-center">
                <img src={logo} className="h-[40px]" alt="logo" onClick={() => navigate("/")}/>
                <div className="flex gap-x-6 text-gray-400">
                    <span className="text-white">Home</span>
                    <span>Recommendation</span>
                    <span>My account</span>
                </div>
            </div>
            <div className="relative">
                <div className="absolute left-[3px] top-1/2 transform -translate-y-1/2 text-white">
                    <SearchIcon />
                </div>
                <input
                    className="pl-7 border-[1px] border-white bg-black w-[260px] h-[35px] outline-none text-white"
                    type="text"
                    placeholder="Titles, movies, serials"
                    value={query}
                    onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                    <ul className="absolute bg-black text-white rounded-lg mt-[15px] w-[260px] z-20">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-700" onClick={() => navigate(`/movie/${suggestion.slice(0, -6)}`)}>
                                {suggestion.slice(0, -6)} {/* Remove last 6 characters */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
