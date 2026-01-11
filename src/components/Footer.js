// components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
     

        <div className="footer-contact">
          <span>📞 079-123-4567</span>
          <span>✉️ info@mstore.com</span>
        </div>

        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://wa.me/962791234567" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
         <p>© 2026 M Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
