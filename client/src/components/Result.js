import React from 'react'
import './result.css'
export default function Result(props) {
  let c = () => { if(props.mode === 'dark') return 'white'; else return 'black'; }
  return (
    <>
      <div className="main" style={{textAlign:'center',color:c()}}>
          <div id='top' style={{fontSize:'50px', display:'flex', flexDirection:'row', justifyContent:'center', margin:'50px', alignItems:'center', font:'caption'}}>
            <h1>Here's Your Token ID:  </h1>
            <h1 id='token' style={{padding:'10px 30px 10px 30px', backgroundColor:'darkcyan', margin:'0 10px 0 10px'}}>139871</h1>
          </div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', margin:'50px', alignItems:'center', font:'caption', marginBottom:'120px'}}>
              <div id='time'>Your Appointment<br/>is in: <span id='appoint'>40:00</span></div>
              <div className="line-in-middle"></div>
              <div id='detail'>
              <img src={require('../images/doctor.jpg')} width='170px' className="img-fluid rounded"/><br/>
                <span>Doctor: </span>
                <span id='doc'>Strange</span>
                <br/>
                <span>Contact: </span>
                <span id='contact'>8972653XXX</span>
              </div>
          </div>
      </div>
    </>
  )
}
