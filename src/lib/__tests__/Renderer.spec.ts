import { fireEvent, render, screen } from '@testing-library/react-native';
import Renderer from '../Renderer';
import getStyles from './../../theme/styles';

const styles = getStyles();
const renderer = new Renderer();

describe('Renderer', () => {
  describe('getTextNode', () => {
    it('returns a Text node', () => {
      const TextNode = renderer.getTextNode('Hello world', styles.text);

      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('returns a wrapped Text node', () => {
      const TextNodeChild = renderer.getTextNode('Hello world', {});
      const TextNode = renderer.getTextNode([TextNodeChild], styles.text);
      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('returns a wrapped Text node with styles', () => {
      const TextNodeChild = renderer.getTextNode('Hello world', styles.text);
      const TextNode = renderer.getTextNode([TextNodeChild], styles.text);
      const r = render(TextNode);
      expect(screen.queryByText('Hello world')).toBeTruthy();
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('getLinkNode', () => {
    it('returns a Link node', () => {
      const LinkNode = renderer.getLinkNode(
        'Link',
        'https://example.com',
        styles.link
      );
      const r = render(LinkNode);
      expect(screen.queryByText('Link')).toBeTruthy();
      fireEvent.press(screen.queryByText('Link'));
      const tree = r.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
