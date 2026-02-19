import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../../pages/Post';
import { EyeIcon, PlusIcon } from '../icons';
import HightlightBtn from './HightlightBtn';
import { getUserPosts } from '../../utils/storage/createdPostsAPI';
import { userId } from '../../pages/Submit';
import PostCardUserWrapper from './cards/PostCardUserWrapper';

const user = {
  userId,
  name: 'Anton Nazarov',
  address: 'SPB'
}

const UserPosts = () => {
  const navigate = useNavigate();
  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);
  const [posts, setPosts] = useState<Post[]>(() => getUserPosts());

  const isEmpty = posts.length === 0;

  const toggleHighlight = useCallback(() => setHightlightPosts(p => !p), [])

  const onPostDelete = useCallback((removedID: number) => {
    setPosts(prev => prev.filter(p => p.id !== removedID))
  }, [])

  return (
    <section>
      <h2>
        {showPostsCount && <span>{posts.length + ' - '}</span>}
        Последние посты
      </h2>

      <div className='posts-interactive'>
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
        {isEmpty ? (
          <Link
            to='/submit'
            style={{ marginTop: "1rem", color: "#888" }}
          >
            CREATE POST
          </Link>
        ) : (
          posts.map((post, idx) => {
            const shouldHightlight = hightlightPosts && idx % 2 === 0;

            return (
              <PostCardUserWrapper
                key={post.id}
                post={post}
                userName={user.name}
                userAddress={user.address}
                highlight={shouldHightlight}
                onDelete={onPostDelete}
              />
            )
          })
        )}
      </section>
    </section>
  );
}

export default UserPosts;