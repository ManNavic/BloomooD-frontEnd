import Header from '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/components/header/index.js'
import Slider from '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/components/slider/slider.js'
import '/Users/mantas/Desktop/Final-full-stack-project/BloomooD-frontEnd/src/pages/index/index.css'
import ContactUs from '../contactUs/index'
import Footer from '../../components/footer/footer.js'
import { Element, animateScroll as scroll } from 'react-scroll'
import AboutUS from '../aboutUs/aboutUs'
import Why from '../../components/whyBloomood/why.js'
import StoreItems from '../storeItems/carousel'

const Index = () => {
  return (
    <>
      <Header />

      <div
        className="App"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <Slider />
      </div>
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >

          <Why />
  
      </div>
      <div   className="div"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center">
        <StoreItems />
      </div>
      <div className="div" data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center">
        <AboutUS />
      </div>
      <div
        className="div"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >

          <ContactUs />
  
      </div>
      <div className="div">
        <Footer />
      </div>
    </>
  )
}
export default Index
