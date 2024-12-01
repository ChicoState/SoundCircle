
interface FilterButtonProps {
    text: string;           // Button Text
    selected: boolean;      // Toggle for visuals (to be handled via onClick)
    onClick: () => void;    // This elevates the onClick to be handled by a parent component
}

const FilterButton = ({text, selected, onClick}: FilterButtonProps) => {
    return (
        <button
            // Toggle the visuals based on the selected boolean
            className={`px-4 py-2 w-full text-start font-semibold text-lg rounded-lg transition: ease-in-out duration-300
                ${selected 
                ? 'text-search_textSelected bg-gradient-to-r from-search_filterButtonSelected to-transparent to-90% pointer-events-none' 
                : 'text-search_textDefault hover:bg-gradient-to-r from-search_filterButtonHovered to-transparent to-70% hover:text-search_textHovered'}
            `}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default FilterButton;