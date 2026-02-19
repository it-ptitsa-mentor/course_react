import React from 'react';
import { removeUserPost } from '../../../utils/storage/createdPostsAPI';
import PostCard, { PostCardProps } from './PostCard';


const PostCardUserWrapper = (props: PostCardProps) => {

  const deletePost = () => {
    removeUserPost({ userPostId: props.post.id });
    props.onDelete(props.post.id)
  }

  return (
    <PostCard
      {...props}
      onDelete={deletePost}
    />
  )
}

export default React.memo(PostCardUserWrapper, (prev, next) => {
  const shouldCash =
    prev.post === next.post &&
    prev.highlight === next.highlight &&
    prev.userName === next.userName &&
    prev.userAddress === next.userAddress &&
    prev.onDelete === next.onDelete

  return shouldCash;
});
