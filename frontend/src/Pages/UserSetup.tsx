import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./User.css";
import Header from "../PageElements/Home/Universal/header";
import UserImage from "../PageElements/Home/UserPage/UserIcon";

const UserSetupPage = () => {
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");

    const locationObj = useLocation();

    useEffect(() => {
        // Access email query parameter
        const queryParams = new URLSearchParams(locationObj.search);
        const userEmail = queryParams.get("email");
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [locationObj]);

    const handleSaveProfile = async () => {
        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, location, email }),
            });

            if (response.ok) {
                console.log("Profile saved successfully");
                window.location.href = "http://localhost:3000/" // This is horrible practice and should be changed later
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
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 px-4 py-2 border border-periwinkle-300 rounded-lg focus:border-royal-blue-500 focus:ring-2 focus:ring-royal-blue-200"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full mt-6 bg-royal-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-royal-blue-600 transition"
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
