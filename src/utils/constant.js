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

export const TAGS_TO_COMPONENT_MAP = {
  h1: 'header',
  h2: 'sub_header',
  ol: 'ordered_list',
  ul: 'unordered_list',
  div: 'text',
  a: 'page_link',
  embed: 'video',
  a: 'file',
  img: 'image',
  br: 'divider',
  p: 'text'
}

export const isHeaderTag = (tag) => {
  return ['h3', 'h4', 'h5', 'h6']. includes(tag)
}

// export const isNotSupportedTag = (tag) => {
  
// }