import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavBar = (props) => {
  return (
    <React.Fragment>
      <Menu style={styles.navbar}>
        <Menu.Item>
          <Link to='/app'>
            <h3 style={styles.logo}> TypeCode ☕ </h3>
          </Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>

  );
};
const styles = {
  logo: {
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: 'Source Code Pro',
    color: 'white',
  },
  navbar: {
    backgroundColor: '#1b1c1d',
  },
};
export default NavBar;
