import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Markdown from '../Markdown';

// https://www.markdownguide.org/basic-syntax/#headings
describe('Headings', () => {
  it('Heading level 1', () => {
    const r = render(<Markdown value={'# Heading level 1'} />);
    expect(screen.queryByText('Heading level 1')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Heading level 2', () => {
    const r = render(<Markdown value={'## Heading level 2'} />);
    expect(screen.queryByText('Heading level 2')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Heading level 3', () => {
    const r = render(<Markdown value={'### Heading level 3'} />);
    expect(screen.queryByText('Heading level 3')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Heading level 4', () => {
    const r = render(<Markdown value={'#### Heading level 4'} />);
    expect(screen.queryByText('Heading level 4')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Heading level 5', () => {
    const r = render(<Markdown value={'##### Heading level 5'} />);
    expect(screen.queryByText('Heading level 5')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Heading level 6', () => {
    const r = render(<Markdown value={'###### Heading level 6'} />);
    expect(screen.queryByText('Heading level 6')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Alternate Syntax: Heading level 1', () => {
    const r = render(<Markdown value={'Heading level 1\n==============='} />);
    expect(screen.queryByText('Heading level 1')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Alternate Syntax: Heading level 2', () => {
    const r = render(<Markdown value={'Heading level 2\n---------------'} />);
    expect(screen.queryByText('Heading level 2')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Best Practice', () => {
    const r = render(
      <Markdown
        value={
          'Try to put a blank line before...\n\n# Heading\n\n...and after a heading.'
        }
      />
    );
    expect(screen.queryByText('Heading')).toBeTruthy();
    expect(
      screen.queryByText('Try to put a blank line before...')
    ).toBeTruthy();
    expect(screen.queryByText('...and after a heading.')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#paragraphs-1
describe('Paragraphs', () => {
  it('Paragraph', () => {
    const r = render(
      <Markdown
        value={
          "I really like using Markdown.\n\nI think I'll use it to format all of my documents from now on."
        }
      />
    );
    expect(screen.queryByText('I really like using Markdown.')).toBeTruthy();
    expect(
      screen.queryByText(
        "I think I'll use it to format all of my documents from now on."
      )
    ).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#emphasis
describe('Emphasis', () => {
  it('Bold', () => {
    const r = render(<Markdown value={'Love **is** bold'} />);
    expect(screen.queryByText('is')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Italic', () => {
    const r = render(<Markdown value={'A *cat* meow'} />);
    expect(screen.queryByText('cat')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Bold and Italic', () => {
    const r = render(
      <Markdown value={'This is really ***very*** important text.'} />
    );
    expect(screen.queryByText('very')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#blockquotes-1
describe('Blockquotes', () => {
  it('Blockquote', () => {
    const r = render(
      <Markdown
        value={
          '> Dorothy followed her through many of the beautiful rooms in her castle.'
        }
      />
    );
    expect(
      screen.queryByText(
        'Dorothy followed her through many of the beautiful rooms in her castle.'
      )
    ).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Blockquotes with Multiple Paragraphs', () => {
    const r = render(
      <Markdown
        value={
          '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.'
        }
      />
    );
    expect(
      screen.queryByText(
        'Dorothy followed her through many of the beautiful rooms in her castle.'
      )
    ).toBeTruthy();
    expect(
      screen.queryByText(
        'The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.'
      )
    ).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Nested Blockquotes', () => {
    const r = render(
      <Markdown
        value={
          '> Dorothy followed her through many of the beautiful rooms in her castle.\n>\n\n>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.'
        }
      />
    );
    expect(
      screen.queryByText(
        'Dorothy followed her through many of the beautiful rooms in her castle.'
      )
    ).toBeTruthy();
    expect(
      screen.queryByText(
        'The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.'
      )
    ).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Blockquotes with Other Elements', () => {
    const r = render(
      <Markdown
        value={
          '> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.'
        }
      />
    );
    expect(
      screen.queryByText('The quarterly results look great!')
    ).toBeTruthy();
    expect(screen.queryByText('Revenue was off the chart.')).toBeTruthy();
    expect(screen.queryByText('Profits were higher than ever.')).toBeTruthy();
    expect(screen.queryByText('Everything')).toBeTruthy();
    expect(screen.queryByText('is going according to')).toBeTruthy();
    expect(screen.queryByText('plan')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#lists-1
describe('Lists', () => {
  it('Ordered Lists', () => {
    const r = render(
      <Markdown
        value={
          '1. First item\n2. Second item\n3. Third item\n    1. Indented item1\n    2. Indented item2\n4. Fourth item'
        }
      />
    );
    expect(screen.queryByText('First item')).toBeTruthy();
    expect(screen.queryByText('Second item')).toBeTruthy();
    expect(screen.queryByText('Third item')).toBeTruthy();
    expect(screen.queryByText('Indented item1')).toBeTruthy();
    expect(screen.queryByText('Indented item2')).toBeTruthy();
    expect(screen.queryByText('Fourth item')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Unordered Lists', () => {
    const r = render(
      <Markdown
        value={
          '- First item\n- Second item\n- Third item\n    - Indented item1\n    - Indented item2\n- Fourth item'
        }
      />
    );
    expect(screen.queryByText('First item')).toBeTruthy();
    expect(screen.queryByText('Second item')).toBeTruthy();
    expect(screen.queryByText('Third item')).toBeTruthy();
    expect(screen.queryByText('Indented item1')).toBeTruthy();
    expect(screen.queryByText('Indented item2')).toBeTruthy();
    expect(screen.queryByText('Fourth item')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Elements in Lists: Paragraphs', () => {
    const r = render(
      <Markdown
        value={
          "- This is the first list item.\n- Here's the second list item.\n\n    I need to add another paragraph below the second list item.\n\n- And here's the third list item."
        }
      />
    );
    expect(screen.queryByText('This is the first list item.')).toBeTruthy();
    expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
    expect(
      screen.queryByText(
        'I need to add another paragraph below the second list item.'
      )
    ).toBeTruthy();
    expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Elements in Lists: Blockquotes', () => {
    const r = render(
      <Markdown
        value={
          "- This is the first list item.\n- Here's the second list item.\n\n    > A blockquote would look great below the second list item.\n\n- And here's the third list item."
        }
      />
    );
    expect(screen.queryByText('This is the first list item.')).toBeTruthy();
    expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
    expect(
      screen.queryByText(
        'A blockquote would look great below the second list item.'
      )
    ).toBeTruthy();
    expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Elements in Lists: Code Blocks', () => {
    const r = render(
      <Markdown
        value={
          "* This is the first list item.\n* Here's the second list item.\n\n        <html>\n        <head>\n        </head>\n        </html>\n\n* And here's the third list item."
        }
      />
    );
    expect(screen.queryByText('This is the first list item.')).toBeTruthy();
    expect(screen.queryByText("Here's the second list item.")).toBeTruthy();
    expect(screen.queryByText("And here's the third list item.")).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Elements in Lists: Images', () => {
    const r = render(
      <Markdown
        value={
          '1. Open the file containing the Linux mascot.\n2. Marvel at its beauty.\n\n    ![Tux, the Linux mascot](https://dummyimage.com/100x100/fff/aaa)\n\n3. Close the file.'
        }
      />
    );
    expect(
      screen.queryByText('Open the file containing the Linux mascot.')
    ).toBeTruthy();
    expect(screen.queryByText('Marvel at its beauty.')).toBeTruthy();
    expect(screen.queryByText('Close the file.')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Elements in Lists: Lists', () => {
    const r = render(
      <Markdown
        value={
          '1. First item\n2. Second item\n3. Third item\n    - Indented item1\n    - Indented item2\n4. Fourth item'
        }
      />
    );
    expect(screen.queryByText('First item')).toBeTruthy();
    expect(screen.queryByText('Second item')).toBeTruthy();
    expect(screen.queryByText('Third item')).toBeTruthy();
    expect(screen.queryByText('Indented item1')).toBeTruthy();
    expect(screen.queryByText('Indented item2')).toBeTruthy();
    expect(screen.queryByText('Fourth item')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#code
describe('Code', () => {
  it('Code Span', () => {
    const r = render(
      <Markdown value={'At the command prompt, type `nano`.'} />
    );
    expect(screen.queryByText('At the command prompt, type')).toBeTruthy();
    expect(screen.queryByText('nano')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Code Blocks', () => {
    const r = render(
      <Markdown
        value={'    <html>\n      <head>\n      </head>\n    </html>'}
      />
    );
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Code Blocks (backtick)', () => {
    const r = render(
      <Markdown
        value={'```<html>\n      <head>\n      </head>\n    </html>```'}
      />
    );
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#horizontal-rules
describe('Horizontal Rules', () => {
  it('Asterisks', () => {
    const r = render(<Markdown value={'***'} />);
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Dashes', () => {
    const r = render(<Markdown value={'---'} />);
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Underscores', () => {
    const r = render(<Markdown value={'_________________'} />);
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Horizontal Rule with Paragraph', () => {
    const r = render(
      <Markdown
        value={
          'Try to put a blank line before...\n\n---\n\n...and after a horizontal rule.'
        }
      />
    );
    expect(
      screen.queryByText('Try to put a blank line before...')
    ).toBeTruthy();
    expect(screen.queryByText('...and after a horizontal rule.')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#links
describe('Links', () => {
  it('Basic', () => {
    const r = render(
      <Markdown
        value={
          'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).'
        }
      />
    );
    expect(screen.queryByText('My favorite search engine is')).toBeTruthy();
    expect(screen.queryByText('Duck Duck Go')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Titles', () => {
    const r = render(
      <Markdown
        value={
          'My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").'
        }
      />
    );
    expect(screen.queryByText('My favorite search engine is')).toBeTruthy();
    expect(screen.queryByText('Duck Duck Go')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('URLs and Email Addresses', () => {
    const r = render(
      <Markdown
        value={'<https://www.markdownguide.org>\n\n<fake@example.com>'}
      />
    );
    expect(screen.queryByText('https://www.markdownguide.org')).toBeTruthy();
    expect(screen.queryByText('fake@example.com')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Formatting Links', () => {
    const r = render(
      <Markdown
        value={
          'I love supporting the **[EFF](https://eff.org)**.\nThis is the *[Markdown Guide](https://www.markdownguide.org)*.\nSee the section on [`code`](#code).'
        }
      />
    );
    expect(screen.queryByText('EFF')).toBeTruthy();
    expect(screen.queryByText('Markdown Guide')).toBeTruthy();
    expect(screen.queryByText('code')).toBeTruthy();
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// https://www.markdownguide.org/basic-syntax/#images-1
describe('Images', () => {
  it('Render', () => {
    const r = render(
      <Markdown
        value={
          '![The San Juan Mountains are beautiful!](https://dummyimage.com/100x100/fff/aaa "San Juan Mountains")'
        }
      />
    );
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Linking Images', () => {
    const tree = render(
      <Markdown
        value={
          '[![An old rock in the desert](/assets/images/shiprock.jpg "Shiprock, New Mexico by Beau Rogers")](https://dummyimage.com/100x100/fff/aaa)'
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HTML', () => {
  it('Render', () => {
    const r = render(
      <Markdown
        value={'This **word** is bold. This <em>word</em> is italic.'}
      />
    );
    const tree = r.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
