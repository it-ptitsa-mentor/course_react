import { useEffect, useState, JSX } from 'react';
import { useGetUserById } from '../../http/hooks';
import { User } from '../../http/hooks/useGetAllUsers';

interface Props {
  userId: number
}

const PostUser = ({ userId }: Props) => {

  return (
    <PostUserProvider userId={userId}>
      {({ isLoading, user }) => {
        if (isLoading) {
          return (
            <p className='page-post-user'>
              <span>Loading...</span>
            </p>
          )
        }

        const isAnonymousAuthor = !user;
        if (isAnonymousAuthor) {
          return (
            <p className='page-post-user'>
              <span>Anonymous</span>
              <span>( ОМ )</span>
            </p>
          )
        }

        return (
          <p className='page-post-user'>
            <span>{user.name}</span>
            <span>{user.company.name}</span>
          </p>
        )
      }}
    </PostUserProvider>
  )
}

interface RenderProps {
  isLoading: boolean;
  user: User | null;
};

interface ProviderProps {
  userId: number;
  children: (data: RenderProps) => JSX.Element;
}

function PostUserProvider({ userId, children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, request } = useGetUserById();
  useEffect(() => {
    request({ userId: userId })
      .then(({ data }) => {
        if (data) setUser(data);
      })
  }, [userId, request]);

  return children({ isLoading, user })
}

export default PostUser;

