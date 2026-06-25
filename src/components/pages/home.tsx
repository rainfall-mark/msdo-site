import Navbar from "../layout/navbar";
import HeroSection from "../sections/hero-section";
import Footer from "../layout/footer";

export default function Page() {
  return (
    <>
      <customhtml className="box-content inline">
        <div className="box-content text-neutral-700 leading-[1.65] text-[0px] fixed z-[99] right-9 bottom-3.5 cargo_link">
          {"Running on" + " "}
          <a
            href="http://cargocollective.com"
            className="box-content text-ploy-neutral-primary-800 hover:text-ploy-text-primary"
          >
            {" " + "Cargo"}
          </a>
        </div>
      </customhtml>
      <div className="box-content fixed z-[11] ml-9 header_img">
        <a href="https://www.msdo.us" className="box-content">
          <img
            src="https://media.cargocollective.com/1/0/18737/headerimg/Logo_100.png"
            height="107"
            width="100"
            className="box-content w-[6.25rem] h-[6.6875rem] max-w-none inline overflow-clip"
          />
        </a>
      </div>
      <img
        src="https://msdo.us/_gfx/loadingAnim.gif"
        id="nav_loadspin"
        className="box-content max-w-none fixed z-[100] hidden left-5 top-10 overflow-clip"
      />
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}
