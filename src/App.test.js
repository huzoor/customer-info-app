import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { CUSTOMER_INFO, BUTTON_LIST } from './constants';

describe('App Component', () => {
  test('renders the component', () => {
    render(<App />);
    expect(screen.getByText('Cutomer Data Analyser')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Analyse/i })).toBeInTheDocument();
  });

  test('display customer details on Analyse button click', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Analyse/i }));
    expect(screen.getAllByRole('button', { name: /Analyse/i })).toHaveLength(1);
  });

  test('display contract IDs when contractId button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Analyse/i }));
    fireEvent.click(screen.getByText(BUTTON_LIST.find(button => button.desc === 'Uniq customerIds for contractId').desc));
    const contractIdKeys = Object.keys(CUSTOMER_INFO.split('\n').reduce((acc, line) => {
      const [contractId] = line.split(',');
      if (!acc[contractId]) acc[contractId] = true;
      return acc;
    }, {}));
    contractIdKeys.forEach(id => {
      expect(screen.getByText(id)).toBeInTheDocument();
    });
  });

  test('display average build durations when average button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Analyse/i }));
    fireEvent.click(screen.getByText(BUTTON_LIST.find(button => button.desc === 'Average buildduration for each geozone').desc));
    const buildDurations = CUSTOMER_INFO.split('\n').reduce((acc, line) => {
      const [, , , , , buildduration, geozone] = line.split(',');
      if (!acc[geozone]) acc[geozone] = [];
      acc[geozone].push(parseInt(buildduration));
      return acc;
    }, {});
  
    expect(Object.keys(buildDurations)).toHaveLength(1)
  });

});
