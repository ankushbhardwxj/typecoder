import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavBar = (props) => {
  return (
    <React.Fragment>
      <Menu style={styles.navbar}>
        <Menu.Item>
          <h3 style={styles.logo}> TypeCode ☕ </h3>
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
