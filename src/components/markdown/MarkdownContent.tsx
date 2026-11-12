import * as React from "react";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import "./markdown-content.css";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

const markdownSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "aside"],
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ["className", "hljs"],
      ["className", /^language-/],
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      ["className", /^hljs-/],
    ],
  },
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="markdown-content prose prose-stone max-w-none">
      <ReactMarkdown
				remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          [rehypeSanitize, markdownSchema],
        ]}
        components={{
          pre({ children }) {
            const codeRef = useRef<HTMLPreElement>(null);

            const codeElement = React.isValidElement<{
              className?: string;
            }>(children)
              ? children
              : null;

            const language =
              codeElement?.props.className
                ?.replace("language-", "")
                .replace("hljs", "")
                .trim() || "text";

            const handleCopy = async () => {
              const code = codeRef.current?.innerText;

              if (code) {
                await navigator.clipboard.writeText(code);
              }
            };

            return (
              <div className="markdown-code-wrapper">
                <div className="markdown-code-header">
                  <span>{language.toUpperCase()}</span>
                  <button onClick={handleCopy}>
                    복사
                  </button>
                </div>

                <pre
                  ref={codeRef}
                  className="markdown-code-block"
                >
                  {children}
                </pre>
              </div>
            );
          },

          code({ className, children, ...props }) {
            const isBlock =
              className?.includes("language-") ||
              className?.split(" ").includes("hljs");

            return (
              <code
                className={
                  isBlock ? className : "markdown-inline-code"
                }
                {...props}
              >
                {children}
              </code>
            );
          },

					table({ children }) {
						return (
							<div className="markdown-table-wrapper">
								<table>{children}</table>
							</div>
						);
					},
					
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}