# cm-page-builder
Page builder package like notion

## Installation

Run `npm install -s cm-page-builder`

Add to your index.html the fonts cdn: `<link rel="stylesheet" href="https://d1azc1qln24ryf.cloudfront.net/120939/EXPAV3/style-cf.css?crxvf0">`

Import it as `import PageBuilder from 'cm-page-builder'`

## Initialization

A PageBuilder component looks like this:

```JSX

<PageBuilder
	meta={meta}
	pageComponents={pageComponents}
	typeMapping={TYPE_MAP_COMPONENT}
	REVERSE_TYPE_MAP_COMPONENT={REVERSE_TYPE_MAP_COMPONENT}
	handleUpdate={this._updatePageComponent}
	status={this.state.status}
	requestHandler={requestHandler}
	pageCategories={getResourceCategories()}
	currentOffices={currentPerson.creatable_offices_for_pages}
/>
```

## Props

##### Page components.
A list of Page components, to be initialized. They have the following structure

```javascript
{
  component_attachment: { content: String, filename: String, url: String}
  component_type: String
  content: String
  position: Number
}
```

##### Status (default: `Edit`):
Has to be one of `Edit`

##### options (default: `['Header1','Header2','OList','UList','Embed','Upload','Divider','Code']`):
Array of available components. For example, setting options as `['Header1']` will only render `Header1` component.

##### handleUpdate(id, data, type, key):
A `function` that gets fired every time something happens with the components of a page. It receives four parameters, `id`, `data`, `type`, `key`
- `id`: The ID of the component,
- `data`: The data inside the component.
- `type`: The kind of change that has happened with the component. It can be any of
  - `"createComponent"`
  - `"updateComponent"`
  - `"deleteComponent"`
- `key`: `undefined`

##### typeMapping
A hash that maps snake_cased names of components with cm-page-builder components
found inside the src/components folder. Available components are
- `Header1`: The equivalent of a h1 tag
- `Header2`: The equivalent of a h2 tag
- `OList`: An ordered list. Two or more adjacent components of this type will make a group, and the position number will increase sequentially within that group
- `UList`: An unordered list
- `Text`: The default component, regular text. It may have HTML formatting
- `Embed`: A vimeo or youtube video which is meant to be displayed as an embed file
- `Upload`: A file. `component_attachment` will hold all relevant information. If it is an image, it should be displayed as an embedded image
- `Divider`: A line divider.
- `Code`: A code snippet component.
