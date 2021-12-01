import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getAll } from '../../reducers/blogReducer';

function useBlogs() {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])

  return ([
    blogs
  ]);
}

export default useBlogs;