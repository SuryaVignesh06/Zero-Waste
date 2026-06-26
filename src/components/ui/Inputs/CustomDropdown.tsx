"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search } from "lucide-react";

interface Option {
  id: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  searchable?: boolean;
  className?: string;
}

export function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select option", 
  label, 
  searchable = false,
  className = "" 
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);
  const displayOptions = searchable 
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative flex flex-col gap-1.5 ${className}`} ref={dropdownRef}>
      {label && <label className="text-body-md text-text-primary ml-1">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass-panel text-text-primary rounded-[30px] h-[56px] px-6 flex items-center justify-between text-left focus:ring-2 focus:ring-accent-gold outline-none transition-shadow"
      >
        <span className={`text-body-lg ${!selectedOption ? 'text-text-muted' : ''} truncate pr-4`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={20} className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-[24px] shadow-float z-50 overflow-hidden"
          >
            {searchable && (
              <div className="p-3 border-b border-border-light relative">
                <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-bg-input/50 rounded-xl h-10 pl-9 pr-3 text-body outline-none"
                  autoFocus
                />
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto p-2 scrollbar-hide">
              {displayOptions.length === 0 ? (
                <div className="py-4 text-center text-text-muted text-body">No options found</div>
              ) : (
                displayOptions.map((opt) => {
                  const isSelected = value === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onChange(opt.id);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${isSelected ? 'bg-accent-gold/10 text-accent-gold-dark font-semibold' : 'hover:bg-bg-input text-text-primary'}`}
                    >
                      <span className="text-body-md">{opt.label}</span>
                      {isSelected && <Check size={18} className="text-accent-gold-dark" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
