import { relations } from "drizzle-orm/relations";
import {
  channels,
  articles,
  contentTypes,
  regions,
  articleRegions,
  analysts,
  articleAnalysts,
} from "./models";

export const articlesRelations = relations(articles, ({ one, many }) => ({
  channel: one(channels, {
    fields: [articles.channelId],
    /**
     * The provided `channels` table does not have `id` column, but
     * in the DB there is still a relational mapping with the `id` column.
     *
     * Hence, disabling the following TS error
     *
     */
    // @ts-ignore
    references: [channels.id],
  }),
  contentType: one(contentTypes, {
    fields: [articles.contentTypeId],
    references: [contentTypes.id],
  }),
  articleRegions: many(articleRegions),
  articleAnalysts: many(articleAnalysts),
}));

export const channelsRelations = relations(channels, ({ many }) => ({
  articles: many(articles),
}));

export const contentTypesRelations = relations(contentTypes, ({ many }) => ({
  articles: many(articles),
}));

export const articleRegionsRelations = relations(articleRegions, ({ one }) => ({
  region: one(regions, {
    fields: [articleRegions.regionId],
    references: [regions.id],
  }),
  article: one(articles, {
    fields: [articleRegions.articleSlug],
    references: [articles.slug],
  }),
}));

export const regionsRelations = relations(regions, ({ many }) => ({
  articleRegions: many(articleRegions),
}));

export const articleAnalystsRelations = relations(
  articleAnalysts,
  ({ one }) => ({
    analyst: one(analysts, {
      fields: [articleAnalysts.analystSlug],
      references: [analysts.slug],
    }),
    article: one(articles, {
      fields: [articleAnalysts.articleSlug],
      references: [articles.slug],
    }),
  })
);

export const analystsRelations = relations(analysts, ({ many }) => ({
  articleAnalysts: many(articleAnalysts),
}));
