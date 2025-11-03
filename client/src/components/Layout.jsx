export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <h1>Refloor</h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <a href="https://github.com/Munhama" target="_blank">
          © Munhama
        </a>
      </footer>
    </div>
  );
}
