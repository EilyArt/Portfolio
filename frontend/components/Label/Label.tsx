import Link from "next/dist/client/link";
import { useRouter } from "next/router";

const Label = ({ labels }: any) => {
  const router = useRouter();

  return (
    <div>
      <div className="label">
        {labels.map((label: any) => {
          return (
            <Link href={`${label.toLowerCase()}`}>
              <a
                className={`${
                  router.pathname.includes(label.toLowerCase()) && "active"
                } label-link`}
              >
                {label}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Label;
