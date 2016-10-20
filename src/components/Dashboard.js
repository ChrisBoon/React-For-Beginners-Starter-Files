import React from 'react';
import {Link} from 'react-router';

class Dashboard extends React.Component{
	render(){
		return(
			<div>
				<p>Dashboard</p>
        <Link to={`/chat/`}>
          <p>Chat</p>
        </Link>
			</div>
		)
	}
}

export default Dashboard;