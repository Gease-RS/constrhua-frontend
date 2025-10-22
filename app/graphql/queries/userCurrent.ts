import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      username
      fullname
      role
    }
  }
`;

export function useCurrentUser() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  return {
    user: data?.currentUser,
    loading,
    error,
  };
}
