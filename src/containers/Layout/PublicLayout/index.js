import Header from "./Header";
import Footer from "./Footer";
const PublicLayout = ({ children }) => (
  <div className="d-flex flex-column h-full">
    <Header />
    <div className="flex-grow ">
      <div className="mb-10">{children}</div>
    </div>
    <Footer />
  </div>
);

export default PublicLayout;
