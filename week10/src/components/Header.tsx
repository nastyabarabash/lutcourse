import { Link } from "react-router-dom"
import { useTranslation } from "../../node_modules/react-i18next"
import "../styles/header.css"

const Header = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  };

  return (
    <header className="header">
      <h1 className="header-logo">Lorem Ipsum</h1>

      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <Link to="/about">{t("about")}</Link>
          </li>
          <li>
            <button id="fi" onClick={() => changeLanguage("fi")}>
              FI
            </button>
          </li>
          <li>
            <button id="en" onClick={() => changeLanguage("en")}>
              EN
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header