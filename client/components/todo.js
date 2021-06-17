/*
 * doest-react
 *
 * todo.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useState } from 'react';
import apiRequest from '../utilities/request';

/**
 * @function Todo - Used for display a single todo and its details
 * @param {Object} props - The object representing React's props
 * @param {Object} props.todo - The todo object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function Todo({ todo: item }) {
  const [todo, updateTodo] = useState(item);

  async function toggleTodo(id) {
    await apiRequest(`todos/${id}`, 'POST');
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
    return;
  }

  return (
    <li className="list-group-item">
      <input
        id={todo.id}
        className="form-check-input me-2"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          e.preventDefault();
          toggleTodo(todo.id);
        }}
      />
      <label htmlFor={todo.id} className="">
        {todo.title}
      </label>
    </li>
  );
}
