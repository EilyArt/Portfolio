import gql from "graphql-tag";

export const queryIndex = gql`
  {
    pageMetas(page: "") {
      page {
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
`;

export const queryFooter = gql`
  {
    lastProject {
      name
      images {
        image
        alt
      }
    }
    pageMetas(page: "") {
      page {
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
    cv {
      phone
      email
      address
    }
  }
`;

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
    cv {
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
      page {
        title
      }
      name
      content
    }
  }
`;

export const queryPost = gql`
  query PostQuery($slug: String!) {
    allComments(slug: $slug) {
      id
      post {
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
    cv {
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
    prevNextPosts(slug: $slug) {
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
`;

export const queryResume = gql`
  {
    educations {
      institution
      title
      startDate
      endDate
      description
    }
    cv {
      photo
      CV
      id
      alt
      phone
      email
      aboutMe
      address
    }
    experiences {
      job
      company
      startDate
      endDate
      description
    }
    languages {
      language
      level
    }
    certificates {
      title
      date
    }
    skillCategories {
      title
      skillSet {
        id
        title
        logo
        percentage
      }
    }
    pageMetas(page: "resume") {
      page {
        title
      }
      name
      content
    }
    page(page: "resume") {
      title
    }
  }
`;

export const queryAbout = gql`
  {
    hobbies {
      name
    }
    jobs {
      id
      title
      alt
      svg
      description
    }
    cv {
      photo
      CV
      id
      alt
      phone
      email
      aboutMe
      address
    }
    pageMetas(page: "about") {
      page {
        title
      }
      name
      content
    }
    page(page: "about") {
      title
    }
  }
`;

export const queryPortfolio = gql`
  {
    allProjects {
      name
      price
      label
      link
      description
      features {
        feature
      }
      images {
        image
        alt
      }
    }
    pageMetas(page: "portfolio") {
      page {
        title
      }
      name
      content
    }
    page(page: "portfolio") {
      title
    }
  }
`;

export const queryContact = gql`
  {
    pageMetas(page: "contact") {
      page {
        title
      }
      name
      content
    }
    cv {
      photo
      CV
      id
      alt
      phone
      email
      address
    }
    page(page: "contact") {
      title
    }
  }
`;

export const queryTag = gql`
  query TagQuery($tag: String!) {
    tag(name: $tag) {
      id
      name
    }
    cv {
      photo
      id
      alt
      email
      phone
      address
    }
    allTaggedPosts(tag: $tag) {
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
    page(page: "tag") {
      title
    }
    pageMetas(page: "tag") {
      page {
        title
      }
      name
      content
    }
  }
`;
