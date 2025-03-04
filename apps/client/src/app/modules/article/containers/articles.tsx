/**
 * @author Abhijit Baldawa
 */

import React, { useState, useEffect, useRef } from "react";
import {
  getArticles,
  ArticleItem as ArticleItemType,
  getAllAnalysts,
} from "../../../shared/services/article";
import { useCallApi } from "../../../shared/hooks/use-api-call";
import { ArticleItem } from "../components/article-item";
import { useNavigate } from "react-router";

const ARTICLES_PER_PAGE = 10;

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAnalyst, setSelectedAnalyst] = useState<string | undefined>(
    undefined
  );
  const [articles, setArticles] = useState<ArticleItemType[]>(() => []);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const getArticlesService = useCallApi(getArticles);
  const getAllAnalystsService = useCallApi(getAllAnalysts);

  const fetchArticles = async () => {
    getArticlesService.callApi({
      pagination: {
        limit: ARTICLES_PER_PAGE,
        offset: page * ARTICLES_PER_PAGE,
      },
      analystSlug: selectedAnalyst || undefined,
    });
  };

  useEffect(() => {
    if (getArticlesService.data) {
      const newArticles = getArticlesService.data;

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);

      if (newArticles.length < ARTICLES_PER_PAGE) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [getArticlesService.data]);

  useEffect(() => {
    fetchArticles();
  }, [selectedAnalyst]);

  useEffect(() => {
    getAllAnalystsService.callApi();
  }, []);

  const onAnalystChangeHandler = (analyst: string) => {
    setArticles([]);
    setPage(0);
    setHasMore(true);
    setSelectedAnalyst(analyst);
  };

  const lastArticleElementRef: React.Ref<HTMLElement> = (node) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !getArticlesService.loading) {
        fetchArticles();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  return (
    <section className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Articles</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Filter by Analyst:
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedAnalyst}
            onChange={(e) => onAnalystChangeHandler(e.target.value)}
          >
            <option value="">All Analysts</option>
            {getAllAnalystsService.data?.map((analyst) => (
              <option key={analyst.slug} value={analyst.slug}>
                {analyst.firstName} {analyst.lastName}
              </option>
            ))}
          </select>
        </label>
      </div>
      {articles.map((article, index) => {
        return (
          <ArticleItem
            key={article.slug}
            article={article}
            refFn={
              articles.length === index + 1 && hasMore
                ? lastArticleElementRef
                : undefined
            }
            onClick={() => navigate(`/articles/${article.slug}`)}
          />
        );
      })}
      {getArticlesService.loading && <p>Loading...</p>}
      {!hasMore && <p>No more articles to show</p>}
    </section>
  );
};

export { Articles };
