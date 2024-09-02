import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex px-2 md:px-0 justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold">TrendMart</h1>
          <div className="flex space-x-3 md:space-x-5">
            <Link
              to="https://www.linkedin.com/in/faizal-putra-ramadhan-623372268/"
              target="_blank">
              <img
                src="/images/linkedin.png"
                alt="Linked In"
                className="w-8 h-auto rounded-lg border-2 border-white"
              />
            </Link>
            <Link to="https://www.instagram.com/xfzlptr_/" target="_blank">
              <img
                src="/images/instagram.jpeg"
                alt="Instagram"
                className="w-8 h-8 rounded-lg border-2 border-white"
              />
            </Link>
            <Link to="https://x.com/?lang=en" target="_blank">
              <img
                src="/images/x.png"
                alt="X"
                className="w-8 h-8 rounded-lg border-2 border-white"
              />
            </Link>
            <Link
              to="https://www.tiktok.com/@xfzlptr_?lang=en"
              target="_blank">
              <img
                src="/images/tiktok.png"
                alt="Tiktok"
                className="w-8 h-8 rounded-lg border-2 border-white"
              />
            </Link>
            <Link to="https://github.com/X-Treme123?tab=repositories" target="_blank">
              <img
                src="/images/github.png"
                alt="Github"
                className="w-8 h-8 rounded-lg border-2 border-white"
              />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10 ml-3 md:ml-0">
          <div>
            <h2 className="text-xl font-semibold">RESOURCES</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>
                <Link to="#">Application</Link>
              </li>
              <li>
                <Link to="#">Documentation</Link>
              </li>
              <li>
                <Link to="#">Systems</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">PRICING</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>
                <Link to="#">Overview</Link>
              </li>
              <li>
                <Link to="#">Premium Plans</Link>
              </li>
              <li>
                <Link to="#">Affiliate Program</Link>
              </li>
              <li>
                <Link to="#">Promotions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">COMPANY</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Partnerships</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">Press</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">SOCIAL</h2>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>
                <Link to="#">Facebook</Link>
              </li>
              <li>
                <Link to="#">Twitter</Link>
              </li>
              <li>
                <Link to="#">Instagram</Link>
              </li>
              <li>
                <Link to="#">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
