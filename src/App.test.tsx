import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { initialState } from './Forest/Controller';
import { Spec, Group, Leaf } from './Forest/Models';

function testIdMatches(testId: string, expectedText: string | string[]) {
  const { getByTestId, getAllByTestId } = render(<App />);
  if (Array.isArray(expectedText)) {
    const vals = getAllByTestId(testId)
    expect(vals.length).toEqual(expectedText.length)
    vals.forEach((val, i) =>
      expect(val.textContent).toMatch(expectedText[i])
    );
  } else {
    const val = getByTestId(testId)
    expect(val).toBeInTheDocument();
    expect(val.textContent).toMatch(expectedText);
  }
}

describe('Forest', () => {
  let mockSpec = new Spec('hello spec!', 'mock-spec:-1')
  let mockGroup = new Group("hello parent", 'mock-group:-1')

  it('suite name', () => {
    initialState.suite.name = 'hello world'
    testIdMatches('suite.name', 'hello world')
  })

  it('spec name', () => {
    initialState.suite.specs = [mockSpec]
    testIdMatches('spec.name', 'hello spec')
  })

  it('group name', () => {
    mockSpec.groups = [mockGroup]
    initialState.suite.specs = [mockSpec]
    testIdMatches('group.name', 'hello parent')
  })

  it('nested group name', () => {
    mockGroup.nodes = [ new Group('hello child', 'mock-group:-2') ]
    mockSpec.groups = [mockGroup]
    initialState.suite.specs = [mockSpec]
    testIdMatches('group.name', ['hello parent', 'hello child'])
  })

  it('leaf name', () => {
    mockGroup.nodes = [ new Leaf('hello leaf!', 'mock-leaf:-1') ]
    mockSpec.groups = [ mockGroup ]
    initialState.suite.specs = [ mockSpec ]
    testIdMatches('leaf.name', 'hello leaf!')
  })

  test.todo('updates suite name')
  test.todo('updates leaf')
})

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
