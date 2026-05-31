import { useNavigate } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

import Icon from "@mdi/react";

import {
  mdiFlower,
  mdiWater,
} from "@mdi/js";

import logo from "./logo.png";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column p-4"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#f5f7f4",
        borderRight:
          "1px solid #dde4d7",
      }}
    >
      {/* LOGO */}

      <div
        style={{
          cursor: "pointer",
          marginBottom: "40px",
        }}
        onClick={() =>
          navigate("/plantList")
        }
      >
        <img
          src={logo}
          alt="Plantio"
          style={{
            width: "220px",
          }}
        />
      </div>

      {/* MENU */}

      <Nav
        className="
          d-flex
          flex-column
          gap-2
        "
      >
        <Nav.Link
          onClick={() =>
            navigate("/plantList")
          }
          className="
            d-flex
            align-items-center
            gap-2
          "
          style={{
            color: "#5E6B4C",
            fontWeight: 500,
          }}
        >
          <Icon
            path={mdiFlower}
            size={0.9}
          />
          Rostliny
        </Nav.Link>

        <Nav.Link
          onClick={() =>
            navigate("/toWater")
          }
          className="
            d-flex
            align-items-center
            gap-2
          "
          style={{
            color: "#5E6B4C",
            fontWeight: 500,
          }}
        >
          <Icon
            path={mdiWater}
            size={0.9}
          />
          Rostliny k zalití
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Navigation;