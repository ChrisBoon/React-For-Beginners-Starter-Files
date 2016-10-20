import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component{
	render(){
		const title = this.props.title;
		return(
			<div className="op2-header">
				<h1 className="op2-header-heading">{title}</h1>
        <div className="avatar-container">
          <Link to={`/switch`}>
            <img src={this.props.avatar} alt={this.props.username} className="avatar-img"/>
          </Link>
        </div>        
			</div>
		)
	}
}

Header.propTypes = {
  avatar: React.PropTypes.string,
  username: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
}

export default Header;