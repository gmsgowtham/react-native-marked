import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react-native';
import Renderer from '../Renderer';
import getStyles from './../../theme/styles';

const styles = getStyles();

describe('Renderer', () => {
  describe('getTextNode', () => {
    it('returns a Text node', () => {
      const renderer = new Renderer();
      const TextNode = renderer.getTextNode(
        'Hello world',
        styles.text
      ) as ReactElement;

      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('returns a wrapped Text node', () => {
      const renderer = new Renderer();
      const TextNodeChild = renderer.getTextNode('Hello world', {});
      const TextNode = renderer.getTextNode(
        [TextNodeChild],
        styles.text
      ) as ReactElement;
      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('returns a wrapped Text node with styles', () => {
      const renderer = new Renderer();
      const TextNodeChild = renderer.getTextNode('Hello world', styles.text);
      const TextNode = renderer.getTextNode(
        [TextNodeChild],
        styles.text
      ) as ReactElement;
      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
