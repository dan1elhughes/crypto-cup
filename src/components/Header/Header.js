import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const Header = ({ children }) => (
	<div className="Header">
		<h1>{children}</h1>
	</div>
);

Header.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Header;
