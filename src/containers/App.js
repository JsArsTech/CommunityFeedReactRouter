import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Feed from './Feed';
import Question from './Question';

const GlobalStyle = createGlobalStyle`
	margin: 0;
	padding: 0;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      	"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      	sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
`; 

const AppWrapper = styled.div`
	text-align: center;
`


class App extends Component {

	render() {
		return (
			<>
				<GlobalStyle />
				<AppWrapper>
					<Header />					
					
						<Switch>
							<Route exact path='/' component={Feed} />
							<Route path='/questions' component={Feed} />
							<Route path='/questions/:id' component={Question} />
						</Switch>
									
				</AppWrapper>
			</>
		);
	}
}

export default App;