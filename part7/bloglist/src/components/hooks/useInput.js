import { useState } from "react";

function useInput(type) {
  const [value, setValue] = useState('')
  console.log(value)

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  return ({
    type,
    value,
    onChange: handleChange
  });
}

export default useInput;