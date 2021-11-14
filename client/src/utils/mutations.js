import gql  from 'graphql-tag';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
                token
                user {
                    _id
                    username
                    email
                    password
                }
    }
  }
`;

export const LOGIN = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
                token
                user {
                    _id
                }
            }
  }
`;
export const SAVEBOOK = gql`
    mutation saveBook($authors: [String], $description: String, $bookId: String, $image: String, $link: String, $title: String) {
        saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            username
        }
    }
`;

export const DELETEBOOK = gql`
    mutation deleteBook($_id: ID) {
        deleteBook(_id: $_id) {
            savedBooks {
                _id
            }
        }
    }
`;

