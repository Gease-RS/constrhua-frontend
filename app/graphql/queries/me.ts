import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      fullname
      username
      email
      avatar
      role
    }
  }
`;
