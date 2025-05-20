import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            dashboard
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/veil" className={({ isActive }) => isActive ? 'active' : ''}>
            veil
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/cast" className={({ isActive }) => isActive ? 'active' : ''}>
            cast
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/log" className={({ isActive }) => isActive ? 'active' : ''}>
            log
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/cut" className={({ isActive }) => isActive ? 'active' : ''}>
            cut
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/query" className={({ isActive }) => isActive ? 'active' : ''}>
            query
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/scan" className={({ isActive }) => isActive ? 'active' : ''}>
            scan
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/flag" className={({ isActive }) => isActive ? 'active' : ''}>
            flag
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/save" className={({ isActive }) => isActive ? 'active' : ''}>
            save
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink to="/glyphs" className={({ isActive }) => isActive ? 'active' : ''}>
            glyphs
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;