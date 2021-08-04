const form = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.name} onChange={props.textChange} />
        <br />
        number: <input value={props.number} onChange={props.numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default form
