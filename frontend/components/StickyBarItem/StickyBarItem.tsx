import Image from "next/dist/client/image";

const StickyBarItem = ({ src, title, content }: any) => {
  return (
    <li className="stickyBarItem">
      <span className="stickyBarItem-box">
        <i className="stickyBarItem-box-item">
          <Image
            height="20"
            width="20"
            src={src}
            className="stickyBarItem-box-item-img"
          />
        </i>
      </span>
      <div className="stickyBarItem-info">
        <small className="stickyBarItem-info-label">{title}</small>
        <a
          className="stickyBarItem-info-content"
          href={content && content.includes(".com") ? `mailto:${content}` : ""}
        >
          {content}
        </a>
      </div>
    </li>
  );
};

export default StickyBarItem;
