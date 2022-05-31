import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import unetImage from "../../assets/images/unet.png";

const About = () => {
  return (
    <Container class="flex-fill">
      <Row>
        <Col></Col>
        <Col xs={12} md={12} lg={6}>
          <div className="p-3">
            <h1 className="text-center mb-3">U-Net</h1>
            <figure>
              <img src={unetImage} alt="U-Net" className="img-fluid mb-3" />
              <figcaption>
                Figure 1 <cite title="Source Title">U-Net Architecure[1]</cite>
              </figcaption>
            </figure>

            <p>
              <ol>
                <li>
                  <cite title="Source Title">
                    Ronneberger, O., Fischer, P., & Brox, T. (2015, October).
                    U-net: Convolutional networks for biomedical image
                    segmentation. In International Conference on Medical image
                    computing and computer-assisted intervention (pp. 234-241).
                    Springer, Cham.
                  </cite>
                </li>
              </ol>
            </p>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default About;
