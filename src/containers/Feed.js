import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { PaginationBar, PaginationLink } from '../components/PaginationBar';

const FeedWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin: 5%;
`;

const Alert = styled.div`
	text-align: center;
`;

const CardLink = styled(Link)`
	text-decoration: none;
	color: inherit
`;

const ROOT_API = 'https://api.stackexchange.com/2.2/';

class Feed extends Component {

	constructor(props) {
		super(props);

		const query = queryString.parse(props.location.search);

		this.state = {
			data: [],
			page: (query.page) ? parseInt(query.page) : 1,
			loading: true,
			error: ''
		};
	}

	componentDidMount() {

		const { page } = this.state;

		this.fetchAPI(page);		
	} 

	componentDidUpdate(prevProps) {

		if (prevProps.location.search !== this.props.location.search) {
			const query = queryString.parse(this.props.location.search);
			this.setState({ page: parseInt(query.page) }, 
				() => this.fetchAPI(this.state.page));
		}
	}

	async fetchAPI(page) {

		try {
			const data = await fetch(
				 `${ROOT_API}questions?order=desc&sort=activity&tagged=reactjs&site=
					stackoverflow${(page) ? `&page=${page}` : ''}`
			);
			const dataJSON = await data.json();

			if (dataJSON) {
				this.setState({
					data: dataJSON,
					loading: false
				});
			}
		}
		catch (error) {
			this.setState({
				loading: false,
				error: error.message
			});
		}

	}

	render() {

		const { data, page, loading, error } = this.state;
		const { match } = this.props;

		if (loading || error) {
			return <Alert>{loading ? 'Loading...' : error}</Alert>;
		}

		return (
			<FeedWrapper>
				{
					data.items.map(item => 
						<CardLink key={item.question_id} 
							to={`/questions/${item.question_id}`}>
							<Card data={item} />
						</CardLink>)

				}
				<PaginationBar>
					{ page > 1 && <PaginationLink to={`${match.url}?page=${page - 1}`}>Previous</PaginationLink> }
					{ data.has_more && <PaginationLink to={`${match.url}?page=${page + 1}`}>Next</PaginationLink> }					
				</PaginationBar>
			</FeedWrapper>
		);
	}
}

export default Feed;