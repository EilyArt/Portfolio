import gql from 'graphql-tag';

export const queryIndex = gql`
{
  pageMetas(page: "") {
    page{
      title
    }
    name
    content
  }
  page(page: "") {
    title
  }
  cv {
    homepageParagraph
  }
}
`


export const queryFooter = gql`
{
  lastProject {
    name
    images{
      image
      alt
    }
  }
  pageMetas(page: "") {
    page{
      title
    }
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
  cv{
    phone
    email
    address
}
}
`

export const queryBlog = gql`
{
  posts {
    id
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
  cv{
    postPhoto
    id
    alt
    email
    phone
    address
  }
  page(page: "blog") {
    title
  }
  allTags {
    name
  }
  pageMetas(page: "blog") {
    page{
      title
    }
    name
    content
  }
}
`

export const queryPost = gql`
query PostQuery($slug: String!) {
  allComments(slug: $slug) {
    id
    post{
      id
    }
    username
    comment
    createdAt
    likes
    dislikes
    replies {
      id
      comment
      createdAt
      username
      likes
      dislikes
    }
  }
  cv{
      photo
      id
      alt
      email
      phone
      address
  }
  post(slug: $slug) {
    id
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
      id
      title
      slug
      thumbnail
      thumbnailAlt
  }
  threeRelatedPosts(slug: $slug) {
      id
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
  postMetas(slug: $slug) {
      name
      content
  }
}
`
    // useEffect(() => {
    //     axios({
    //         url: `${process.env.NEXT_PUBLIC_API}graphql/`,
    //         method: 'post',
    //         data: {
    //             query: `
    //             mutation {
    //                 addView(postId: ${post?.id}){
    //                   post{
    //                     id
    //                   }
    //                 }
    //               }                  
    //               `
    //         }
    //     })
    // })