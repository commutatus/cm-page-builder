export const TEXT_INPUT_COMPONENT = [
  "Text",
  "Title",
  "Header1",
  "Header2",
  "Ulist",
  "Olist",
  "Code",
];

export const S3_BASE_URL = "https://cdn-expa.aiesec.org";

export const REGEX_FILTER_TAGS = /(<([^>]+)>)/gi;

// const TYPE_MAP_COMPONENT = {
//   header: 'Header1',
//   sub_header: 'Header2',
//   ordered_list: 'Olist',
//   unordered_list: 'Ulist',
//   text: 'Text',
//   page_link: 'Text',
//   video: 'Embed',
//   file: 'File',
//   image: 'Upload',
//   divider: 'Divider'
// };

export const TAGS_TO_COMPONENT_MAP = {
  ol: "Olist",
  ul: "Ulist",
  embed: "Embed",
  img: "Upload",
  h1: "Header1",
  h2: "Header2",
  hr: "Divider",
};

export const TEXT_COMPONENT = ["Olist", "Ulist", "Header1", "Header2", "Text"];

export const ALLOWED_TAGS = [
  "h1",
  "h2",
  "ol",
  "ul",
  "div",
  "a",
  "embed",
  "a",
  "img",
  "br",
  "p",
  "span",
  "strong",
  "li",
  "hr",
  "span",
  "strong",
  "b",
  "i",
  "em",
  "small",
  "strong",
  "strike",
  "meta",
];

export const IS_INLINE_COMPONENT = [
  "span",
  "strong",
  "b",
  "i",
  "em",
  "small",
  "strong",
  "p",
  "a",
  "strike",
  "meta",
];

export const DEFAULT_COMPONENT_TYPES = [
  {
    name: "Header1",
    icon: "fa-regular fa-h1",
  },
  {
    name: "Header2",
    icon: "fa-light fa-h2",
  },
  {
    name: "Olist",
    icon: "fa-light fa-list-ol",
  },
  {
    name: "Ulist",
    icon: "fa-light fa-list-ul",
  },
  {
    name: "Code",
    icon: "fa-light fa-code",
  },
  {
    name: "Upload",
    icon: "fa-light fa-image",
  },
  {
    name: "Embed",
    icon: "fa-light fa-clapperboard-play",
  },
  {
    name: "File",
    icon: "fa-light fa-arrow-up-from-bracket",
  },
  {
    name: "Divider",
    icon: "fa-light fa-grid-dividers",
  },
];
