"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatOptionsToMultiSelect = exports.isTagAllowedToCreateComponent = exports.shouldUseParentTag = exports.convertObjectToText = exports.getComponentFromTag = exports.isInlineElement = exports.isTextTag = exports.isHeaderTag = exports.isAllowedTag = exports.bytesToSize = exports.toDataURL = exports.setCursorToEnd = exports.urlify = exports.getVideoUrl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sortDataOnPos = sortDataOnPos;
exports.compareAndDiff = compareAndDiff;

var _constant = require("./constant");

//Vimeo and youtube validator
var getVideoUrl = exports.getVideoUrl = function getVideoUrl(url) {
  var videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "");
  if (url.includes("vimeo")) {
    return "//player.vimeo.com/video/" + videoid;
  } else if (url.includes("youtube")) {
    return "https://www.youtube.com/embed/" + videoid;
  }
  return "";
};

var urlify = exports.urlify = function urlify(text) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return text.replace(urlRegex, function (url, b, c) {
    var url2 = c == "www." ? "http://" + url : url;
    return '<a href="' + url2 + '" target="_blank">' + url + "</a>";
  });
};

// Method to position the cursor at the end of the content
var setCursorToEnd = exports.setCursorToEnd = function setCursorToEnd(e) {
  var range = document.createRange();
  var sel = window.getSelection();
  if (e.target.innerHTML) {
    range.setStart(e.target.lastChild, e.target.lastChild.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

// convert url to dataUrl
var toDataURL = exports.toDataURL = function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
};

//sort pageComponents on the basis of pos
function sortDataOnPos(data) {
  var newData = [];
  for (var i in data) {
    newData[data[i].position - 1] = data[i];
  }
  return newData;
}

// Method to retain the "AddComponents" without any data
function compareAndDiff(newState, newData) {
  var data = [];
  var i = 0,
      j = 0;

  while (i < newState.length) {
    if (newData[j]) {
      if (newState[i].id === newData[j].id || newState[i].content === newData[j].content || newData[j].component_attachment && newState[i].component_attachment && newState[i].component_attachment.filename === newData[j].component_attachment.filename) {
        data.push(_extends({}, newData[j], { position: i + 1 }));
        i++;
        j++;
      } else if (!newState[i].content) {
        data.push(_extends({}, newState[i], { position: data.length }));
        i++;
      } else {
        data.push(_extends({}, newState[i], { position: i + 1 }));
        data.push(_extends({}, newData[j], { position: i + 2 }));
        i += 2;
        j++;
      }
    } else {
      data.push(_extends({}, newState[i], { position: i + 1 }));
      i++;
    }
  }
  return data;
}

// Function to convert file sizes in bytes to KB, MB, GB, TB
var bytesToSize = exports.bytesToSize = function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

//Check if a tag is allowed. All the tag are includes which are supported or will be converted to supported tags.
var isAllowedTag = exports.isAllowedTag = function isAllowedTag(tag, parentTag) {
  if (parentTag === "li" && (tag === "ul" || tag === "li" || tag === "ol")) {
    return false;
  }
  return _constant.ALLOWED_TAGS.includes(tag) || isHeaderTag(tag);
};

var isHeaderTag = exports.isHeaderTag = function isHeaderTag(tag) {
  return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag);
};

var isTextTag = exports.isTextTag = function isTextTag(tag) {
  return ["p", "span", "strong", "b", "i", "em", "small", "strong", "strike"].includes(tag) || isHeaderTag(tag);
};

// Check if a element is a inline element or not. Cannot be used to check if element is block or not.
var isInlineElement = exports.isInlineElement = function isInlineElement(tag) {
  return _constant.IS_INLINE_COMPONENT.includes(tag);
};

//Accepts tag and parent tag and return respective components.
var getComponentFromTag = exports.getComponentFromTag = function getComponentFromTag(tag, parentTag) {
  if (_constant.TAGS_TO_COMPONENT_MAP[tag]) {
    return _constant.TAGS_TO_COMPONENT_MAP[tag];
  } else if (isTextTag(tag)) {
    return "Text";
  } else if (shouldUseParentTag(tag)) {
    return _constant.TAGS_TO_COMPONENT_MAP[parentTag];
  } else {
    console.error("Invalid tag: " + tag);
  }
};

// It takes dom object and converts it to a text.
var convertObjectToText = exports.convertObjectToText = function convertObjectToText(root) {
  if (root.constructor.name === "TextNode" || root.nodeType === 3) {
    return root.rawText;
  } else if (!root) {
    return "";
  }
  return "<" + root.tagName + (root.tagName === "a" ? " href=\"" + root.attributes.href + "\"" : "") + ">" + root.childNodes.map(function (node) {
    return convertObjectToText(node);
  }).join("") + "</" + root.tagName + ">";
};

var shouldUseParentTag = exports.shouldUseParentTag = function shouldUseParentTag(tag) {
  return ["li"].includes(tag);
};

//Block elements that are allowed to create a component
var isTagAllowedToCreateComponent = exports.isTagAllowedToCreateComponent = function isTagAllowedToCreateComponent(tag) {
  return ["li", "img", "hr"].includes(tag) || isHeaderTag(tag);
};

var formatOptionsToMultiSelect = exports.formatOptionsToMultiSelect = function formatOptionsToMultiSelect(options, selectedOptions) {
  var formattedOptions = [];
  options && options.map(function (item) {
    formattedOptions.push({
      option: item,
      isSelected: selectedOptions && selectedOptions.some(function (e) {
        return e && (Number(item.id) === e.id || Number(item.id) === e.constant_id);
      })
    });
  });
  return formattedOptions;
};