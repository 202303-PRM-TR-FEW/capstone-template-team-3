"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useEffect } from "react";
import { getUserData } from "../lib/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../i18n/client";

const Profile = ({ lng }) => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const { t } = useTranslation(lng, "profile");

  const getCurrentUserData = async () => {
    await dispatch(getUserData(user.uid));
  };

  useEffect(() => {
    if (!loading) {
      getCurrentUserData();
    }
  }, [loading]);

  return (
    user &&
    currentUser && (
      <main>
        <div className="flex flex-col justify-center items-center">
          <p>{t("Signed in succesfully")}</p>
          {currentUser.name && (
            <p>
              Name:&nbsp; &nbsp;
              <span className="font-bold">{currentUser.name}</span>
            </p>
          )}
          {currentUser.email && (
            <p>
              {t("Email")}: {user.email}
              <span className="font-bold">{currentUser.email}</span>
            </p>
          )}
          <p>
            ID:&nbsp; &nbsp;
            <span className="font-bold">{currentUser.id}</span>
          </p>
          <p>
            Terms & Conditions:&nbsp; &nbsp;
            <span className="font-bold">
              {currentUser.acceptedTermsAndConditions && "Accepted"}
            </span>
          </p>
        </div>
      </main>
    )
  );
};

export default Profile;
