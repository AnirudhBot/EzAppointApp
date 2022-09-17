import React from 'react'
import './about.css'

export default function About(props) {
  let c = () => { if(props.mode === 'dark') {
    return 'white';
  }  
   else return 'black'; }
  return (
    <section className="Team">
      <div className="container" style={{padding:'49px'}}>
        <h1 style={{color:c()}}>Our Team</h1>
        <div className="row">
          <div className="col-md-3 profile text-center">
            <div className="img-box">
              <img src={require('../images/GiteshD.jpg')} className="img-fluid rounded"/>
                <ul>
                  <a href="https://twitter.com/PareeKGitesh89"  target='_blank'><li><i className="fa fa-twitter"></i></li></a>
                  <a href="https://www.linkedin.com/in/gitesh-pareek-146a78213/"  target='_blank'><li><i className="fa fa-linkedin"></i></li></a>
                </ul>
            </div>
            <h2>Gitesh Pareek</h2>
            <h4>Project Manager / Front-End Dev</h4>
          </div>
          <div className="col-md-3 profile text-center">
            <div className="img-box">
              <img src={require('../images/AnirudhD.jpg')} className="img-fluid rounded"/>
                <ul>
                  <a href="https://twitter.com/bot_Anirudh"  target='_blank'><li><i className="fa fa-twitter"></i></li></a>
                  <a href="https://www.linkedin.com/in/anirudh-sharma-24516b215/"  target='_blank'><li><i className="fa fa-linkedin"></i></li></a>
                </ul>
            </div>
            <h2>Anirudh Sharma</h2>
            <h4>MERN Stack Developer</h4>
          </div>
          <div className="col-md-3 profile text-center">
            <div className="img-box">
              <img src={require('../images/HarshitaD.jpg')} className="img-fluid rounded"/>
                <ul>
                  <a href="https://twitter.com/HarshitaPal18"  target='_blank'><li><i className="fa fa-twitter"></i></li></a>
                  <a href="https://www.linkedin.com/in/harshita-pal-1848751bb/"  target='_blank'><li><i className="fa fa-linkedin"></i></li></a>
                </ul>
            </div>
            <h2>Harshita Pal</h2>
            <h4>UI/UX Designer / ReactJs Developer</h4>
          </div>
          <div className="col-md-3 profile text-center">
            <div className="img-box">
              <img src={require('../images/AyushD.jpg')} className="img-fluid rounded"/>
                <ul>
                  <a href="https://twitter.com/ayushsharma1712?t=Mg074iaPX101Rw2Ap-LYTA&s=09"  target='_blank'><li><i className="fa fa-twitter"></i></li></a>
                  <a href="https://www.linkedin.com/in/ayush-sharma-a703391b6"  target='_blank'><li><i className="fa fa-linkedin"></i></li></a>
                </ul>
            </div>
            <h2>Ayush Sharma</h2>
            <h4>Back-End Developer</h4>
          </div>
        </div>
      </div>
    </section>
  )
}
