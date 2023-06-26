import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>loading...</h3>
  </div>
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Suspense fallback={loadingMarkup}>
        <BrowserRouter>
                  <App />
        </BrowserRouter>
  </Suspense>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
