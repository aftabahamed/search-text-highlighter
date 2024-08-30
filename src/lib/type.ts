export interface OptionsType {
  htmlTag?: string;
  customClass?: string;
  matchAll?: boolean;
  caseSensitive?: boolean;
}

export interface UtilsType {
  validate: {
    highlight(text: string, query: string, option?: OptionsType): void;
    options(options: OptionsType): void;
  };
  getOptions(options: OptionsType): OptionsType;
}

export interface highlightSearhTextType {
  highlight: (text: string, query: string, options?: OptionsType) => string;
}
