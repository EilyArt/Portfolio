import Posts from "../../components/Posts/Posts";
import Title from "@/components/Title/Title";
import Tag from "@/components/Tag/Tag";
import Header from "@/components/Header/Header";
import { queryBlog as query } from "../middleware/queries";
import { useQuery } from "@apollo/client";
import Head from "next/head";

const blog = () => {
  const { data, loading, error } = useQuery(query);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const { page, posts, cv, allTags, pageMetas } = data;

  return (
    <>
      <Head>
        <title>{`${page?.title}`}</title>
        {pageMetas?.map((meta: any, index: number) => {
          return (
            <meta
              key={index}
              name={`${meta.name}`}
              content={`${meta.content}`}
            />
          );
        })}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className="blog">
        <div className="pad-default">
          <Header span="EILYA's Thoughts, stories and ideas." header="Blog" />
        </div>
        <div className="blog-posts pad-default-horizontal">
          <Posts posts={posts} myImage={cv} star={true} />
        </div>
        <div className="pad-default">
          <Title title="Explore Tags" />
          <div className="blog-tags">
            {allTags?.slice(0, 30).map((tag: any, index: number) => {
              return <Tag name={tag.name} id={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default blog;
