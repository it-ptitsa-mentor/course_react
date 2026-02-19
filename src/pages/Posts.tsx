import { lazy, Suspense, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostsTabs } from '../components/configs/postsTabs';

const AllPostsLazy = lazy(() => import('../components/posts/AllPosts'));
const UserPostsLazy = lazy(() => import('../components/posts/UserPosts'));

const Posts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    const isCorrect = tab === PostsTabs.ALL || tab === PostsTabs.MY;
    return isCorrect ? tab : PostsTabs.ALL;
  })

  const isAllTab = activeTab === PostsTabs.ALL;
  const isUserTab = activeTab === PostsTabs.MY;

  const toggleActiveTab = (tab: PostsTabs) => {
    setActiveTab(tab);
    const search = searchParams.get("search") || "";
    setSearchParams(search ? { search, tab } : { tab });
  }

  return (
    <div className="container">
      <div className='posts-tabs'>
        <button
          onClick={() => toggleActiveTab(PostsTabs.ALL)}
          data-active={isAllTab}
        >
          ВСЕ
        </button>
        <button
          onClick={() => toggleActiveTab(PostsTabs.MY)}
          data-active={isUserTab}
        >
          МОИ
        </button>
      </div>

      <div>
        {isAllTab && (
          <Suspense fallback={<div>All posts loading...</div>}>
            <AllPostsLazy />
          </Suspense>
        )}

        {isUserTab && (
          <Suspense fallback={<div>My posts loading...</div>}>
            <UserPostsLazy />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Posts;
