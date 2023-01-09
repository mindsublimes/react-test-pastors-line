import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AxiosHelper from "../../utils/helper/axios.helper";
import axios from "axios";
import "./style.scss";

export default function ReactTestModal(props) {
  const searchInputRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [showModalC, setModalCPopUp] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  const [closeModelA, setCloseModelA] = useState(false);
  const [clickedContactInfo, setClickedContactInfo] = useState("");

  /*
  handle search operations.
  */
  const handleSearch = () => {
    const searchValue = searchInputRef.current.value;
    let searchKeyValue = searchValue.split("=");
    try {
      var config = {
        method: "get",
        url: `https://api.dev.pastorsline.com/api/contacts.json?${searchKeyValue[0]}=${searchKeyValue[1]}`,
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs",
        },
      };

      axios(config)
        .then(function (response) {
          let contactIds = response.data.contacts_ids;
          setContacts(contactIds);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  /*
  handle selected values from 1st modal of contact ids.
  */
  const handleSelectedValue = (item) => {
    const selectedContactInfo = Object.keys(contactDetails)
      .filter((key) => item.toString().includes(key))
      .reduce((obj, key) => {
        obj[key] = contactDetails[key];
        return obj;
      }, {});
    setClickedContactInfo(selectedContactInfo[item]);
  };
  /*
  fetches all contacts ids with option of even and all entries.
  */
  const fetchAllContacts = async () => {
    try {
      var config = {
        method: "get",
        url: "https://api.dev.pastorsline.com/api/contacts.json?companyId=171",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs",
        },
      };

      axios(config)
        .then(function (response) {
          let contactsInformation = response.data.contacts;
          let contactIds = response.data.contacts_ids;
          var evenContactIds = contactIds.filter((number) => number % 2 === 0);
          if (checked) {
            setContacts(evenContactIds);
          } else {
            setContactDetails(contactsInformation);
            setContacts(contactIds);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  /*
  fetches only contacts for us company.
  */
  const fetchUsContacts = () => {
    try {
      var config = {
        method: "get",
        url: "https://api.dev.pastorsline.com/api/contacts.json?companyId=171&countryId=226",
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs",
        },
      };

      axios(config)
        .then(function (response) {
          let contactsInformation = response.data.contacts;
          let contactIds = response.data.contacts_ids;
          var evenContactIds = contactIds.filter((number) => number % 2 === 0);
          if (checked) {
            setContacts(evenContactIds);
          } else {
            setContactDetails(contactsInformation);
            setContacts(contactIds);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalC = () => {
    setModalCPopUp(true);
  };

  return (
    <>
      <Modal
        className="modal fade"
        show={props.show}
        onHide={!closeModelA}
        id="modal-a"
      >
        <Modal.Header>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">search:</label>
            <input
              type={"text"}
              id="search"
              name={"search"}
              ref={searchInputRef}
              placeholder="companyId=171"
            />
            <input type="submit" value="Submit" onClick={handleSearch} />
          </form>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form className="mt-3" onSubmit={props.onSubmit}>
              <Form.Group className="form-group mb-3 mt-3">
                <div className="modal-footer mb-4 border-top-0 d-block">
                  <Button
                    onClick={fetchAllContacts}
                    className="modal-button-primary text-white Login-Btn"
                    id="all-contacts"
                  >
                    all contacts
                  </Button>
                  <Button
                    onClick={fetchUsContacts}
                    className="modal-button-secondary text-white Login-Btn"
                    id="us-contacts"
                  >
                    us contacts
                  </Button>
                  <Button
                    onClick={(e) => {
                      setCloseModelA(true);
                    }}
                    className="modal-button-primary text-white Login-Btn"
                    id="close"
                  >
                    close
                  </Button>
                  <div onClick={handleModalC} className="pe-auto">
                    {contacts &&
                      contacts.map((item, key) => {
                        return (
                          <div className="d-flex flex-column" key={key}>
                            <a
                              className="d-flex"
                              onClick={() => {
                                handleSelectedValue(item);
                              }}
                            >
                              <span> contactIds:</span> {item}
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Form.Group>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer">
            <input
              type="checkbox"
              id="even-contacts"
              name="even-contacts"
              value="even-contacts"
              onChange={() => setChecked(!checked)}
            />
            <label>even contacts</label>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal className="modal fade" show={showModalC} id="modal-c">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <>
            <Form className="mt-3" onSubmit={props.onSubmit}>
              <Form.Group className="form-group mb-3 mt-3">
                <div className="modal-footer mb-4 border-top-0 d-block">
                  <p>
                    contact id: {clickedContactInfo.id} phone_number:{" "}
                    {clickedContactInfo.phone_number}
                  </p>
                </div>
              </Form.Group>
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}
