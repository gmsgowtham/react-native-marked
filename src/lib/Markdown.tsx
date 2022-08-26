import * as React from 'react';
import { marked } from 'marked';
import Parser from './Parser';

interface MarkdownProps {
  value: string;
  contentWidth: number;
}

const Markdown = ({ value, contentWidth }: MarkdownProps) => {
  const tokens = marked.lexer(value.trim());
  const parser = new Parser({ contentWidth });
  const rnElements = parser.parse(tokens);
  // console.log(tokens);
  return <>{rnElements}</>;
};

export default Markdown;
