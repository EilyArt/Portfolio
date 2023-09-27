import type { NextPage } from "next";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import Gallery from "@/components/Gallery/Gallery";
import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { queryPortfolio as query } from "../middleware/queries";
import { useQuery } from "@apollo/client";
import Head from "next/head";

const portfolio = () => {
  const { data, loading, error } = useQuery(query);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const { page, allProjects, pageMetas } = data;

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
      <div className="portfolio pad-default">
        <Header span="Showcasing some of my best work" header="Portfolio" />
      </div>
      <div className="portfolio pad-default-horizontal">
        {allProjects?.map((project: any, index: number) => {
          return (
            <div className="portfolio-project">
              <Gallery id={index} images={project.images} />
              <div className="portfolio-project-info">
                <dl className="portfolio-project-info-container">
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Name:</h4>
                  </dt>
                  <dd className="portfolio-project-info-container-dd">
                    {project.name}
                  </dd>
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Price:</h4>
                  </dt>
                  <dd className="portfolio-project-info-container-dd">
                    {project.price}$
                  </dd>
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Label:</h4>
                  </dt>
                  <dd className="portfolio-project-info-container-dd">
                    {project.label}
                  </dd>
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Link:</h4>{" "}
                    <dd className="portfolio-project-info-container-dd">
                      <a href={`http://${project.link}`} target="_blank">
                        Open <FaExternalLinkAlt />
                      </a>
                    </dd>
                  </dt>
                </dl>
                <div className="portfolio-project-info-container">
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Features:</h4>
                  </dt>
                  <ul>
                    {project.features.map((feature: any, index: number) => {
                      return (
                        <li
                          key={index}
                          className="portfolio-project-info-container-li"
                        >
                          <FaStar /> {feature.feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <dl
                  className="portfolio-project-info-container"
                  id="project-description"
                >
                  <dt className="portfolio-project-info-container-dt">
                    <h4>Description:</h4>
                  </dt>
                  <aside className="portfolio-project-info-container-p">
                    {project.description}
                  </aside>
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default portfolio;
