import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <main //This should affect the WHOLE "App" background (Avoid)
          className={'App'}
          data-theme="light"
          /*style={{
              fontSize: '15px',
              padding: '20px',
              margin: '10px',
              background: '#ffffff',
              borderRadius: '20px'
          }}*/
      >
        <App />
      </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
