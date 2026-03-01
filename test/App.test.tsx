import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

describe('App Component', function () {
  it('renders the SignIn page by default', function () {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByText('Telepractice Pro')).to.exist;
  });

  it('renders the client dashboard when navigating to /client/dashboard', function () {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/client/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText('Welcome back, Jake')).to.exist;
  });

  it('renders the 404 page for unknown routes', function () {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText('404 - Page Not Found')).to.exist;
  });
});
