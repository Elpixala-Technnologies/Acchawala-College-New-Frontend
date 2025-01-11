import React from "react";
import Profile from "./profileForm/Profile";
import { AppliedCollege } from "./appliedCollege/AppliedColleges";
import { PendingCollege } from "./pendingApplication/PendingApplication";
import { AccountSetting } from "./accountSetting/AccountSetting";
import { RatingReview } from "./reviewRating/RatingReview";

const TabContent = ({ activeTab, setMobileMenu, mobileMenu }: any) => {
  return (
    <>
      {/* Render components based on activeTab */}
      {activeTab?.label === "Profile" && (
        <Profile
          tab={activeTab}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}

      {activeTab?.label === "Applied Colleges" && (
        <AppliedCollege
          tab={activeTab}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}
      {activeTab?.label === "Your Reviews" && (
        <RatingReview
          tab={activeTab}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}
      {activeTab?.label === "Pending Applications" && (
        <PendingCollege
          tab={activeTab}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}
      {activeTab?.label === "Account Settings" && (
        <AccountSetting
          tab={activeTab}
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      )}
    </>
  );
};

export default TabContent;
