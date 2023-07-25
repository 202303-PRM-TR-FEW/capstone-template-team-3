"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useTranslation } from "../../i18n/client";

const Profile = ({ lng }) => {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation(lng, "profile");

  return (
    user && (
      <main>
        <div className="flex flex-col justify-center items-center">
          <p>{t("Signed in succesfully")}</p>
          {user.displayName && <p>Name: {user.displayName}</p>}
          {user.email && (
            <p>
              {t("Email")}: {user.email}
            </p>
          )}
          <p>
            {t("User ID")}: {user.uid}
          </p>
        </div>
      </main>
    )
  );
};

export default Profile;
