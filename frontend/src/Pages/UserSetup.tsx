import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./User.css";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux_Store/actions";
import store from "../Redux_Store/store";
import LocationSearch from "../Components/Universal/LocationUpdateWidget";

const UserSetupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const locationObj = useLocation();
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Access email query parameter
        const queryParams = new URLSearchParams(locationObj.search);
        const userEmail = queryParams.get("email");
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [locationObj]);

    // Function to accept data from the location search bar
    const handleLocationSelect = (location: {
        latitude: number;
        longitude: number;
        locationName: string;
        placeId?: string;
      }) => {
        
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        setLocationName(location.locationName);
      };

    const handleSaveProfile = async () => {
        try {
            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);
            console.log(`LocationName: ${locationName}`);
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    location: {
                        // I know putting the userId here is terrible but it's so I can
                        // use the existing location update interface in the backend
                        userId: 0,
                        locationName, 
                        latitude, 
                        longitude
                    },
                    email,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const user_id = data.user.id;

                if (user_id) {
                    await dispatch(setUser(data.user.id));
                    console.log("Created User:", user_id);
                    const updatedState = store.getState();
                    console.log("Updated Redux state:", updatedState.user.user_id);
                } else {
                    console.log("There was an error retrieving the New User ID");
                }

                console.log("Profile saved successfully");
                // This is horrible practice and should be changed later
                // window.location.href = "http://localhost:3000/"
                navigate('/', { replace: true }) // Navigate to Home and disable backtracking
            } else {
                console.error("Failed to save profile");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-periwinkle-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mt-10 border border-periwinkle-500">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-6 text-periwinkle-600">Set Up Your Profile</h2>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col">
                        <label className="text-periwinkle-600 font-semibold">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 px-4 py-2 border border-periwinkle-300 rounded-lg focus:border-royal-blue-500 focus:ring-2 focus:ring-royal-blue-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-periwinkle-600 font-semibold">Location</label>
                        <LocationSearch
                            className="mt-1"
                            inputClassName="mt-1 w-full px-4 py-2 border border-periwinkle-300 rounded-lg focus:border-royal-blue-500 focus:ring-2 focus:ring-royal-blue-200"
                            placeHolderText="Search for your location"
                            showUpdateButton = {false}
                            onLocationChange={handleLocationSelect}
                        />
                    </div>

                    <button
                        type="button"
                        disabled={!locationName} // Disable if no location selected
                        className={`w-full mt-6 text-white font-semibold py-2 rounded-lg hover:bg-royal-blue-600 transition
                            ${!locationName ? 'bg-gray-400 cursor-not-allowed' : 'bg-royal-blue-500'}`}
                        onClick={handleSaveProfile}
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserSetupPage;
