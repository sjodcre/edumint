import { useState, useEffect } from 'react';
import type { Video } from '@/types/user';
import { useArweaveProvider } from '@/context/ProfileContext';
import { createDataItemSigner, dryrun, message, result } from '@permaweb/aoconnect';
import { processId } from '@/config/config';
import { useActiveAddress } from '@arweave-wallet-kit/react';

const BASE_URL = import.meta.env.PROD 
  ? 'https://ans-stats.decent.land'
  : '/api';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const arProvider = useArweaveProvider();
  const activeAddress = useActiveAddress();

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (fn: () => Promise<any>, retries = MAX_RETRIES) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await wait(RETRY_DELAY);
        return fetchWithRetry(fn, retries - 1);
      }
      throw error;
    }
  };

  const fetchPlayerProfile = async () => {
    if (!activeAddress) {
      console.error("No active address");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const profileIdRes = await fetchWithRetry(async () => {
        const response = await dryrun({
          process: "SNy4m-DrqxWl01YqGM4sxI8qCni-58re8uuJLvZPypY",
          tags: [
            {
              name: "Action",
              value: "Get-Profiles-By-Delegate",
            },
          ],
          signer: createDataItemSigner(window.arweaveWallet),
          data: JSON.stringify({ Address: activeAddress }),
        });
        return JSON.parse(response.Messages[0].Data);
      });

      if (!profileIdRes?.[0]?.ProfileId) {
        throw new Error('No profile ID found');
      }

      const profileRes = await fetchWithRetry(async () => {
        const response = await dryrun({
          process: profileIdRes[0].ProfileId,
          tags: [
            {
              name: "Action",
              value: "Info",
            },
          ],
          signer: createDataItemSigner(window.arweaveWallet),
          data: "",
        });
        return JSON.parse(response.Messages[0].Data);
      });

      if (!profileRes?.Profile) {
        throw new Error('Invalid profile data');
      }

      const userDetails = {
        id: activeAddress,
        name: profileRes.Profile.DisplayName || "ANON",
        image: profileRes.Profile.ProfileImage || "NONE",
        score: 0,
        bazarId: profileIdRes[0].ProfileId,
        walletAddress: activeAddress,
        displayName: profileRes.Profile.DisplayName || "ANON",
        username: profileRes.Profile.Username || "unknown",
        bio: profileRes.Profile.Bio || "",
        avatar: profileRes.Profile.Avatar || "default-avatar.png",
        banner: profileRes.Profile.Banner || "default-banner.png",
        version: profileRes.Profile.Version || 1,
      };

      // Update profile in ArweaveProvider context
      console.log(userDetails)
      if (arProvider?.profile) {
        arProvider.profile = userDetails;
      }

      // Fetch videos after profile is set
      const videosRes = await fetchWithRetry(async () => {
        const msgRes = await message({
          process: processId,
          tags: [{ name: "Action", value: "List-Posts" }],
          signer: createDataItemSigner(window.arweaveWallet),
        })

        const postResult = await result({
          process: processId,
          message: msgRes,
        });
          console.log(postResult)
        return JSON.parse(postResult.Messages[0].Data);
      });

      setVideos(videosRes.map((post: any) => ({
        id: post.Id,
        videoUrl: `https://arweave.net/${post.VideoTxId}`,
        user: userDetails,
        likes: post.Likes || 0,
        comments: post.Comments || 0,
        description: post.Description || '',
      })));

      return userDetails;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      console.error(errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeAddress && window.arweaveWallet) {
      fetchPlayerProfile();
    }
  }, [activeAddress]);


  return { 
    videos, 
    loading, 
    error, 
    fetchPlayerProfile,
    refetch: () => fetchPlayerProfile()
  };
}