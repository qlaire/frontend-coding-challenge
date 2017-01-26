import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import localStorageMock from './mocks/localStorage';
window.localStorage = localStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
