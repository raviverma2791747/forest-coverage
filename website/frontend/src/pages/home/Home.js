import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
  Tabs,
  Tab,
} from "react-bootstrap";
import img from "../../assets/images/undraw_image_upload_re_w7pm.svg";
import axios from "axios";
import { API_URL } from "../../config.js";

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [imageId, setImageId] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [coverage,setCoverage] = React.useState("");

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("image", image);

    console.log(API_URL + "upload");
    setLoading(true);

    axios
      .post(API_URL + "upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status == 200) {
          console.log(res.data.data.id);
          setResult(true);
          setImageId(res.data.data.id);
          setCoverage(res.data.data.coverage);
        } else {
          setMessage(res.data.message);
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage("Something went wrong");
        setShow(true);
      });
  };

  const reset = () => {
    setLoading(false);
    setResult(false);
    setImageId(null);
    setImage("");
    setShow(false);
    setMessage("");
    setCoverage("");
  };

  return (
    <Container class="flex-fill">
      <Row>
        <Col></Col>
        <Col className="h-100" xs={12} md={12} lg={8}>
          <div className="p-3">
            <h1 className="text-center mb-3">
              Forest Coverage Using Image Segmentation
            </h1>
            <Card className="shadow rounded-3 p-3">
              <Card.Body>
                {result ? (
                  <div>
                    <h5 className="text-center">{(coverage*100).toFixed(2) } % Forest Coverage Detected</h5>
                    <div className="d-flex justify-content-around">
                    <img
                      className="img-fluid mb-3"
                      src={API_URL + "media/upload/" + imageId}
                      alt="upload image"
                    />
                    <div className="mb-3" style={{backgroundColor:'red'}}>

                    <img
                      className="img-fluid "
                      src={API_URL + "media/download/" + imageId}
                      alt="upload image"
                    />
                    </div>
</div>
                    <div className="text-center">
                      <Button onClick={reset}>Upload</Button>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    {loading ? (
                      <div className="text-center p-3">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : ""}
                    <Form onSubmit={onSubmit}>
           
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={onChangeFile}
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button
                          className="me-3"
                          variant="primary"
                          type="submit"
                          size="lg"
                          disabled={loading}
                        >
                          Upload
                        </Button>
                     
                      </div>
                    </Form>
                  </React.Fragment>
                )}
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col></Col>
      </Row>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
