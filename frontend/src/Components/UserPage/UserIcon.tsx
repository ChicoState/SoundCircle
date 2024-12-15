import React, { useState } from "react";
import UserIconTemp from "../Images/UserIconTemp.png";
import DescriptionBox from "./DescriptionBox";
import AppleMusic from './AppleMusic.png';
import X from './X.png';
import AmazonMusic from './AmazonMusic.png';
import Youtube from './Youtube.png';
import Spotify from './Spotify.png';
import Instagram from './Instagram.png';
import SoundCloud from './SoundCloud.png';
import BandCamp from './BandCamp.png';
import UserFollowingPage from './UserGroupsBox';

interface UserImageProps {
    username: string;
    age: number;
    location: string;
    followers: number;
    following: number;
    currentTab: string;
    setCurrentTab:(tab:string) => void;
}

const UserImage: React.FC<UserImageProps> = ({ username,age,location,followers,following,currentTab,setCurrentTab}) => {
    const [userImage, setUserImage] = useState<string>(UserIconTemp);
    const [InstagramLink, isInstagramLoggedIn] = useState<boolean>(false)
    const [TwitterLink, isTwitterLoggedIn] = useState<boolean>(false)
    const [SpotifyLink, isSpotifyLoggedIn] = useState<boolean>(false)
    const [AppleMusicLink, isAppleMusicLoggedIn] = useState<boolean>(false)
    const [YoutubeLink, isYoutubeLoggedIn] = useState<boolean>(false)
    const [SoundCloudLink, isSoundCloudLoggedIn] = useState<boolean>(false)
    const [BandcampLink, isBandcampLoggedIn] = useState<boolean>(false)
    const [AmazonMusicLink, isAmazonMusicLoggedIn] = useState<boolean>(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setUserImage(imageURL);
        }
    };

    return (
        <div className="relative top-[-80px]">
            <div className="relative h-[780px] top-[30px] left-[-70px] flex flex-col items-center z-10">
                <img src={userImage} alt="User Icon" className="w-24 h-24" />
                <label htmlFor="file-input" className="absolute top-[50px] right-[50px] text-2xl text-black cursor-pointer">+</label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <p className="mt-2 text-center">{username}</p>
                <p className="relative mt-0 left-[-25px] text-sm">{age} years old</p>
                <p className="relative mt-0 left-[-35px] text-sm">{location}</p>
            </div>

            {/* Render DescriptionBox as a separate component outside the background */}
            <DescriptionBox />
            
            <div className="relative top-[-400px]">
                <p className="text-md font-bold">Media Links</p>
                {InstagramLink ? (
                    <p className="text-blue-500 italic">
                        <img src={Instagram} alt="Instagram Logo" className="w-[25px] h-[25px]"/>
                        Instagram
                    </p> 
                ):( <p className="text-gray-500 italic flex items-center]">
                        <img src={Instagram} alt="Instagram Logo" className=" w-[45px] h-[25px] ml-[-10px] grayscale"/>
                        Instagram
                    </p>
                )}
                {TwitterLink ? (
                    <p className="text-blue-500 italic">
                        X
                    </p>
                ):( <p className="text-gray-500 italic flex items-center">
                        <img src={X} alt="X Logo" className=" w-[25px] h-[25px] mr-2 grayscale"/>
                        X
                    </p>
                )}
                {SpotifyLink ? (
                    <p className="text-blue-500 italic">
                         Spotify
                    </p> 
                ):( <p className="text-gray-500 italic flex items-center">
                        <img src={Spotify} alt="Spotify Logo" className=" w-[35px] h-[25px] ml-[-5px] grayscale"/>
                         Spotify
                    </p>
                )}
                {AppleMusicLink ? (
                    <p className="text-blue-500 italic">
                        <img src={AppleMusic} alt="Apple Music Logo" className=" w-[25px] h-[25px] mr-2 grayscale"/>
                        Apple Music
                    </p> 
                ) : ( <p className="text-gray-500 italic flex items-center">
                        <img src={AppleMusic} alt="Apple Music Logo" className=" w-[25px] h-[25px] mr-2 grayscale"/>
                        Apple Music
                      </p>
                )}
                {YoutubeLink ? (
                    <p className="text-blue-500 italic flex items-center">
                        <img src={Youtube} alt="Youtube Logo" className="w-[35px] h-[25px] mr-2"/>
                            Youtube
                        </p> 
                    ):( <p className="text-gray-500 italic flex items-center">
                            <img src={Youtube} alt="Youtube Logo" className="w-[35px] h-[25px] ml-[-4px] grayscale"/>
                            Youtube
                        </p>
                    )}
                {SoundCloudLink ? (
                    <p className="text-blue-500 italic flex itmes-center">
                         SoundCloud
                    </p> 
                ):( 
                    <p className="text-gray-500 italic flex items-center">
                        <img src={SoundCloud} alt="SoundCloud logo" className="w-[25px] h-[25px] mr-2 grayscale"/>
                         SoundCloud
                    </p>
                )}
                {BandcampLink ? (
                    <p className="text-blue-500 italic flex items-center">
                        Bandcamp
                        </p> 
                ):( 
                    <p className="text-gray-500 italic flex items-center">
                        <img src={BandCamp} alt="BandCamp logo" className="w-[35px] h-[25px] mr-1 grayscale"/>
                        Bandcamp
                    </p>
                )}
                {AmazonMusicLink ? (
                    <p className="text-blue-500 italic flex items-center">
                        Amazon Music:</p> 
                ):(
                    <p className="text-gray-500 italic flex itmes-center">
                        <img src={AmazonMusic} alt="Amazon Music logo" className="w-[35px] h-[25px]  grayscale"/>
                        Amazon Music
                    </p>
                )}
            </div>
            
            <div className="flex justify-between text-gray-300 p-5 top-[-600px]">
                <div className="w-5 h-5 bg-gray-200 rounded-full border border-black relative top-[-400px] left-[-15px]"></div>
                <p className="relative text-sm top-[-400px] left-[-50px]">{followers} followers</p>
                <button
                    className="hover:underline"
                    onClick={() => setCurrentTab("Following")}
                >
                    <p className="relative top-[-400px] left-[10px] text-sm">View All</p>
                </button>
            </div>
            <div className="flex justify-between text-gray-300 p-5 top-[-100px]">
                <div className="w-5 h-5 bg-gray-300 rounded-full border border-black relative top-[-430px] left-[-15px]"></div>
                <p className="relative text-sm top-[-430px] left-[-50px]">{following} following</p>
                <button
                    className="hover:underline"
                    onClick={() => setCurrentTab("Following")}
                >
                    <p className="relative top-[-430px] left-[10px] text-sm">View All</p>
                </button>
            </div>
        </div>
    );
};

export default UserImage;
