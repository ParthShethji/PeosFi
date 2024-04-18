import {
  useWalletLogin,
  Profile,
  ProfileId,
  FeedItem,
  useActiveProfile,
  useFeed,
  useProfileFollowers,
  ProfileOwnedByMe,
  usePublications,
  Post,
} from "@lens-protocol/react-web";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import _ from "lodash";
import { Button } from "./ui/button";
import React from "react";
export function LensLoginButton({
  setLensFeed,
  setLensFollowersAddresses,
}: {
  setLensFeed: (feed: FeedItem[]) => void;
  setLensFollowersAddresses: (addresses: string[]) => void;
  // activeLensProfile: ProfileOwnedByMe;
  // setActiveLensProfile: (profile: ProfileOwnedByMe) => void;
}) {
  const { address } = useAccount();
  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();
  const { data: activeLensProfile } = useActiveProfile();
  const { data: feedItems } = useFeed({
    profileId: activeLensProfile?.id as ProfileId,
    limit: 10,
  });
  const { data: followers } = useProfileFollowers({
    profileId: activeLensProfile?.id as ProfileId,
    limit: 10,
  });
  const { data: ownItems } = usePublications({
    profileIds: [activeLensProfile?.id] as ProfileId[],
    limit: 1, // demo purpose
  });

  // useEffect(() => {
  //   if (!activeLensProfile?.id || !activeLensProfile) return; // Exit if condition is not met
  //   setActiveLensProfile(activeProfile);
  // });

  useEffect(() => {
    if (!activeLensProfile?.id || !activeLensProfile) return; // Exit if condition is not met
    let allFeedPosts = [] as FeedItem[];
    if (feedItems) {
      feedItems.forEach((item) => {
        if (item.root.__typename === "Post") {
          allFeedPosts.push(item);
        }
      });
    }
    if (ownItems) {
      (ownItems as Post[]).forEach((item) => {
        if (item?.__typename === "Post") {
          const feedItem = {
            root: item,
          } as unknown as FeedItem;
          allFeedPosts.push(feedItem);
        }
      });
    }
    allFeedPosts = _.orderBy(allFeedPosts, ["root.createdAt"], ["desc"]);
    setLensFeed(allFeedPosts);
  }, [
    feedItems,
    activeLensProfile?.id,
    setLensFeed,
    activeLensProfile,
    ownItems,
  ]);

  useEffect(() => {
    if (!activeLensProfile?.id || !activeLensProfile || !followers) return; // Exit if condition is not met
    const followersAddresses = followers.map(
      (follower) => follower.wallet.address
    );
    setLensFollowersAddresses(followersAddresses);
  }, [
    followers,
    activeLensProfile?.id,
    setLensFollowersAddresses,
    activeLensProfile,
  ]);

  const onLoginClick = async () => {
    console.log("login");
    if (!address) return;

    const loginLensResult = await login({
      address,
    });
    console.log({ loginLensResult });
    // if (loginLensResult) {
    //   const profile = loginLensResult.unwrap();
    //   const profileOwnedByMe = {
    //     ...profile,
    //     ownedByMe: true,
    //   } as ProfileOwnedByMe;
    //   console.log("adding profik");
    //   setActiveLensProfile(profileOwnedByMe);
    // }
  };

  return (
    <div>
      <div className="text-white font-bold p-5">
        {loginError && <p>{loginError.toString()}</p>}
        {activeLensProfile ? (
          //TODO: check si le profil est pas deja recup
          <p>Logged in as {activeLensProfile?.handle}</p>
        ) : (
          <Button disabled={isLoginPending} onClick={onLoginClick}>
            Log in with Lens
          </Button>
        )}
      </div>
    </div>
  );
}
