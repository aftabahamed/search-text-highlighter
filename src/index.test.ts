import highlightSearhText from '../src/index';

describe('Test search text highlight', () => {
  test('should highlight one query substring', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'amazing';
    const result: string = highlightSearhText.highlight(text, query);
    expect(result).toBe(
      'This is a simple but an <span class="text-highlight">amazing</span> tool for text highlight 😎.'
    );
  });

  test('should highlight multiple query substrings', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'a';
    const result: string = highlightSearhText.highlight(text, query);
    expect(result).toBe(
      'This is <span class="text-highlight">a</span> simple but <span class="text-highlight">a</span>n <span class="text-highlight">a</span>m<span class="text-highlight">a</span>zing tool for text highlight 😎.'
    );
  });

  test('should highlight a Unicode substring', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = '😎';
    const result: string = highlightSearhText.highlight(text, query);
    expect(result).toBe(
      'This is a simple but an amazing tool for text highlight <span class="text-highlight">😎</span>.'
    );
  });

  test('should do nothing with empty queries', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = '';
    const result: string = highlightSearhText.highlight(text, query);
    expect(result).toBe(text);
  });

  test('should be able to replace the default HTML tag', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'amazing';
    const options = { htmlTag: 'label' };
    const result: string = highlightSearhText.highlight(text, query, options);
    expect(result).toBe(
      'This is a simple but an <label class="text-highlight">amazing</label> tool for text highlight 😎.'
    );
  });

  test('should be able to replace the default highlight class', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'amazing';
    const options = { htmlTag: 'label', customClass: 'custom-class' };
    const result: string = highlightSearhText.highlight(text, query, options);
    expect(result).toBe(
      'This is a simple but an <label class="custom-class">amazing</label> tool for text highlight 😎.'
    );
  });

  test('should be able to highlight only the first query match', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'a';
    const options = { matchAll: false };
    const result: string = highlightSearhText.highlight(text, query, options);
    expect(result).toBe(
      'This is <span class="text-highlight">a</span> simple but an amazing tool for text highlight 😎.'
    );
  });

  test('should be able to highlight with case-sensitive match', () => {
    const text: string =
      'This is a simple but an amazing tool for text highlight 😎.';
    const query: string = 'Amazing';
    const options = { caseSensitive: true };
    const result: string = highlightSearhText.highlight(text, query, options);
    expect(result).toBe(
      'This is a simple but an amazing tool for text highlight 😎.'
    );
  });

  test('should throw error with not the right type parameter', () => {
    let text: any;
    let query: any;
    let options: any;

    // Invalid text
    text = 42;
    expect(() => {
      highlightSearhText.highlight(text, '');
    }).toThrow(Error);

    text = true;
    expect(() => {
      highlightSearhText.highlight(text, '');
    }).toThrow(Error);

    // Invalid query
    text = 'This is a simple but an amazing tool for text highlight 😎.';
    query = 5;
    expect(() => {
      highlightSearhText.highlight(text, query);
    }).toThrow(Error);

    query = true;
    expect(() => {
      highlightSearhText.highlight(text, query);
    }).toThrow(Error);

    // Invalid options
    query = 'amazing';
    options = true;
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { htmlTag: 563 };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { htmlTag: false };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { customClass: 50.0 };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { customClass: true };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { matchAll: 'true' };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { matchAll: 1 };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { caseSensitive: 42 };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);

    options = { caseSensitive: 'false' };
    expect(() => {
      highlightSearhText.highlight(text, query, options);
    }).toThrow(Error);
  });
});
