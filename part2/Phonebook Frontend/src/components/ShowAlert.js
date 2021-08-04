const showAlert = ({ alert }) => {
  if (alert.length == 0) {
    return null;
  }
  if (alert.removed) {
    return <p className="removed">{alert.removed}</p>;
  }
  if (alert.added) {
    return <p className="success">{alert.added}</p>;
  }

  if (alert.response) {
    return <p className="error">{alert.response.data.error}</p>;
  }
  return null;
};

export default showAlert;
