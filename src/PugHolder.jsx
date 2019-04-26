import React from "react";
import PugCard from "./PugCard.jsx";
import './custom.css'
import Button from 'react-bootstrap/Button';
class PugHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pugList: [],
        currentList:[],
        amount: 5,
        quotes: ["Pugs and kisses!", "You're tougher than your ruff day.", "Don't let the bad days dog you!",
      "Keep your head pup!", "You're pawsitively pawesome.", "Fur-get about your bad day!", "Paws and take a moment for yourself.",
    "You look fetching today!", "Pet yourself on the back; you're doing great!", "You're just so doggone wonderful!"]
      } //I know I can get quotes through and API, but I wanted my own personal Dog Puns
      this.updatePugs = this.updatePugs.bind(this);
      this.getDogs = this.getDogs.bind(this);
    }

    async getDogs() {
      let response = await fetch("https://acoustic-bit.glitch.me/pug");
      let text = await response.json();
      this.setState({
          pugList: [...new Set(text.pugs)],
          currentList: [...new Set(text.pugs)].slice(0,this.state.amount),
          amount: 5
      });    
  }

  componentDidMount() {
    this.getDogs();
    document.addEventListener("scroll", () => {
        const wrappedElement = document.getElementById('header');
      if (this.isBottom(wrappedElement)) {
        setTimeout(this.updatePugs, 100);
      }
      }
    );
  }
  
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  updatePugs (){
    if(!(this.state.amount > this.state.pugList.length))
    {
      this.setState(prevState => ({
        currentList: [...prevState.currentList,...prevState.pugList.slice(prevState.amount,prevState.amount + 1)],
        amount: (prevState.amount + 1)
      }));
    }
  }


  render() {
    return (
        <div id='header' ref="iScroll">
          <div className="title">Pugs for Pawsitivity</div>

          <div className="subtext">
          Made By: Evan Sum <br/>
          Click each pug to follow it home or hover over any pug if you are on a computer to see a message
          </div>
            {this.state.currentList.map((pugURL,i) => (
            <PugCard pugURL={pugURL} key={i} number={i} hoverText={this.state.quotes[i]}/>))}
            <br/>
            <div className="cards">
              {this.state.amount===10 || this.state.amount===11 &&
                  <Button size="lg" onClick={() => {
                    window.scrollTo(0,0); 
                    this.getDogs();
                  }}>Click me to randomize pugs</Button>
              }
            </div>
        </div>
    );
  }
}
    
export default PugHolder;
