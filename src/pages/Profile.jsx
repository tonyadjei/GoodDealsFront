import {
  AtSymbolIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MapPinIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useSession } from "../utils/SessionContext";

const Profile = () => {
  const { user, fetchUser } = useSession();

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="mt-20 flex-col justify-self-center">
      <UserCircleIcon className="size-20 text-amber-700" />
      <p className="flex">
        <AtSymbolIcon className="size-6 text-amber-700" />
        <span className="font-medium text-amber-700">{user.username}</span>
      </p>
      <div className="relative mt-8 flex items-center gap-x-4">
        <IdentificationIcon className="size-10 px-0.5 rounded-full text-amber-600" />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">{user.firstName}</p>
          <p className="text-gray-600">{user.lastName}</p>
        </div>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <EnvelopeIcon className="size-10 px-0.5 rounded-full text-amber-600" />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">{user.email}</p>
        </div>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <MapPinIcon className="size-10 px-0.5 rounded-full text-amber-600" />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">{user.address}</p>
        </div>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <BriefcaseIcon className="size-10 px-0.5 rounded-full text-amber-600" />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">{user.role}</p>
        </div>
      </div>
    </div>
  ) : (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 mb-4">
        Sign-in to view your profile 😊
      </h2>
    </>
  );
};

export default Profile;
