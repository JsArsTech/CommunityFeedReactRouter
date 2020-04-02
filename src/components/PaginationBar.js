import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PaginationBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const PaginationLink = styled(Link)`
	padding: 1%;
	background: lightBlue;
	color: white;
	text-decoration: none;
	border-radius: 5px;
`;




