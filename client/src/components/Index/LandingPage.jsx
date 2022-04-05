import React from "react";
import { Link } from "react-router-dom";
import img from '../../assets/imag_ing_bkg.jpg'
import style from './LandingPage.module.css'


export default function LandingPage() {

  return (
    <div>
      <img id={style.img} src={img} alt="" />
      <div id={style.gradient}/>
      <div className={style.container}>
        <h1 className={style.h1}>Bienvenidos</h1>
        <Link id={style.navLink} to={'/recipes'}><button id={style.button}>Ingresar</button></Link>
      </div>
    </div>
  );
}
