// //NEWS FOR STORIES ON HOME PAGE

// //NEWS PAGE
// <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 17}}>
// <CSSTransition in={counter} appear timeout={2500} classNames="fade">
//   <div  style={{opacity: 0.4}}>{prevView}</div>
// </CSSTransition>
// <ChevronLeftIcon onClick={() => setCounter(counter === 0 ? (views.length - 1) : (counter - 1))} style={{fontSize: '50px', marginRight: '40px', marginLeft: '20px', backgroundColor: '#242428', color: 'white', borderRadius: '90px', zIndex: 1, cursor: 'pointer'}}></ChevronLeftIcon>
// <CSSTransition in={counter} appear timeout={2500} classNames="fade">
//   <div>{view}</div>
// </CSSTransition>
// <ChevronRightIcon onClick={() => setCounter((counter + 1) % views.length)} style={{fontSize: '50px', marginLeft: '40px', marginRight: '20px', backgroundColor: '#242428', color: 'white', borderRadius: '90px', zIndex: 1, cursor: 'pointer'}}></ChevronRightIcon>
// <CSSTransition in={counter} appear timeout={2500} classNames="fade">
//   <div style={{opacity: 0.4}}>{nextView}</div>
// </CSSTransition>
// </div>

// //OG HOME PAGE

// import React, { useEffect, useState } from "react";
// import Paper from '@material-ui/core/Paper';
// import Tilt from 'react-tilt';
// import {
//   Link
// } from "react-router-dom";

// import './home.css'

// export default function Home(props) {


//   return (
//     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', paddingTop: '20px', paddingBottom: '20px'}}>

//       <div style={{display: 'flex', position: 'relative', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', transformStyle: 'preserve-3d'}}>

//       <Link to='/players' style={{textDecoration: 'none'}}>
//         <Tilt button key={'Players'} className="Tilt" options={{ max : 20, perspective: 2000, scale: 1.02 }} style={{ height: '100%', width: '100%', textDecoration: 'none'}} >
//           <Paper  style={{backgroundColor: 'black', width: '200px', height: '200px', margin: '1px 30px', borderRadius: '160px', zIndex: 1, border: 'solid black 3px'}}>
//               <div style={{height: '100%', color: 'white', display: 'flex', flexDirection: 'column'}}>
//                 <p style={{position: "relative", left: "6%", top: "35%", textEmphasis: 'bold', fontSize: '15px', textShadow:
//   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Player Stats</p>
//                 <img src={""} style={{height: '320px', width: '250px', position: 'relative', transition: '0.5s', zIndex: 11, transformStyle: 'preserve-3d', transform: 'translate3d(2%,-30%,0px)'}} alt="players" />
//               </div>
//           </Paper>
//         </Tilt>
//       </Link>

//       <Link to='/standings' style={{textDecoration: 'none'}}>
//         <Tilt button key={'Standings'} className="Tilt" options={{ max : 20, perspective: 2000, scale: 1.02 }} style={{ height: '100%', width: '100%' }} >
//           <Paper  style={{backgroundColor: 'black', width: '200px', height: '200px', margin: '1px 30px', borderRadius: '160px', zIndex: 1, border: 'solid black 3px'}}>
//               <div style={{height: '100%', color: 'purple', display: 'flex', flexDirection: 'column'}}>
//                 <p style={{position: "relative", left: "20%", top: "55%", textEmphasis: 'bold', fontSize: '14px', textShadow:
//   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}> League Standings</p>
//                 <img src={"/images/bronbron.png"} style={{height: '390px', width: '240px', position: 'relative', transition: '0.5s', zIndex: 11, transformStyle: 'preserve-3d', transform: 'translate3d(20%,-30%,0px)'}} alt="standings" />
//               </div>
//           </Paper>
//         </Tilt>
//       </Link>

//       <Link to='/leaders' style={{textDecoration: 'none'}}>
//         <Tilt button key={'Leaders'} className="Tilt" options={{ max : 20, perspective: 2000, scale: 1.02 }} style={{ height: '100%', width: '100%' }} >
//           <Paper  style={{backgroundColor: 'black', width: '200px', height: '200px', margin: '15px 30px', borderRadius: '160px', zIndex: 1, border: 'solid black 3px'}}>
//               <div style={{height: '100%', color: 'black', display: 'flex', flexDirection: 'column'}}>
//                 <p style={{position: "relative", left: "7%", top: "25%", textShadow:
//   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>League Leaders</p>
//                 <img  style={{height: '320px', width: '250px', position: 'relative', transition: '0.5s', zIndex: 11, transformStyle: 'preserve-3d', transform: 'translate3d(0%,-25%,0px)'}} alt="leaders" />
//               </div>
//           </Paper>
//         </Tilt>
//       </Link>
//       </div>
//       <div>
//       </div>
//       <footer>
//         <p style={{color: 'black', textShadow: 'none'}}>@ 2021 Tale Of The Tape</p>
//       </footer>


//     </div>
//   );
// }