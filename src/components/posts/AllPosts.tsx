import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, PlusIcon } from '../icons';
import HightlightBtn from './HightlightBtn';
import { Post } from '../../pages/Post';
import { useGetAllPosts } from '../../http/hooks';
import { withUsers, WithUsersProps } from '../../hoc/withUsers';
import PostCardAllWrapper from './cards/PostCardAllWrapper';
import { getRemovedPostsIds } from '../../utils/storage/removedPostsAPI';
import { PostsTabs } from '../configs/postsTabs';

const tab = PostsTabs.ALL;

type Props = {} & WithUsersProps

const AllPosts = ({ users }: Props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value, tab } : { tab });
  };

  const toggleHighlight = useCallback(() => setHightlightPosts(p => !p), [])

  const usersMap = useMemo(() => {
    const map: Record<number, { name: string, address: string }> = {};

    if (!users.length) return map;

    users.forEach(({ name, address, id }) => {
      if (name.length <= 5) {
        map[id] = { name, address: address.city }
      } else if (name.length <= 10) {
        map[id] = { name, address: address.street }
      } else {
        map[id] = { name, address: address.zipcode }
      }
    })

    return map;
  }, [users])

  const getUser = (userID: number) => {
    return usersMap[userID] ?? { name: 'Anonymous', address: 'Russia' }
  };

  const onPostDelete = useCallback((removedID: number) => {
    setPosts(prev => prev.filter(p => p.id !== removedID))
  }, [])

  const { isLoading, error, request } = useGetAllPosts()
  useEffect(() => {
    request({ search })
      .then(({ data }) => {
        if (data) {
          const removedPostsIds = getRemovedPostsIds();
          const existPosts = data.filter((p) => !removedPostsIds.includes(p.id));
          setPosts(existPosts);
        };
      })
  }, [search, request]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section>
      <h2>
        {showPostsCount && <span>{posts.length + ' - '}</span>}
        Последние посты
      </h2>

      <div className='posts-interactive'>
        <input
          type="text"
          placeholder="Search posts..."
          className="search-input"
          value={search}
          onChange={handleSearch}
        />

        <button
          onClick={() => navigate('/submit')}
        >
          <PlusIcon />
        </button>

        <HightlightBtn
          paintIcon={hightlightPosts}
          onClick={toggleHighlight}
        />

        <button
          onClick={() => setShowPostsCount(p => !p)}
        >
          <EyeIcon colorIcon={showPostsCount ? 'lightgreen' : 'white'} />
        </button>
      </div>

      <section className="posts">
        {posts.length === 0 && !isLoading && (
          <p style={{ marginTop: "1rem", color: "#888" }}>No posts found</p>
        )}

        {isLoading ? (
          <p>Loading....</p>
        ) : (
          posts.map((post, idx) => {
            const shouldHightlight = hightlightPosts && idx % 2 === 0;
            const user = getUser(post.userId);

            return (
              <PostCardAllWrapper
                key={post.id}
                post={post}
                userName={user.name}
                userAddress={user.address}
                highlight={shouldHightlight}
                onClick={() => navigate(`/posts/${post.id}/comments`)}
                onDelete={onPostDelete}
              />
            )
          })
        )}
      </section>
    </section>
  );
}

const AllPostsWithUsers = withUsers(AllPosts)
export default AllPostsWithUsers;
