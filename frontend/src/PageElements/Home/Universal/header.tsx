import SearchBar from "../../../Components/Searchbar";
import SCLogo from "../../../Components/SoundCircle.gif";
import UserIcon from "../../../Components/UserIconTemp.png";

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-periwinkle to-RoyalBlue flex flex-col items-center py-5">
            {/* Left Logo */}
            <img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }} className="absolute top-0 left-0 m-2" />
            
            {/* Center Searchbar */}
            <SearchBar className="w-full max-w-3xl"/>

            {/* Rigth User */}
            <img src={UserIcon} alt="SC Logo" style={{ width: '50px', height: '50px' }} className="absolute top-0 right-0 m-2" />
        </header>
    );
}

export default Header;