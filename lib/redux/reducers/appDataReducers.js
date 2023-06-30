"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulkCreate = exports.updateComponentType = exports.updateComponent = exports.removeComponent = exports.initComponents = exports.updatePosition = exports.resetApp = exports.addNewComponent = exports.RESET = exports.UPDATE_POS = exports.INIT_COMPONENTS = exports.REMOVE_COMPONENT = exports.UPDATE_COMPONENT_TYPE = exports.UPDATE_COMPONENT = exports.BULK_ADD_COMPONENT = exports.ADD_COMPONENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = require("uuid/v5");

var _v2 = _interopRequireDefault(_v);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _sanitizeHtml = require("sanitize-html");

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _currentElemReducer = require("./currentElemReducer");

var _helpers = require("../../utils/helpers");

var _constant = require("../../utils/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { TAGS_TO_COMPONENT_MAP, IS_INLINE_COMPONENT } from '../../utils/constant';

var ADD_COMPONENT = exports.ADD_COMPONENT = "ADD_COMPONENT";
var BULK_ADD_COMPONENT = exports.BULK_ADD_COMPONENT = "BULK_ADD_COMPONENT";
var UPDATE_COMPONENT = exports.UPDATE_COMPONENT = "UPDATE_COMPONENT";
var UPDATE_COMPONENT_TYPE = exports.UPDATE_COMPONENT_TYPE = "UPDATE_COMPONENT_TYPE";
var REMOVE_COMPONENT = exports.REMOVE_COMPONENT = "REMOVE_COMPONENT";
var INIT_COMPONENTS = exports.INIT_COMPONENTS = "INIT_COMPONENTS";
var UPDATE_POS = exports.UPDATE_POS = "UPDATE_POS";
var RESET = exports.RESET = "RESET";

//Created using CLI
var CUSTOM_NAMESPACE = "1c57b4cd-4040-463f-9179-84e9ba9b66fa";
function createID() {
  return (0, _v2.default)((0, _moment2.default)().format("DDMMYYYY") + "-" + window.performance.now() + "-" + window.cmPageBuilder.pid, CUSTOM_NAMESPACE);
}

var addNewComponent = exports.addNewComponent = function addNewComponent(data) {
  return function (dispatch) {
    //Try not to change it as the application may not work properly and can create inconsistency in the database.
    var newId = createID();
    dispatch({
      type: ADD_COMPONENT,
      data: _extends({}, data, { newId: newId })
    });
    dispatch({
      type: _currentElemReducer.SET_CURRENT_ELEM,
      elemId: newId
    });
  };
};

var resetApp = exports.resetApp = function resetApp() {
  return { type: RESET };
};
var updatePosition = exports.updatePosition = function updatePosition(data) {
  return { type: UPDATE_POS, data: data };
};

var initComponents = exports.initComponents = function initComponents() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return function (dispatch) {
    dispatch({
      type: INIT_COMPONENTS,
      data: data
    });
  };
};

var removeComponent = exports.removeComponent = function removeComponent(data) {
  return { type: REMOVE_COMPONENT, data: data };
};

var updateComponent = exports.updateComponent = function updateComponent(data) {
  return { type: UPDATE_COMPONENT, data: data };
};

var updateComponentType = exports.updateComponentType = function updateComponentType(data) {
  return { type: UPDATE_COMPONENT_TYPE, data: data };
};

var bulkCreate = exports.bulkCreate = function bulkCreate(parsedData, e) {
  return function (dispatch, getState) {
    var data = {},
        newData = [];

    var traverseTree = function traverseTree(root) {
      if (root.childNodes.length > 0) {
        root.childNodes.forEach(function (node, i) {
          if ((0, _helpers.isAllowedTag)(node.tagName, root.tagName)) {
            //Traverse tree untill you find a inline element node.
            if (node.childNodes.length > 0 && !(0, _helpers.isInlineElement)(node.tagName)) {
              traverseTree(node);
            }
            //Convert different elem to there respective component
            var siblingNode = newData[newData.length - 1];

            //Handle inline component => truncate invalid tags and create text.
            if ((0, _helpers.isInlineElement)(node.tagName)) {
              var _content = (0, _helpers.convertObjectToText)(node);
              if (siblingNode && siblingNode.componentType === "Text") {
                siblingNode.content = "" + siblingNode.content + _content;
              } else {
                newData.push({
                  content: (0, _sanitizeHtml2.default)(_content),
                  componentType: (0, _helpers.getComponentFromTag)(node.tagName) || "Text",
                  id: createID()
                });
              }
            }

            //Handle block component => truncate components which are not supported.
            else if ((0, _helpers.isTagAllowedToCreateComponent)(node.tagName)) {
                var ID = createID();
                var getImage = function getImage(src) {
                  return !src.includes("base64") ? { filename: "attachements", url: src } : { filename: "attachements", content: src };
                };
                newData.push({
                  content: (0, _sanitizeHtml2.default)(node.tagName === "li" ? node.childNodes[0].rawText : node.rawText),
                  component_attachment: node.tagName === "img" ? getImage(node.attributes.src) : null,
                  componentType: (0, _helpers.getComponentFromTag)(node.tagName, root.tagName),
                  id: ID
                });
              }
          }
        });
      }
    };

    traverseTree(parsedData);
    if (!(newData.length === 1 && _constant.TEXT_COMPONENT.includes(newData[0].componentType))) {
      e.preventDefault();
      dispatch({
        type: BULK_ADD_COMPONENT,
        data: { newData: newData, focusedElemId: getState().currentElem.elemId }
      });
    }
  };
};

