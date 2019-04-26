import React from 'react';

class PugCard extends React.Component {

    render() {
        return (
            <div className = "cards">
                <br/>
                <a href={this.props.pugURL} title={this.props.hoverText} ><img src={this.props.pugURL} alt="~pug~" className="ImageBorder"/> </a>
            </div>
        );
    }
}

    
export default PugCard;
