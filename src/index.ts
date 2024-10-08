import { OptionsType, highlightSearhTextType } from './lib/type';
import Utils from './lib/utils';

/**
 * Allow find a string or substring from a text and
 * highlight it with html wrapper and unicode support.
 * @return {string}
 */
const highlightSearhText: highlightSearhTextType = {
  highlight(
    text: string = '',
    query: string = '',
    options: OptionsType = {}
  ): string {
    Utils.validate.highlight(text, query, options);

    options = Utils.getOptions(options);
    if (!query) {
      return text;
    }

    let modifiers = options.matchAll ? 'g' : '';
    modifiers += options.caseSensitive ? '' : 'i';
    return text.replace(new RegExp(query, modifiers), (match) => {
      return `<${options.htmlTag} class="${options.customClass}">${match}</${options.htmlTag}>`;
    });
  },
};

export default highlightSearhText;
module.exports = highlightSearhText;
