import HeroLanding from "../components/HeroLanding";
import FeaturedCollection from "../components/FeaturedCollection";
import {
  InstagramOutlined,
  // FacebookOutlined,
  // TwitterOutlined,
} from "@ant-design/icons";
const Home = () => {
  return (
    <div>
      <HeroLanding />
      <FeaturedCollection />
      <div className="social-links fixed right-6 bottom-6 flex flex-col gap-4 z-50">
        <a
          href="https://www.instagram.com/fankoskart/" target="_blank"
          className="text-rose-200 hover:text-burgundy-800 transition-colors"
        >
          <InstagramOutlined className="text-2xl" />
        </a>
        {/* <a
          href="#"
          className="text-rose-200 hover:text-burgundy-800 transition-colors"
        >
          <FacebookOutlined className="text-2xl" />
        </a>
        <a
          href="#"
          className="text-rose-200 hover:text-burgundy-800 transition-colors"
        >
          <TwitterOutlined className="text-2xl" />
        </a> */}
      </div>
    </div>
  );
};

export default Home;
