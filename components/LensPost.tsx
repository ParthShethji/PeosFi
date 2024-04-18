import {
  ContentFocus,
  CollectPolicyType,
  ProfileOwnedByMe,
  ReferencePolicyType,
  useCreatePost,
} from "@lens-protocol/react";
import { uploadJson } from "@/lib/upload-ipfs";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useState } from "react";
import { Button } from "./ui/button";
export function LensPost({ amount }: { amount: number }) {
  const { data: activeProfile } = useActiveProfile();
  const {
    execute: create,
    error,
    isPending,
  } = useCreatePost({ publisher: activeProfile, upload: uploadJson });

  const creatLensPost = async (content: string) => {
    const postCreated = await create({
      content,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: "en",
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
      reference: {
        type: ReferencePolicyType.ANYONE,
      },
    });
    console.log({ postCreated });
  };

  return (
    <div>
      <Button
        variant="outline"
        className={`
        } mx-auto w-5/12 text-black p-8`}
        onClick={() => {
          creatLensPost(
            `Just borrowed some USDC on ZeroFi, but I'm still short of my goal. Your support means the world to me! Let's achieve it together, I still need ${amount} USDC. Click here to help me.`
          );
        }}
      >
        Post
      </Button>
    </div>
  );
}
