import * as React from 'react';
import { marked } from 'marked';
import Parser from './Parser';

interface MarkdownProps {
  value: string;
}

const Markdown = ({ value }: MarkdownProps) => {
  const tokens = marked.lexer(value.trim());
  const parser = new Parser();
  const rnElements = parser.parse(tokens);
  return <>{rnElements}</>;
};

export default Markdown;
