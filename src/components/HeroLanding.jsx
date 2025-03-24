import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

import "../styles/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-content relative z-10 py-20 px-4">
        <Row justify="center" align="middle" className="gap-y-8 md:gap-y-0">
          <Col
            xs={24}
            md={12}
            className="px-4 order-2 md:order-1 text-center md:text-left"
          >
            <div>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight animate-fadeInUp">
                &quot;Unleash Your Creativity –<br />
                Where Every Stroke
                <br />
                Tells a Story!&quot;
              </h1>
              <div className="cta-buttons flex gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/products")}
                  className="cta-button px-8 py-3 rounded-full bg-rose-300 hover:bg-rose-400  text-rose-100 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Browse Collection
                </button>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            md={12}
            className="px-4 order-1 md:order-2 flex justify-center"
          >
            <div className="logo-container relative animate-float">
              <img
                src="./LOGO1.png"
                className="hero-logo w-64 md:w-80 lg:w-96 drop-shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-500"
                alt="Fankoska Art Logo"
              />
              <div className="gradient-overlay absolute inset-0 bg-gradient-to-br from-rose-200/20 to-burgundy-800/20 rounded-full mix-blend-multiply"></div>
            </div>
          </Col>
          <Col>
            
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeroSection;
