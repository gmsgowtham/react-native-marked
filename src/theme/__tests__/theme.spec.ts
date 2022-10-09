import { getTheme } from '../theme';
import colors from '../colors';

describe('getTheme', () => {
  it('light theme', () => {
    const theme = getTheme('light');
    expect(theme.colors).toMatchObject(colors.light);
  });
  it('dark theme', () => {
    const theme = getTheme('dark');
    expect(theme.colors).toMatchObject(colors.dark);
  });
  it('defaults to light theme', () => {
    const theme = getTheme(null);
    expect(theme.colors).toMatchObject(colors.light);
  });
});
