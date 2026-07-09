"use client";

import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type HeadingTreeNode = Heading & {
  children: HeadingTreeNode[];
};

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function cleanHeadingText(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();
}

function extractHeadings(content: string): Heading[] {
  if (!content) return []

  return content
    .split("\n")
    .map((line) => {
      const match = /^(#{2,4})\s+(.+)$/.exec(line.trim());

      if (!match) {
        return null;
      }

      const text = cleanHeadingText(match[2]);
      if (!text) {
        return null;
      }

      return {
        id: slugify(text),
        text,
        level: match[1].length,
      };
    })
    .filter((heading): heading is Heading => Boolean(heading));
}

function buildHeadingTree(headings: Heading[]): HeadingTreeNode[] {
  const root: HeadingTreeNode[] = [];
  const stack: HeadingTreeNode[] = [];

  headings.forEach((heading) => {
    const node: HeadingTreeNode = {
      ...heading,
      children: [],
    };

    while (stack.length && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (!stack.length) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return root;
}

function hasActiveDescendant(node: HeadingTreeNode, activeId: string): boolean {
  return node.children.some(
    (child) => child.id === activeId || hasActiveDescendant(child, activeId)
  );
}

export default function BlogTableOfContents({
  content,
}: {
  content: string;
}) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const headingTree = useMemo(() => buildHeadingTree(headings), [headings]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const visibleHeadings = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) {
            return;
          }

          if (entry.isIntersecting) {
            visibleHeadings.set(id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(id);
          }
        });

        const nextActiveId = [...visibleHeadings.entries()]
          .sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0]?.[0];

        if (nextActiveId) {
          setActiveId(nextActiveId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    elements.forEach((element) => observer.observe(element));

    setActiveId(elements[0]?.id ?? "");

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  const renderTree = (nodes: HeadingTreeNode[], depth = 0) => {
    return (
      <ul className={depth > 0 ? "toc-branch" : ""}>
        {nodes.map((node) => {
          const isActive = activeId === node.id;
          const isActiveBranch = hasActiveDescendant(node, activeId);

          return (
            <li
              key={node.id}
              className={node.children.length ? "toc-node has-children" : "toc-node"}
            >
              <a
                href={`#${node.id}`}
                className={[
                  "toc-link",
                  isActive ? "active" : "",
                  isActiveBranch ? "branch-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={(event) => handleAnchorClick(event, node.id)}
              >
                <span className="toc-link-row">
                  <span className="toc-branch-dot" />
                  <span>{node.text}</span>
                </span>
              </a>

              {node.children.length > 0 ? renderTree(node.children, depth + 1) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className="toc lg:sticky lg:top-24">
      <h3>
        <List className="mr-2 h-4 w-4 text-primary" />
        Table of Contents
      </h3>

      {renderTree(headingTree)}
    </aside>
  );
}
