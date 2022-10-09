import getStyles from './../styles';
import { getTheme } from './../theme';

describe('getStyles', () => {
  it('light theme', () => {
    const theme = getTheme('light');
    const styles = getStyles({}, 'light');
    expect(styles.container?.backgroundColor).toBe(theme.colors.background);
  });
  it('dark theme', () => {
    const theme = getTheme('dark');
    const styles = getStyles({}, 'dark');
    expect(styles.container?.backgroundColor).toBe(theme.colors.background);
  });
  it('default theme', () => {
    const theme = getTheme(null);
    const styles = getStyles({}, null);
    expect(styles.container?.backgroundColor).toBe(theme.colors.background);
  });
  it('user styles, light theme', () => {
    const styles = getStyles(
      {
        container: {
          backgroundColor: '#aaa',
          padding: 2,
        },
      },
      'light'
    );
    expect(styles.container?.backgroundColor).toBe('#aaa');
    expect(styles.container?.padding).toBe(2);
  });
  it('user styles, dark theme', () => {
    const styles = getStyles(
      {
        container: {
          backgroundColor: '#aaa',
          padding: 2,
        },
      },
      'dark'
    );
    expect(styles.container?.backgroundColor).toBe('#aaa');
    expect(styles.container?.padding).toBe(2);
  });
  it('user styles, default theme', () => {
    const styles = getStyles(
      {
        container: {
          backgroundColor: '#aaa',
          padding: 2,
        },
      },
      null
    );
    expect(styles.container?.backgroundColor).toBe('#aaa');
    expect(styles.container?.padding).toBe(2);
  });
});
