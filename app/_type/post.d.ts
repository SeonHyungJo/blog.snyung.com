import { JSX } from "react";

export type Frontmatter = {
  path: string;
  title: string;
  description?: string;
  date: string;
  draft?: boolean;
  tags: string[];
  category: string;
  readingMinutes: number;
  author: string;
};

export type Post<TFrontmatter> = {
  content: JSX.Element;
  frontmatter: TFrontmatter;
};
