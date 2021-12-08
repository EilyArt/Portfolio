import gql from 'graphql-tag';

const GET_PRODUCT_BY_ID = gql`query Post ($slug: String!){
  allComments(where: { slug: { _eq: $slug } }, limit: 1) {
    username
    comment
    createdAt
    likes
    dislikes
    replies {
      comment
      createdAt
      username
      likes
      dislikes
    }
  }
  post(where: { slug: { _eq: $slug } }, limit: 1) {
    title
    slug
    thumbnail
    thumbnailAlt
    description
    duration
    createdAt
    tags {
      name
    }
  }
  prevNextPosts(where: { slug: { _eq: $slug } }, limit: 1){
      title
      slug
      thumbnail
  }
  threeRelatedPosts(where: { slug: { _eq: $slug } }, limit: 1) {
      title
      slug
      thumbnail
      excerpt
      duration
      createdAt
      tags {
        name
      }
  }
  lastProject {
      name
      images{
        image
        alt
      }
  }
  postMetas(where: { slug: { _eq: $slug } }, limit: 1) {
      name
      content
  } 
  lastNPosts(N: 3) {
      id
      title
      slug
      thumbnail
      createdAt
  }
}
`;
// const GET_PRODUCT_BY_ID = gql`query Post ($slug: String!){
//   allComments(where: { trip: { slug: { _eq: $slug } } }, limit: 1) {
//     username
//     comment
//     createdAt
//     likes
//     dislikes
//     replies {
//       comment
//       createdAt
//       username
//       likes
//       dislikes
//     }
//   }
//   post(where: { trip: { slug: { _eq: $slug } } }, limit: 1) {
//     title
//     slug
//     thumbnail
//     thumbnailAlt
//     description
//     duration
//     createdAt
//     tags {
//       name
//     }
//   }
//   prevNextPosts(where: { trip: { slug: { _eq: $slug } } }, limit: 1){
//       title
//       slug
//       thumbnail
//   }
//   threeRelatedPosts(where: { trip: { slug: { _eq: $slug } } }, limit: 1) {
//       title
//       slug
//       thumbnail
//       excerpt
//       duration
//       createdAt
//       tags {
//         name
//       }
//   }
//   lastProject {
//       name
//       images{
//         image
//         alt
//       }
//   }
//   postMetas(where: { trip: { slug: { _eq: $slug } } }, limit: 1) {
//       name
//       content
//   } 
//   lastNPosts(N: 3) {
//       id
//       title
//       slug
//       thumbnail
//       createdAt
//   }
// }
// `;

export default GET_PRODUCT_BY_ID;
