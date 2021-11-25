import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import Note from './Note'

test('Note render content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )
  
  //method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  //method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('li')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler=jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})