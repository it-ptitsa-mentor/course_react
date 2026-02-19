import { Post } from "../../../pages/Post";
import { trancateText } from "../../../utils/trancateText";

export interface PostCardProps {
  post: Post;
  userName: string;
  userAddress: string;
  onClick?: () => void;
  highlight?: boolean;
  onDelete: (postID: number) => void;
}

const PostCard = ({
  post,
  userName,
  onDelete,
  userAddress,
  highlight,
  onClick,
}: PostCardProps) => {
  return (
    <article className={`post-card ${highlight ? "post-card--highlight" : ""}`}>
      <p className="post-card-user">
        <span>{userName}</span>
        <span>{userAddress}</span>
      </p>

      <h3>{post.title}</h3>
      <p>{trancateText(post.body, 50)}</p>

      {onClick && <button onClick={onClick}>Read more</button>}

      <button
        onClick={() => onDelete(post.id)}
        className="post-card-delete"
        aria-label="Delete post"
      >
        x
      </button>
    </article>
  );
};

export default PostCard;
