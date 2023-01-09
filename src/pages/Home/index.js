import React, { useState } from "react";
import { Helmet } from "react-helmet";

import { Button } from "react-bootstrap";
import ReactTestModal from "../../components/Modal";

const HomePage = () => {
  const [showModalA, setModalAPopUp] = useState(false);
  const [showModalB, setModalBPopUp] = useState(false);

  const handleModalAOpening = () => {
    setModalAPopUp(true);
  };

  const handleModalBOpening = () => {
    setModalBPopUp(true);
  };

  return (
    <>
      <Helmet>
        <title>HomePage</title>
      </Helmet>
      <div className="d-flex justify-content-center">
        <Button onClick={handleModalAOpening}>
          <p className="align-middle">Modal A</p>
        </Button>
        <Button onClick={handleModalBOpening} className="ml-4">
          <p className="align-middle">Modal B</p>
        </Button>

        <ReactTestModal show={showModalA} />
        <ReactTestModal show={showModalB} />
      </div>
    </>
  );
};

export default HomePage;
