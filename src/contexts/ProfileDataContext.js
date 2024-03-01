import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";


export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  
  const currentUser = useCurrentUser();

  // Fetching popular profiles when the component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Requesting profiles then ordered by follow count
        const { data } = await axiosReq.get(
          "/profiles/?ordering=followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
    // Fetches the profiles depending on each current user
  }, [currentUser]);
  return (
    <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={setProfileData}>
            {children}
        </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
};
