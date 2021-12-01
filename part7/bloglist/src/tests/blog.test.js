import {render, fireEvent} from '@testing-library/react'
import {blog, listOfBlogs} from './helper'
import Blog from '../components/Blog'
import NewNote from '../components/NewNote'

describe("Blog Component", () => {
  let component
  const mockhandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogs={listOfBlogs} test={mockhandler}/>
    )
  })

  test("component render blog's title and author", () => {
    expect(component.queryByText('Imam Syahid')).toBeDefined()
    expect(component.queryByText('Life in The Wind')).toBeDefined()
  })

  test("component does not render blog's url and likes by default", () => {
    expect(component.queryByText('imamsyahid.diktus.id')).toBeNull()
    expect(component.queryByText('likes')).toBeNull()
  })

  test("component render blog's url and likes when the button is clicked", () => {
    const button = component.getByText('Show')
    fireEvent.click(button)
    expect(component.queryByText('imamsyahid.diktus.id')).toBeDefined()
  })

  test('if the like is clicked twice, event handler is called twice', () => {
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockhandler.mock.calls).toHaveLength(2)
  })
})

describe("Submit Blog", () => {
  const mockhandler = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <NewNote setAuthor={mockhandler} setTitle={mockhandler} setUrl={mockhandler}/>
    )
  })

  test('Submit handler receive the right author', () => {
    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: blog.author }
    })
    expect(mockhandler.mock.calls[0][0]).toBe(blog.author)
  })

  test('Submit handler receive the right title', () => {
    const author = component.container.querySelector('#title')
    fireEvent.change(author, {
      target: { value: blog.title }
    })
    expect(mockhandler.mock.calls[0][0]).toBe(blog.title)
  })

  test('Submit handler receive the right url', () => {
    const author = component.container.querySelector('#url')
    fireEvent.change(author, {
      target: { value: blog.url }
    })
    expect(mockhandler.mock.calls[0][0]).toBe(blog.url)
  })
})