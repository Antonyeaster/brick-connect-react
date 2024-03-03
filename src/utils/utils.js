import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // For the profile that has been clicked,
      // update the follower count and set it's following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // For the logged in users profile, update the following count
      { ...profile, following_count: profile.following_count + 1 }
    : // Return as unchanged as this is not the profile the user
      // clicker on or the profile the user owns
      profile;
};

// Function below does the same as the one above,
// but instaed of increasing the following/followers
//count it decreases
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count - 1 }
    : profile;
};
