import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux_Store/actions";
import { selectUserID } from "../Redux_Store/selector";
import { User } from "../../../backend/Types/users"
import Cookies from "js-cookie";

export function GetLocalUserID() {
    const dispatch = useDispatch();
    const user_id = useSelector(selectUserID);

    const fetchUID = async () => {
        // Base case, we already have an ID stored
        if (user_id) {
            return user_id;
        }

        // Check if we have an access token in our cookie to determine login status
        // Return null if not logged in
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            return null;
        }

        // Fetch the UID from the backend
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uid`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setUser(data.uid)); // Update the Redux store with the user ID
                console.log("Found and set user ID: ", data.uid)
                return data.uid;
            } else {
                console.error("Failed to fetch user ID. Status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
            return null;
        }
    }

    return { fetchUID, user_id }
}



export async function FetchUserInfo(user_id: number): Promise<User | null> {
    
    // Base case, null ID
    if (!user_id || user_id <= 0) {
        console.error("Invalid user_id provided:", user_id)
        return null
    }

    try {
        // Get the user info by ID
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/uid?user_id=${user_id}`, {
            method: "GET",
            credentials: "include",
        })

        if (!response.ok) {
            if (response.status === 204){
                console.error('No user foud with ID:', user_id)
            } else {
                console.error(`Failed to fetch user info for user_id ${user_id}. Status: ${response.status}`)
            }
            return null
        }

        // Parse our response for the data
        const data = await response.json()

        // Check if data contains the user info
        if (data) {
            console.log("Fetched user info:", data)
            return data
        } else {
            console.error("Error fetching user info, no user returned.")
            return null
        }

    } catch (error) {
        console.error("Error fetching user info:", error)
        return null
    }
}