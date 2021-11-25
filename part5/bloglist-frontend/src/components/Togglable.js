import React, { useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const showWhenVisible = {display: visibility ? '' : 'none'}
  const hideWhenVisible = {display: visibility ? 'none' : ''}

  const toggleVisibility = () => setVisibility(!visibility)

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.hideLabel}</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
    </div>
  );
})

export default Togglable;