import React from 'react';
import Link from 'react-router/lib/Link';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/link';
import { FlatButton } from 'material-ui';

export default class AppShell extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			title: props.title || 'RARM'
		};

		this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
		this.handleRequestChange = this.handleRequestChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleToggleDrawer() {
		this.setState({open: !this.state.open});
	}

	handleRequestChange(open) {
		this.setState({open});
	}

	handleClose(e) {
		console.log(e.nativeEvent);
		this.setState({open: false});
		e.preventDefault();
	}

	render() {
		return (
			<div>
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={this.handleRequestChange}
					>
					<MenuItem primaryText="Home" leftIcon={<ContentLink/>} containerElement={<Link to="/"/>} onClick={this.handleToggleDrawer}/>
					<MenuItem primaryText="Chat" leftIcon={<ContentLink/>} containerElement={<Link to="/chat"/>} onClick={this.handleToggleDrawer}/>
					<MenuItem primaryText="My Account" leftIcon={<ContentLink/>} containerElement={<Link to="/account"/>} onClick={this.handleToggleDrawer}/>
					<MenuItem primaryText="Contact" leftIcon={<ContentLink/>} containerElement={<Link to="/Contact"/>} onClick={this.handleToggleDrawer}/>
					
				</Drawer>
				<AppBar
					title={this.state.title}
					onLeftIconButtonClick={this.handleToggleDrawer}
					iconElementRight={<FlatButton backgroundColor="red" label="Emergency Contact" href="/#/contact" />}
					/>
				

				<div id="content" style={{width: '90%', margin: 'auto', marginTop: '30px'}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

AppShell.propTypes = {
	title: React.PropTypes.string,
	children: React.PropTypes.node
};