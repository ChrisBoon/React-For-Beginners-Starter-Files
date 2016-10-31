import React from 'react';

class ChooseUserLi extends React.Component{

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let changeType;
    if (event.target.checked) {
      changeType = 'add';
    } else {
      changeType = 'remove';
    }
    this.props.updateStatus(changeType, event.target.name)
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