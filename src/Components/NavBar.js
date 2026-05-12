import React, { useState } from "react";
import "../styles/navBarStyle.css";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="nav">
        <ul className="nav-list">
          <li className="brand">
            <a href="/" aria-label="Home">KV Creations</a>
          </li>

          <button
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            {/* simple hamburger icon */}
            {open ? "✕" : "☰"}
          </button>

          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </header>

      {/* overlay */}
      <div
        className={`menu-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* left side drawer */}
      <nav className={`side-menu ${open ? "open" : ""}`} aria-hidden={!open}>
       <div className="side-menu-header">
  <strong>KV Creations</strong>

  <button
    className="close-btn"
    aria-label="Close menu"
    onClick={() => setOpen(false)}
  >
    ✕
  </button>
</div>

        <div style={{ height: 8 }} />

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;