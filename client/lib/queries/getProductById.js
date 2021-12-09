import gql from 'graphql-tag';

const GET_PRODUCT_BY_ID = gql`query Post ($slug: String!){
  allComments(slug: $slug) {
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
  post(slug: $slug) {
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
  prevNextPosts(slug: $slug){
      title
      slug
      thumbnail
  }
  threeRelatedPosts(slug: $slug) {
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
  postMetas(slug: $slug) {
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


export default GET_PRODUCT_BY_ID;
