import React from "react";
import PugCard from "./PugCard.jsx";
import './custom.css'
import Button from 'react-bootstrap/Button';
class PugHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pugList: [],
        quotes: ["Pugs and kisses!", "You're tougher than your ruff day.", "Don't let the bad days dog you!",
      "Keep your head pup!", "You're pawsitively pawesome.", "Fur-get about your bad day!", "Paws and take a moment for yourself.",
    "You look fetching today!", "Pet yourself on the back; you're doing great!", "You're just so doggone wonderful!"]
      } //I know I can get quotes through and API, but I wanted my own personal Dog Puns
      this.updatePugs = this.updatePugs.bind(this);
      this.getDogs = this.getDogs.bind(this);
    }


    uniq(value,index,self) {
      return self.indexOf(value)===index;
    }
    async getDogs() {
      let response = await fetch("https://acoustic-bit.glitch.me/pug");
      let text = await response.json();
      let temp = this.state.pugList.concat(text.pugs).filter(this.uniq);
      this.setState({
        pugList: temp
    });    
  }

  componentDidMount() {
    this.getDogs();
    document.addEventListener("scroll", () => {
        const wrappedElement = document.getElementById('header');
      if (this.isBottom(wrappedElement)) {
        setTimeout(this.getDogs, 100);
      }
      }
    );
  }
  
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  updatePugs (){
      this.getDogs();
  }



  render() {
    return (
        <div id='header' ref="iScroll">
          <div className="title">Pugs for Pawsitivity</div>

          <div className="subtext">
          Made By: Evan Sum <br/>
          Click each pug to follow it home or hover over any pug if you are on a computer to see a message
          </div>
            {this.state.pugList.map((pugURL,i) => (
            <PugCard pugURL={pugURL} key={i} number={i} hoverText={this.state.quotes[i%10]}/>))}
            <br/>
            
        </div>
    );
  }
}
    
export default PugHolder;
