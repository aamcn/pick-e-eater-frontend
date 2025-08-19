import PageTitle from "../pageTitle/PageTitle";
import "./header.scss";

function Header() {
  return (
    <div className="headerContainer" data-testid="header">
      <PageTitle />
    </div>
  );
}

export default Header;
