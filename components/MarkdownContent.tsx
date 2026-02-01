"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import Link from "next/link";

// Utility function to slugify text for heading IDs
function slugify(str: string): string {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

// Custom Link Component
function CustomLink({
    href,
    children,
    ...rest
}: {
    href?: string;
    children: React.ReactNode;
    [key: string]: unknown;
}) {
    const styles =
        "font-medium border-b border-primary hover:border-b-2 text-foreground/90 hover:text-foreground transition-all duration-75";

    if (!href) return <span {...rest}>{children}</span>;

    // Internal links (starting with /)
    if (href.startsWith("/")) {
        return (
            <Link className={styles} href={href} {...rest}>
                {children}
            </Link>
        );
    }

    // Anchor links (starting with #)
    if (href.startsWith("#")) {
        return (
            <a className={styles} href={href} {...rest}>
                {children}
            </a>
        );
    }

    // External links
    return (
        <a
            className={styles}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
        >
            {children}
        </a>
    );
}

// Rounded Image Component with Caption
function RoundedImage({ src, alt, ...props }: { src?: string; alt?: string }) {
    return (
        <figure className="my-8 w-full">
            <img
                src={src}
                alt={alt || ""}
                className="rounded-xl w-full max-w-full"
                {...props}
            />
            {alt && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

// Code Block Component with syntax highlighting and copy button
function CodeBlock({
    children,
    className,
    ...props
}: {
    children?: React.ReactNode;
    className?: string;
}) {
    const [isCopied, setIsCopied] = useState(false);

    const codeString = String(children).replace(/\n$/, "");
    const isMultiLine = codeString.includes("\n");

    // Extract language from className (format: language-javascript)
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    const codeHTML = highlight(codeString);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(codeString)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 3000);
            })
            .catch((err) => {
                console.error("Failed to copy code: ", err);
            });
    };

    // Inline code
    if (!isMultiLine) {
        return (
            <code
                className="bg-muted px-1.5 py-0.5 rounded text-[15px] font-mono border border-border/50"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        );
    }

    // Multi-line code block
    return (
        <div className="w-full my-6 rounded-xl overflow-hidden bg-muted/30 border border-border">
            {/* Header with language and copy button */}
            <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    {language && (
                        <span className="ml-2 text-xs text-muted-foreground font-mono uppercase">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    title="Copy code"
                >
                    {isCopied ? (
                        <svg
                            className="h-4 w-4 text-green-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"
                            />
                            <rect
                                width="10.5"
                                height="10.5"
                                x="8.75"
                                y="8.75"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                rx="2"
                            />
                        </svg>
                    )}
                </button>
            </div>
            {/* Code content */}
            <div className="overflow-x-auto p-4">
                <code
                    className="text-sm font-mono leading-relaxed block whitespace-pre-wrap break-words"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: codeHTML }}
                    {...props}
                />
            </div>
        </div>
    );
}

// Pre wrapper for code blocks
function PreBlock({
    children,
    ...props
}: {
    children?: React.ReactNode;
}) {
    return <>{children}</>;
}

// Heading components with anchor links
function createHeading(level: number) {
    const HeadingComponent = ({ children }: { children?: React.ReactNode }) => {
        const text = React.Children.toArray(children)
            .filter((child) => typeof child === "string")
            .join("");
        const slug = slugify(text);

        const sizeClasses: Record<number, string> = {
            1: "text-3xl md:text-4xl mt-8 mb-4",
            2: "text-2xl md:text-3xl mt-8 mb-4",
            3: "text-xl md:text-2xl mt-6 mb-3",
            4: "text-lg md:text-xl mt-4 mb-2",
            5: "text-base md:text-lg mt-4 mb-2",
            6: "text-sm md:text-base mt-4 mb-2",
        };

        const Tag = `h${level}` as keyof JSX.IntrinsicElements;

        return (
            <Tag
                id={slug}
                className={`font-semibold text-foreground scroll-mt-24 ${sizeClasses[level]}`}
            >
                <a href={`#${slug}`} className="hover:text-primary transition-colors">
                    {children}
                </a>
            </Tag>
        );
    };

    HeadingComponent.displayName = `Heading${level}`;
    return HeadingComponent;
}

// List components
function OrderedList({ children }: { children?: React.ReactNode }) {
    return (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80">
            {children}
        </ol>
    );
}

function UnorderedList({ children }: { children?: React.ReactNode }) {
    return (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">{children}</ul>
    );
}

function ListItem({ children }: { children?: React.ReactNode }) {
    return <li className="leading-7 text-[17px] md:text-lg">{children}</li>;
}

// Paragraph component
function Paragraph({ children }: { children?: React.ReactNode }) {
    return <p className="mb-6 text-[17px] md:text-lg leading-7 text-foreground/80">{children}</p>;
}

// Blockquote component
function Blockquote({ children }: { children?: React.ReactNode }) {
    return (
        <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-[17px] md:text-lg text-foreground/70 bg-muted/50 py-1 pr-4 rounded-r-lg">
            {children}
        </blockquote>
    );
}

// Table components
function Table({ children }: { children?: React.ReactNode }) {
    return (
        <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-border rounded-lg overflow-hidden">
                {children}
            </table>
        </div>
    );
}

function TableHead({ children }: { children?: React.ReactNode }) {
    return <thead className="bg-muted">{children}</thead>;
}

function TableBody({ children }: { children?: React.ReactNode }) {
    return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children?: React.ReactNode }) {
    return <tr className="border-b border-border">{children}</tr>;
}

function TableCell({ children }: { children?: React.ReactNode }) {
    return <td className="px-4 py-3 text-[15px] md:text-base text-foreground/80" >{children}</td>;
}

function TableHeader({ children }: { children?: React.ReactNode }) {
    return (
        <th className="px-4 py-3 text-left text-[15px] md:text-base font-semibold text-foreground">{children}</th>
    );
}

// Horizontal rule
function HorizontalRule() {
    return <hr className="my-8 border-t border-border" />;
}

// Strong/Bold text
function Strong({ children }: { children?: React.ReactNode }) {
    return <strong className="font-semibold text-foreground">{children}</strong>;
}

// Emphasis/Italic text
function Emphasis({ children }: { children?: React.ReactNode }) {
    return <em className="italic">{children}</em>;
}

// Components mapping for ReactMarkdown
const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: Paragraph,
    a: CustomLink,
    img: RoundedImage,
    code: CodeBlock,
    pre: PreBlock,
    ol: OrderedList,
    ul: UnorderedList,
    li: ListItem,
    blockquote: Blockquote,
    table: Table,
    thead: TableHead,
    tbody: TableBody,
    tr: TableRow,
    td: TableCell,
    th: TableHeader,
    hr: HorizontalRule,
    strong: Strong,
    em: Emphasis,
};

// Main MarkdownContent component
interface MarkdownContentProps {
    content: string;
    className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
    return (
        <div className={`markdown-content ${className}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownContent;
