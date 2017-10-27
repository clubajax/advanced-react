import React from 'react';
import { Link } from 'react-router-dom';
import ClubAjax from '../assets/ClubAjax';
import AppTitle from '../assets/AppTitle';

export default function Header () {
	return (
		<header>
			<ClubAjax />
			<AppTitle />
			<menu>
				<Link to="/home">Home</Link>
				<Link to="/example">Example</Link>
			</menu>
		</header>
	)
}