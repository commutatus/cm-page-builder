// import '../../__mock__/xhr-mock'
import each from 'jest-each';
import {parse} from 'node-html-parser'
import {
  shouldUseParentTag, 
  isAllowedTag, 
  convertObjectToText, 
  getComponentFromTag,
  isTagAllowedToCreateComponent,
  isHeaderTag,
  isInlineElement
} from './helpers'
import { 
  ALLOWED_TAGS, 
  COMPONENT_ALLOWED_TO_CREATE_COMPONENT, 
  HEADER_TAGS,
  INLINE_COMPONENT,
  PARENT_CHILD_TAGS
} from './constant'

describe('Test element is allowed or not', () => {
  each(ALLOWED_TAGS).test('tag (%s) is allowed', (tag) => {
    expect(isAllowedTag(tag)).toBeTruthy()
  });
  each(['li', 'ul', 'li']).test('tag (%s) not allowed for nested list', (tag) => {
    expect(isAllowedTag(tag, 'li')).toBeFalsy()
  });
})

describe('Test element to component conversion working properly.', () => {
  each`
  tag          |     expectedComponent
  ${"h1"}      |     ${"Header1"}
  ${"h2"}      |     ${"Header2"}
  ${"ol"}      |     ${"Olist"}
  ${"ul"}      |     ${"Ulist"}
  ${"div"}     |     ${"Text"}
  ${"a"}       |     ${"Text"}
  ${"img"}     |     ${"Upload"}
  ${"p"}       |     ${"Text"}
  ${"span"}    |     ${"Text"}
  ${'hr'}      |     ${"Divider"}
  ${'span'}    |     ${"Text"}
  ${'strong'}  |     ${"Text"}
  ${'b'}       |     ${"Text"}
  ${'i'}       |     ${"Text"}
  ${'em'}      |     ${"Text"}
  ${'small'}   |     ${"Text"}
  ${'strong'}  |     ${"Text"}  
  ${'strike'}  |     ${"Text"}
  ${"br"}      |     ${"Text"}
  `.test('tag ($tag)', ({tag, expectedComponent}) => {
    expect(getComponentFromTag(tag)).toBe(expectedComponent)
  })

  test(`Test if parent is ol and child is li it should be Olist`, () => {
    expect(getComponentFromTag('li', 'ol')).toBe('Olist')
  })

  test(`Test if parent is ul and child is li it should be Ulist`, () => {
    expect(getComponentFromTag('li', 'ul')).toBe('Ulist')
  })
})


describe('Test allowed component are able to create component', () => {
  each(COMPONENT_ALLOWED_TO_CREATE_COMPONENT).test('tag (%s) is allowed to create component', (tag) => {
    expect(isTagAllowedToCreateComponent(tag)).toBeTruthy()
  })
})

each(HEADER_TAGS).test('Test for tag %s is a header tag', (tag) => {
  expect(isHeaderTag(tag)).toBeTruthy()
})

each(INLINE_COMPONENT).test('Test for tag %s is an inline element', (tag) => {
  expect(isInlineElement(tag)).toBeTruthy()
})

each(PARENT_CHILD_TAGS).test('Test for tag %s which uses parent tag', (tag) => {
  expect(shouldUseParentTag(tag)).toBeTruthy()
})