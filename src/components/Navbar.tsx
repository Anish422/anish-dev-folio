import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path}>
              <a className={location.pathname === item.path ? "active" : ""}>
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
