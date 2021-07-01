/*
 * doest-react
 *
 * header.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../state.js';

/**
 * @function Header - Header React view
 * @returns {Object} - React JSX view
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  let TodosItem;
  let LoginOrOutItem;

  /**
   * Render different navigational items depending on authenticated status
   */
  switch (state.authenticated) {
    case true:
      TodosItem = (
        <li className="nav-item">
          <a
            className={`nav-link ${state.page === 'todos' ? 'active' : ''}`}
            href="/todos"
          >
            Todos
          </a>
        </li>
      );
      LoginOrOutItem = (
        <div className="d-flex">
          <a className="btn btn-outline-primary" href="/logout">
            Logout
          </a>
        </div>
      );
      break;
    default:
      TodosItem = null;
      LoginOrOutItem = (
        <div className="d-flex">
          <a className="btn btn-outline-primary" href="/login">
            Login
          </a>
        </div>
      );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a
          className="navbar-brand"
          href="/"
          style={{ height: '40px', width: '38px' }}
        >
          <img
            src="/img/doest-icon.png"
            alt="Doest Icon"
            width="50px"
            style={{ marginTop: '-32px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${state.page === 'home' ? 'active' : ''}`}
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            {TodosItem}
          </ul>
          {LoginOrOutItem}
        </div>
      </div>
    </nav>
  );
}
