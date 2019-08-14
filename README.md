# cm-page-builder
Page builder package like notion

## Installation

Run `npm install -s cm-page-builder`
Add to your index.html the fonts cdn: `<link rel="stylesheet" href="https://d1azc1qln24ryf.cloudfront.net/120939/EXPAV3/style-cf.css?crxvf0"> `
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
  component_attachment: { content: String, filename: String}
  component_type: String
  content: String
  position: Number
}
```

##### Status (default: `Edit`):
Has to be one of `Edit`

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
