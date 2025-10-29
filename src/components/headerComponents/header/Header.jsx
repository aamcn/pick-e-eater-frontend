import PageTitle from "../pageTitle/PageTitle";
import "./header.scss";

function Header() {
  return (
    <div className="header-container" data-testid="header">
      <PageTitle />
    </div>
  );
}

export default Header;
