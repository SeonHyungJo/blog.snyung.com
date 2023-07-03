"use client";

import "@docsearch/css";
import { DocSearch } from "@docsearch/react";


const APP_KEY = process.env.NEXT_PUBLIC_DOC_SEARCH_API_KEY as string;
const APP_ID = process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID as string;
const INDEX_NAME = process.env.NEXT_PUBLIC_DOC_SEARCH_INDEX_NAME as string;

export default function BlogSearch() {
  return (
    <DocSearch
      appId={APP_ID}
      indexName={INDEX_NAME}
      apiKey={APP_KEY}
      placeholder="검색해주세요."
    />
  );
}