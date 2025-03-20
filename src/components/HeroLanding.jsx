import { Col, Row } from "antd";

const HeroSeciton = () => {
  return (
    <div className="hero-section flex items-center justify-center  w-full h-screen ">
      <div className="hero-section__content py-20">
        <Row justify={"center"}>
          <Col span={12} className="flex justify-center items-center">
            <h1 className="hero-section-tittle">
              &quot;Unleash Your Creativity – Where Every Stroke Tells a Story!&quot;
            </h1>
          </Col>
          <Col span={12} className="flex items-center justify-center">
          
            <img src="./LOGO1.png" className="hero-logo" alt="" />
          
           
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSeciton;
