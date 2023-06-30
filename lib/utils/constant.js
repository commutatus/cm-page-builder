"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TEXT_INPUT_COMPONENT = exports.TEXT_INPUT_COMPONENT = ["Text", "Title", "Header1", "Header2", "Ulist", "Olist", "Code"];

var S3_BASE_URL = exports.S3_BASE_URL = "https://cdn-expa.aiesec.org";

var REGEX_FILTER_TAGS = exports.REGEX_FILTER_TAGS = /(<([^>]+)>)/gi;

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

var TAGS_TO_COMPONENT_MAP = exports.TAGS_TO_COMPONENT_MAP = {
  ol: "Olist",
  ul: "Ulist",
  embed: "Embed",
  img: "Upload",
  h1: "Header1",
  h2: "Header2",
  hr: "Divider"
};

var TEXT_COMPONENT = exports.TEXT_COMPONENT = ["Olist", "Ulist", "Header1", "Header2", "Text"];

var ALLOWED_TAGS = exports.ALLOWED_TAGS = ["h1", "h2", "ol", "ul", "div", "a", "embed", "a", "img", "br", "p", "span", "strong", "li", "hr", "span", "strong", "b", "i", "em", "small", "strong", "strike", "meta"];

var IS_INLINE_COMPONENT = exports.IS_INLINE_COMPONENT = ["span", "strong", "b", "i", "em", "small", "strong", "p", "a", "strike", "meta"];

var DEFAULT_COMPONENT_TYPES = exports.DEFAULT_COMPONENT_TYPES = [{
  name: "Header1",
  icon: "fa-regular fa-h1"
}, {
  name: "Header2",
  icon: "fa-light fa-h2"
}, {
  name: "Olist",
  icon: "fa-light fa-list-ol"
}, {
  name: "Ulist",
  icon: "fa-light fa-list-ul"
}, {
  name: "Code",
  icon: "fa-light fa-code"
}, {
  name: "Upload",
  icon: "fa-light fa-image"
}, {
  name: "Embed",
  icon: "fa-light fa-clapperboard-play"
}, {
  name: "File",
  icon: "fa-light fa-arrow-up-from-bracket"
}, {
  name: "Divider",
  icon: "fa-light fa-grid-dividers"
}];