import React from 'react';
import ReactDOM from 'react-dom/client';
import Inicio from './inicio';
import Registro from './registro';
import Scanear from './scanear';
import Grupos from "./Grupos"
import Alumnos from "./alumnos"
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />
  },
  {
    path: "/registro",
    element: <Registro />
  },
  {
    path: "/scanear",
    element: <Scanear />
  },
  {
path: "/scanear/:url/attendance/classrooms/:idclass/students/:idalumno",
element: <Scanear />
  },
  {
    path: "/grupos",
    element: <Grupos />
  },
  {
    path: `/grupos/alumnos/:id`,
    element: <Alumnos />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);