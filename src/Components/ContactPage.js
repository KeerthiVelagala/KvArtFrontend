import '../styles/ContactStylePage.css';
function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <p>
        Email:{" "}
        <a
          href="mailto:keerthivelagala16@gmail.com"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          keerthivelagala16@gmail.com
        </a>
      </p>

      <p>
        Instagram:{" "}
        <a
          href="https://instagram.com/canvases_by_pnky"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          @canvases_by_pnky
        </a>
      </p>
    </div>
  );
}

export default ContactPage;

