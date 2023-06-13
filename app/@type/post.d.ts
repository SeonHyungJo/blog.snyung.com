export type Frontmatter = {
  path: string;
  title: string;
  description?: string;
  date: string;
  draft?: boolean;
  tags: string[];
  category: string;
  readingMinutes: number;
};

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};