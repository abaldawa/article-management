/**
 * @author Abhijit Baldawa
 */

import { UserAvatar } from "../../../shared/components/user-avatar";
import { ArticleItem as ArticleItemType } from "../../../shared/services/article";

type ArticleItemProps = {
  article: ArticleItemType;
  onClick?: () => void;
  refFn?: React.Ref<HTMLElement>;
};

const ArticleItem: React.FC<ArticleItemProps> = (props) => {
  const { article, refFn, onClick } = props;

  return (
    <article
      ref={refFn}
      onClick={onClick}
      className=" p-4 border rounded cursor-pointer"
    >
      <h2 className="text-xl font-bold">{article.title}</h2>
      {/* <p>{article.title}</p> */}
      <p className="text-gray-500 text-sm">{article.publishedAt}</p>
      <div className="flex space-x-2 mt-4">
        {article.analysts.map((analyst) => (
          <UserAvatar key={analyst.slug} analyst={analyst} />
        ))}
      </div>
    </article>
  );
};

export { ArticleItem };
