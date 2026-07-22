import React, { createContext } from 'react';
import CryptoJS from 'crypto-js';
import Cookies from 'universal-cookie';

export const ProfileContext = createContext();

const cookies = new Cookies();

function ProfileProvider({ children }) {
    const [getMe, setGetMe] = React.useState(null);

    React.useEffect(() => {
        try {
            const encrypted = cookies.get("getMe");
            if (encrypted) {
                const decrypted = CryptoJS.AES.decrypt(encrypted, 'madafidev').toString(CryptoJS.enc.Utf8);
                const parsedData = JSON.parse(decrypted);
                setGetMe(parsedData);
            } else {
                console.log("Cookie 'getMe' not found");
            }
        } catch (error) {
            console.error("Error decrypting or parsing 'getMe':", error);
        }
    }, []);

    return (
        <ProfileContext.Provider value={{ getMe }}>
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;
