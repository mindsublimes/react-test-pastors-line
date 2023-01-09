import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import "./style.scss";

const ReactTestButton = ({ type, children, customClassName, btnRef }) => {
  return (
    <Button ref={btnRef} type={type} className={`${customClassName}`}>
      {children}
    </Button>
  );
};

export default ReactTestButton;

ReactTestButton.defaultProps = {
  type: "button",
};

ReactTestButton.propTypes = {
  type: PropTypes.string,
  customClassName: PropTypes.string,
};
