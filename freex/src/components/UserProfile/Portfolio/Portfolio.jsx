import styles from "./Portfolio.module.css";

const Portfolio = ({ portfolioLinks }) => {
  return (
    <div>
      <h5 className={styles.heading}>Zobacz moje portfolio na:</h5>
      <ul className={styles.list}>
        {portfolioLinks &&
          portfolioLinks.map((item) => {
            return (
              <li className={styles.list_item} key={item.id}>
                <a
                  href={item.url}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkText}
                  <img
                    className={styles.icon}
                    src="../../../../UserProfile/arrow-right.svg"
                  ></img>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Portfolio;
