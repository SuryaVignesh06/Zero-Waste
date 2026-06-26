"use client";

interface ChipOption {
  id: string;
  label: string;
}

interface ChipSelectorProps {
  options: ChipOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
  scrollable?: boolean;
}

export function ChipSelector({ options, selectedId, onSelect, className = "", scrollable = false }: ChipSelectorProps) {
  return (
    <div className={`flex gap-2 ${scrollable ? 'overflow-x-auto pb-2 scrollbar-hide' : 'flex-wrap'} ${className}`}>
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-body-md transition-colors ${
              isSelected 
                ? "bg-bg-card-dark text-text-on-dark shadow-dark" 
                : "bg-bg-input text-text-primary hover:bg-black/5"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