function bulkCreateComponent(state, data) {
  var componentData = state.componentData;

  var temp = [],
      indexCount = 1;

  componentData.forEach(function (component) {
    temp.push(_extends({}, component, { position: indexCount }));
    indexCount++;
    if (component.id === data.focusedElemId) {
      data.newData.forEach(function (item) {
        var newData = _extends({}, item, { position: indexCount });
        temp.push(newData);
        emitUpdate(newData, "add");
        indexCount++;
      });
    }
  });
  return { componentData: temp };
}

var initialState = {
  componentData: []
};

//Accepts the initial components data
function initializeComponentsInState(state, data) {
  return { componentData: data ? data : [] };
}

//Accept the current state and data about old elem so we can create a new component as needed.
function addComponent(state) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var componentData = state.componentData;
  var id = data.id,
      componentType = data.componentType;

  var temp = [];
  var position = 1;
  var newCom = null;
  for (var i in componentData) {
    var componentId = componentData[i].id;
    if (id === componentId) {
      temp.push(_extends({}, componentData[i], { position: position }));
      newCom = {
        content: data.content ? typeof content === "string" ? (0, _sanitizeHtml2.default)(data.content) : data.content : "", //Sanitizing only strings, exception for file objects
        position: position + 1,
        componentType: componentType,
        id: data.newId,
        component_attachment: data.component_attachment ? _extends({}, data.component_attachment) : null
      };
      temp.push(newCom);
      position += 2;
    } else {
      temp.push(_extends({}, componentData[i], { position: position }));
      position++;
    }
  }
  if (componentData.length === 0 || !data.id) {
    newCom = {
      content: "",
      position: 1,
      componentType: componentType,
      id: data.newId
    };
    temp.unshift(newCom);
  }
  var tempCom = _extends({}, newCom);
  tempCom.content = "";
  emitUpdate(tempCom, "add");
  return { componentData: temp };
}

function updateComponentTypeState(state, data) {
  var componentData = state.componentData;
  var blockId = data.blockId,
      type = data.type;

  componentData = componentData.map(function (component) {
    if (component.id === blockId) {
      return _extends({}, component, { componentType: type });
    } else {
      return component;
    }
  });
  emitUpdate({ id: blockId, componentType: type }, "update");
  return { componentData: componentData };
}

function updateComponentState(state, data) {
  var componentData = state.componentData;
  var newState = data.newState,
      id = data.id;

  componentData = componentData.map(function (component) {
    if (component.id === id) {
      return _extends({}, component, newState, {
        content: newState.content ? newState.content : ""
      });
    } else {
      return component;
    }
  });
  emitUpdate(_extends({ id: id }, newState), "update");
  return { componentData: componentData };
}

function removeComponentFromState(state, data) {
  if (state.componentData.length > 0) {
    var componentData = state.componentData;
    var blockId = data.blockId;

    var temp = [];
    var position = 1;
    for (var i in componentData) {
      var componentId = componentData[i].id;
      if (blockId === componentId) {
        // isInital = componentData[i].initial
        continue;
      } else {
        temp.push(_extends({}, componentData[i], { position: position }));
        position++;
      }
    }
    emitUpdate({ id: blockId }, "remove");
    return _extends({}, state, { componentData: temp });
  } else {
    return initialState;
  }
}

function updateComponentPos(state, _ref) {
  var newIndex = _ref.newIndex,
      oldIndex = _ref.oldIndex;

  var newData = [];
  var elem = state.componentData[oldIndex];
  newData = state.componentData.filter(function (d, i) {
    return i !== oldIndex;
  });
  newData.splice(newIndex, 0, elem);
  emitUpdate({ id: state.componentData[oldIndex].id, position: newIndex + 1 }, "updatePos");
  return _extends({}, state, {
    componentData: newData.map(function (d, i) {
      return _extends({}, d, { position: i + 1 });
    })
  });
}

function emitUpdate(data, type) {
  // return
  switch (type) {
    case "add":
      window.cmPageBuilder.handleUpdate(null, {
        content: (0, _sanitizeHtml2.default)(data.content) || null,
        position: data.position,
        component_type: data.componentType,
        client_reference_id: data.id,
        component_attachment: data.component_attachment
      }, "createComponent");
      break;
    case "update":
      window.cmPageBuilder.handleUpdate(data.id, {
        content: (0, _sanitizeHtml2.default)(data.content) || null,
        position: data.position,
        component_type: data.componentType,
        component_attachment: data.component_attachment
      }, "updateComponent");
      break;
    case "updatePos":
      window.cmPageBuilder.handleUpdate(data.id, { position: data.position }, "updateComponent");
      break;
    case "remove":
      window.cmPageBuilder.handleUpdate(data.id, null, "deleteComponent");
    default:
      console.error("invalid mutation type.");
  }
}

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case INIT_COMPONENTS:
      return initializeComponentsInState(state, action.data);
    case BULK_ADD_COMPONENT:
      return bulkCreateComponent(state, action.data);
    case ADD_COMPONENT:
      return addComponent(state, action.data);
    case UPDATE_COMPONENT_TYPE:
      return updateComponentTypeState(state, action.data);
    case UPDATE_COMPONENT:
      return updateComponentState(state, action.data);
    case UPDATE_POS:
      return updateComponentPos(state, action.data);
    case REMOVE_COMPONENT:
      return removeComponentFromState(state, action.data);
    case RESET:
      return initialState;
    default:
      return state;
  }
};