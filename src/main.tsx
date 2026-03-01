// /* eslint-disable import/extensions */
// // import '@/instrument';
// import { createRoot } from 'react-dom/client';
// import '@/css/style.css';
// import '@/css/satoshi.css';
// // import { AppProviders } from '@/app/Providers';
// import App from '@/app/App';

// const root = createRoot(document.getElementById('root')!);

// root.render(
//   <>
//     <App />
//   </>
// );


/* eslint-disable import/extensions */
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/css/style.css";
import "@/css/satoshi.css";
import App from "@/app/App";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);