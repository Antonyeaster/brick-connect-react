import React from "react";

import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

import appStyles from "../../App.module.css";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-2"
      }`}
    >
      {popularProfiles.results.length ? (
        // Render popular profiles if there are results
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            // Render mobile layout with up to 3 profiles side by side horizontal
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            // Render profiles in a vertical display
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
