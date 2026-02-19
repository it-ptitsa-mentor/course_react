import React from 'react';
import { useDeletePost } from '../../../http/hooks/useDeletePost';
import PostCard, { PostCardProps } from './PostCard';


const PostCardAllWrapper = (props: PostCardProps) => {

  const { isLoading, request } = useDeletePost();
  const deletePost = () => {
    request(props.post.id)
      .then(({ removedID }) => {
        props.onDelete(removedID)
      })
  }

  return (
    <div
      style={{ position: 'relative' }}
    >
      <PostCard
        {...props}
        onDelete={deletePost}
      />

      {isLoading && (
        <div className='post-removing'>
          <p>
            REMOVING POST...
          </p>
        </div>
      )}
    </div>
  )
}

export default React.memo(PostCardAllWrapper, (prev, next) => {
  const shouldCash =
    prev.post === next.post &&
    prev.highlight === next.highlight &&
    prev.userName === next.userName &&
    prev.userAddress === next.userAddress &&
    prev.onDelete === next.onDelete &&
    prev.onClick?.toString() === next.onClick?.toString()

  return shouldCash;
});
