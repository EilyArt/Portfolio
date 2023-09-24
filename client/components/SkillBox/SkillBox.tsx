import Image from "next/dist/client/image";

type Props = {
  jobs: Array<object>;
};

const SkillBox = ({ jobs }: Props) => {
  return (
    <div className="skillBox-container">
      {jobs.length !== 0 &&
        jobs.map((job: any) => {
          return (
            <div className="skillBox">
              <span className="skillBox-box">
                <i className="skillBox-img">
                  <Image
                    height="50"
                    width="50"
                    loader={() =>
                      `${process.env.NEXT_PUBLIC_API}media/${job.svg}`
                    }
                    src={`${process.env.NEXT_PUBLIC_API}media/${job.svg}`}
                  />
                </i>
                <div className="skillBox-content">
                  <h4>{job.title}</h4>
                  <p>{job.description}</p>
                </div>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default SkillBox;
