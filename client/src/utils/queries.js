import { gql } from '@apollo/client';

export const QUERY_USER= gql ` 
    {
        users {
            _id
            username
            email
            password
            books {
              _id
              authors
              description
              bookId
              image
              link
              title
            }
          }
    }    
`
