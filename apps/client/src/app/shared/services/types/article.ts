/**
 * @author Abhijit Baldawa
 */

export type Article = {
  slug: string;
  contentTypeId: number;
  channelId: number;
  title: string;
  publishedAt: string;
  summary?: string | null;
  content?: string | null;
};
