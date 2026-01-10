import { Children, isValidElement, ReactElement, ReactNode } from "react";
import ExportedImage from "next-image-export-optimizer";

import CodeBlock from "./CodeBlock";
import Collapsible from "./Collapsible";

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode };
    if (props.children) {
      return extractTextFromChildren(props.children);
    }
  }
  return "";
}

export const MdxComponents = {
  img: (props: any) => (
    <ExportedImage
      className={"w-full max-w-2xl"}
      width={700}
      height={320}
      placeholder={"blur"}
      blurDataURL={
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8MBMAAj8Ba+8o2i0AAAAASUVORK5CYII="
      }
      alt={"Posts Image"}
      {...props}
    />
  ),
  table: ({ children, ...props }: any) => (
    <div className="w-auto">
      <table {...props}>{children}</table>
    </div>
  ),
  blockquote: ({ children, ...props }: any) => (
    <div className="w-auto" {...props}>
      {children}
    </div>
  ),
  pre: ({ children, ...props }: any) => {
    const codeElement = Children.toArray(children).find(
      (child) => isValidElement(child) && child.type === "code"
    );

    if (isValidElement(codeElement)) {
      const codeProps = codeElement.props as {
        className?: string;
        children?: ReactNode;
        "data-filename"?: string;
      };
      const className = codeProps.className || "";
      const languageMatch = className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "plaintext";
      const code = extractTextFromChildren(codeProps.children);
      const filename =
        props["data-rehype-pretty-code-title"] || codeProps["data-filename"];

      return <CodeBlock code={code} language={language} filename={filename} />;
    }

    return <pre {...props}>{children}</pre>;
  },
  Collapsible,
};
