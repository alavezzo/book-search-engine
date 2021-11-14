import gql  from 'graphql-tag';

export const QUERY_USER = gql ` 
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
export const QUERY_ME = gql`
  {
    me {
      username
      savedBooks {
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
