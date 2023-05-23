import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import InfiniteTweetsList from "~/components/InfiniteTweetsList";
import NewTweetForm from "~/components/NewTweetForm";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky-top-0 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm />
      <RecentTweets />
    </>
  );
};

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetsList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default Home;
