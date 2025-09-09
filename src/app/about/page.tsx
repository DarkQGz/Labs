import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white', textAlign: 'center' }}>
      <h1></h1>
      <nav>
        <a href="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Нүүр</a>
        <a href="/about" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Бидний тухай</a>
        <a href="/contact" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Холбоо барих</a>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white', textAlign: 'center', marginTop: 'auto' }}>
      <p>© 2025</p>
    </footer>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6' }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <Layout>
      <p>Hello world!</p>
    </Layout>
  );
};

export default HomePage;
