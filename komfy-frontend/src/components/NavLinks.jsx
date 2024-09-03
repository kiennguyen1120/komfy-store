import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const links = [
  { id: 1, url: "/", text: "home", forGuest: true },
  { id: 2, url: "about", text: "about", forGuest: true },
  { id: 3, url: "products", text: "products", forGuest: true },
  { id: 4, url: "cart", text: "cart", forGuest: true },
  { id: 5, url: "checkout", text: "checkout", forUser: true },
  { id: 6, url: "orders", text: "orders", forUser: true },
  { id: 7, url: "dashboard", text: "dashboard", forAdmin: true },
  { id: 8, url: "admin-orders", text: "orders", forAdmin: true },
  { id: 9, url: "admin-categories", text: "categories", forAdmin: true },
  { id: 10, url: "admin-products", text: "products", forAdmin: true },
  { id: 11, url: "admin-users", text: "users", forAdmin: true },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  const isUser = user && user.roles.includes("ROLE_USER");
  const isAdmin = user && user.roles.includes("ROLE_ADMIN");

  return (
    <>
      {links.map((link) => {
        const { id, url, text, forGuest, forUser, forAdmin } = link;

        // Hiển thị cho người dùng chưa đăng nhập
        if (forGuest && !isAdmin) {
          return (
            <li key={id}>
              <NavLink className="capitalize" to={url}>
                {text}
              </NavLink>
            </li>
          );
        }

        // Hiển thị cho người dùng đã đăng nhập với vai trò USER
        if (isUser && forUser) {
          return (
            <li key={id}>
              <NavLink className="capitalize" to={url}>
                {text}
              </NavLink>
            </li>
          );
        }

        // Hiển thị cho người dùng đã đăng nhập với vai trò ADMIN
        if (isAdmin && forAdmin) {
          return (
            <li key={id}>
              <NavLink className="capitalize" to={url}>
                {text}
              </NavLink>
            </li>
          );
        }

        return null;
      })}
    </>
  );
};
export default NavLinks;
