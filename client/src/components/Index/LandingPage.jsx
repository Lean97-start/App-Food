import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {

  return (
    <div>
      <h1>Bienvenidos</h1>
      <Link to={'/recipes'}><button>Ingresar</button></Link>
    </div>
  );
}
