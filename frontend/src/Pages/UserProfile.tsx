import SCLogo from "../Components/SoundCircle.gif"


const UserProfile = () => {
    return (
    
<div className="min-h-screen flex flex-col">  
    {/*Main Page Container*/}
    <div className="bg-gradient-to-r from-periwinkle to-RoyalBlue flex flex-col items-center py-5 relative">
        {/*Header Section*/}
        <img src={SCLogo} alt="SC Logo" style={{ width: '50px', height: '50px' }} className="absolute top-0 left-0 m-2" />
    
    </div>
    
    <div className="flex flex-grow">
                {/*Main Body Sections*/}

                <div className="bg-gray-900 w-3/4 flex flex-grow">
                    <div>
                    <p>Hello, World</p>
                    <p>TypeScript!</p>
                    </div>;
                </div>
    </div>

    <div className="bg-gray-500 py-3">
                {/*Footer Section*/}
    </div>
</div>  
    );
}



export default UserProfile;