"use client";
import { user1 } from "@/assets";
import Tab from "@/components/dashboardSections/Tab";
import TabContent from "@/components/dashboardSections/TabContent";
import Wrapper from "@/components/Wrappers";
import useUserData from "@/customHook/useProfile";
import { dashboard } from "@/data/dashboard";
import { useAppSelector } from "@/Redux";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";

function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(tab || "Profile");

  const { data: userProfileData, loading, error, refetch } = useUserData();
  // ================================================================ //
  useEffect(() => {
    if (!loading && !userProfileData) {
      refetch();
    }
  }, [userProfileData, refetch, loading]);
  useEffect(() => {
    if (
      tab &&
      tab !== activeTab &&
      dashboard.tabs.some((t) => t.label === tab)
    ) {
      setActiveTab(tab);
    }
  }, [tab, activeTab]);
  // useEffect(() => {
  //   console.log(userProfileData, "userProfileData");
  //   console.log(error, "userProfileData");
  // }, [userProfileData, error]);
  // ================================================================ //
  const handleTabClick = (tabLabel: string) => {
    const selectedTab = dashboard.tabs.find((t) => t.label === tabLabel);
    if (selectedTab) {
      setActiveTab(tabLabel);
      router.push(`?tab=${encodeURIComponent(tabLabel)}`);
    }
  };
  // ================================================================ //
  return (
    <section className="backgroundGradient max-md:mp-28 w-full pt-32">
      {/* Banner  */}
      <ProfileBanner
        userName={userProfileData?.attributes?.username}
        avatar={userProfileData?.attributes?.avatar?.data?.attributes?.url}
      />
      {/* Tab Section  */}
      <Wrapper
        as="div"
        containerClassName="mt-8 pb-8"
        className="relative grid grid-cols-12 gap-5"
      >
        <aside
          className={`z-30 col-span-3 rounded-2xl bg-white py-5 shadow-2xl max-lg:col-span-4 ${
            mobileMenu
              ? "max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:bg-white"
              : "max-sm:hidden"
          }`}
        >
          <ul className="mx-5 flex flex-col justify-between gap-5 text-lg">
            {/* Tabs */}
            <Tab
              tabs={dashboard?.tabs}
              activeTab={activeTab}
              setActiveTab={handleTabClick}
            />
            <li className="flex cursor-pointer items-center gap-2 px-5 py-1.5">
              <CiLogout className="text-2xl" /> Log Out
            </li>
          </ul>
        </aside>
        <main className="col-span-9 flex justify-center overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl max-lg:col-span-8 max-sm:col-span-12 sm:p-10">
          <TabContent
            activeTab={dashboard?.tabs?.find((tab) => tab?.label === activeTab)}
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
          />
        </main>
      </Wrapper>
    </section>
  );
}

function ProfileBanner({ userName, avatar }: any) {
  return (
    <Wrapper
      as="div"
      className="flex-center rounded-2xl bg-white bg-opacity-50 p-3"
    >
      <div className="redOrangeGradient flex h-full w-full items-center gap-5 rounded-2xl p-5 max-sm:flex-col">
        {/* Avatar  */}
        <div className="h-32 w-32 rounded-full bg-white bg-opacity-50 p-2 shadow-2xl">
          <Image
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold md:text-5xl">
            Welcome, {userName}
          </h1>
          <p className="flex items-center gap-2 text-nowrap text-zinc-800">
            <FaEdit className="text-xl" />
            <span>Edit your Profile</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
}
