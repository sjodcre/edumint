import { useState, useEffect } from 'react';
import { message, result, dryrun, createDataItemSigner } from '@permaweb/aoconnect';
import { processId } from '@/config/config';
import { useArweaveProvider } from '@/context/ProfileContext';

interface Post {
  ID: string;
  LikeCount: number;
  Liked?: boolean;
  SellingStatus?: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const arProvider = useArweaveProvider();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      if (arProvider.profile) {
        const res = await message({
          process: processId,
          tags: [
            { name: 'Action', value: 'List-Posts-Likes' },
            { name: 'Author-Id', value: arProvider.profile.walletAddress },
          ],
          signer: createDataItemSigner(window.arweaveWallet),
        });

        const fetchPostsResult = await result({
          process: processId,
          message: res,
        });

        const parsedPosts = fetchPostsResult.Messages.map((msg: any) => {
          const parsedData = JSON.parse(msg.Data);
          return parsedData.map((post: any) => ({
            ...post,
            Liked: post.Liked === 1,
            LikeCount: post.LikeCount || 0,
            SellingStatus: post.SellingStatus === 1,
          }));
        });
        setPosts(parsedPosts[0]);
      } else {
        const response = await dryrun({
          process: processId,
          tags: [{ name: 'Action', value: 'List-Posts' }],
        });
        const parsedPosts = response.Messages.map((msg: any) => {
          const parsedData = JSON.parse(msg.Data);
          return parsedData.map((post: any) => ({
            ...post,
            LikeCount: post.LikeCount || 0,
          }));
        });
        setPosts(parsedPosts[0]);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isLoading, error };
};