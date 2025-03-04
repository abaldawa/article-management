/**
 * @author Abhijit Baldawa
 */

import { Link, useParams } from "react-router";
import { getArticleDetails } from "../../../shared/services/article";
import { useCallApi } from "../../../shared/hooks/use-api-call";
import { useEffect } from "react";
import { useAuthContext } from "../../../shared/services/auth/auth-context";
import { UserAvatar } from "../../../shared/components/user-avatar";

const ArticleDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { auth } = useAuthContext();
  const getArticleDetailsService = useCallApi(getArticleDetails);

  useEffect(() => {
    if (slug) {
      getArticleDetailsService.callApi({
        articleSlug: slug,
        accessToken: auth?.accessToken,
      });
    }
  }, [slug, auth?.accessToken]);

  if (getArticleDetailsService.loading) {
    return <p>Loading...</p>;
  }

  if (!getArticleDetailsService.data) {
    return <p>Article not found</p>;
  }

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {getArticleDetailsService.data.title}
      </h1>
      <p className="text-gray-500 text-sm mb-4">
        {getArticleDetailsService.data.publishedAt}
      </p>
      <div className="mb-4">
        {getArticleDetailsService.data.analysts.map((analyst) => (
          <div key={analyst.slug} className="inline-block mr-2">
            <UserAvatar analyst={analyst} />
          </div>
        ))}
      </div>
      {getArticleDetailsService.data.content ? (
        <div>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{
              __html: getArticleDetailsService.data.content,
            }}
          />
        </div>
      ) : (
        <div>
          <p className="mb-4">{getArticleDetailsService.data.summary}</p>
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
            role="alert"
          >
            <p className="font-bold">Please login to view the full article.</p>
            <p>
              <Link to="/auth/login" className="text-blue-500 underline">
                Click here to login
              </Link>
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export { ArticleDetails };
