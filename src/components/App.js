import React from 'react';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import AppShell from './AppShell';
import Theme from './Theme';
class App extends React.Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
				<AppShell title="RARM">
					{this.props.children}
				</AppShell>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node
};

export default App;
