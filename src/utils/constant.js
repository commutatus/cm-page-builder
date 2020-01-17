export const TEXT_INPUT_COMPONENT = [
  'Text',
  'Title',
  'Header1',
  'Header2',
  'Ulist',
  'Olist'
]

export const S3_BASE_URL = "https://cdn-expa.aiesec.org"

export const REGEX_FILTER_TAGS = /(<([^>]+)>)/ig

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
  ol: 'Olist',
  ul: 'Ulist',
  embed: 'Embed',
  img: 'Upload',
  h1: 'Header1',
  h2: 'Header2',
  hr: 'Divider',
}

export const IS_ALLOWED_TAGS = [
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
  'hr',
  'span',
  'strong',
  'b',
  'i',
  'em',
  'small',
  'strong',
  'strike'
]

export const IS_INLINE_COMPONENT = [
  'span',
  'strong',
  'b',
  'i',
  'em',
  'small',
  'strong',
  'p',
  'a',
  'strike'
]