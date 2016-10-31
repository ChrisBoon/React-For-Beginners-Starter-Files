import React from 'react';

class ChooseUserLi extends React.Component{

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.checked) {
      this.props.updateStatus('add', event.target.name)
    } else {
      this.props.updateStatus('remove', event.target.name)
    }
  }

	render(){
    const renderedUser = this.props.renderedUser
    const alreadyWatching = this.props.alreadyWatching;
    const key = this.props.myKey;

    let includeToggle;
    if (!alreadyWatching) {
      includeToggle = <input 
          type="checkbox" 
          name={key}
          onChange={this.handleChange}
          ref={(input)=>{this[key] = input}}
          />
    }
    
    return (
      <li className={`c-invite-included-${alreadyWatching? 'true' : 'false'}`} >
        <label>{renderedUser.name}
        {includeToggle}
        </label>
        <span className={`toggle ${alreadyWatching? 'toggle-active toggle-disabled' : ''}`}></span>
      </li>
    )
	}
}

export default ChooseUserLi;