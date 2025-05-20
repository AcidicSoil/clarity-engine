import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="app-title">
          CLARITY OR DEATH<span className="pulse">_</span>
        </div>
        <button className="menu-toggle" onClick={toggleSidebar}>
          ≡
        </button>
      </div>
    </header>
  );
};

export default Header;