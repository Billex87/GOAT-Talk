//NEWS FOR STORIES ON HOME PAGE
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', marginTop: 17}}>
<CSSTransition in={counter} appear timeout={2500} classNames="fade">
  <div  style={{opacity: 0.4}}>{prevView}</div>
</CSSTransition>
<ChevronLeftIcon onClick={() => setCounter(counter === 0 ? (views.length - 1) : (counter - 1))} style={{fontSize: '50px', marginRight: '40px', marginLeft: '20px', backgroundColor: '#242428', color: 'white', borderRadius: '90px', zIndex: 1, cursor: 'pointer'}}></ChevronLeftIcon>
<CSSTransition in={counter} appear timeout={2500} classNames="fade">
  <div>{view}</div>
</CSSTransition>
<ChevronRightIcon onClick={() => setCounter((counter + 1) % views.length)} style={{fontSize: '50px', marginLeft: '40px', marginRight: '20px', backgroundColor: '#242428', color: 'white', borderRadius: '90px', zIndex: 1, cursor: 'pointer'}}></ChevronRightIcon>
<CSSTransition in={counter} appear timeout={2500} classNames="fade">
  <div style={{opacity: 0.4}}>{nextView}</div>
</CSSTransition>
</div>
