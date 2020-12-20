import React from 'react';
import { Button } from 'semantic-ui-react';
import Typing from 'react-typing-animation';
import { Link } from 'react-router-dom';

const Cursor = () => {
  return (
    <span style={{
      fontWeight: '100',
      fontSize: '1em',
      paddingLeft: '2px',
    }}>|</span>
  )
}

export const Logo = props => {
  return (
    <React.Fragment>
      <Typing
        loop={true}
        startDelay={title.delay}
        cursor={<Cursor />}
        speed={title.fontSpeed}
      >
        <p style={props.style}>{props.title}☕</p>
        <Typing.Delay ms={1000} />
        <Typing.Backspace count={15} />
      </Typing>
    </React.Fragment>
  )
}

const Header = props => {
  return (
    <div>
      <Logo title={props.title} style={styles.header} />
      <img
        style={styles.image}
        src={`${process.env.PUBLIC_URL}/image.PNG`}
      />
      <h4 style={styles.subheader}>
        For
        <span style={styles.subheader.focus}>
          {" fast "}
        </span>
        programmers.
      </h4>
    </div>
  )
}

const Features = () => {
  const features = [
    'Improve your coding speed by typing code instead of random stories',
    'Compete with fellow coders to become the fastest',
    'Get detailed reports to identify typos and improve touch typing',
  ]
  return (
    <ul>
      {features.map(
        (feature, idx) =>
          (<li key={idx} style={styles.li}>{feature}</li>)
      )}
    </ul>
  )
}

const Footer = () => {
  return (
    <div>
      <p style={styles.footer}>
        Made with 🤟 by
        <a target='blank' style={styles.footer.link} href="https://github.com/ankingcodes">
          {" @ankingcodes"}
        </a>
      </p>
    </div>
  )
}


const HomePage = () => {
  return (
    <div style={styles.container}>
      <Header title="TypeCode" />
      <Features />
      <Link to="/app/login">
        <Button
          style={styles.button}
          secondary>
          Log in to get started
        </Button>
      </Link>
      <Footer />
    </div>
  )
}

const title = {
  fontSpeed: 50,
  delay: 0,
}

const styles = {
  footer: {
    color: '#e8e8e8',
    textAlign: 'center',
    fontSize: '15px',
    fontFamily: 'Source Code Pro',
    marginTop: '90px',
    link: {
      color: '#4bd2d6'
    }
  },
  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px'
  },
  image: {
    width: '450px',
    height: '120px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  header: {
    fontFamily: 'Source Code Pro',
    fontSize: '90px',
    textAlign: 'center',
    color: '#e8e8e8',
    textShadow: '2px 2px 2px grey, 2px 2px 2px white'
  },
  subheader: {
    fontFamily: 'Stalinist One, cursive',
    color: '#f05448',
    fontSize: '40px',
    textAlign: 'center',
    textShadow: '4px 4px black',
    focus: {
      color: '#f0a967'
    }
  },
  li: {
    fontFamily: 'Acme, sans-serif',
    fontSize: '20px',
    color: '#e8e8e8',
    marginTop: '11px',
    borderBottom: '0.5px solid grey',
    marginLeft: '30%',
    marginRight: '30%',
    listStyleType: 'none',
    paddingBottom: '11px',
    textAlign: 'center'
  },
  container: {
    paddingTop: '60px'
  }
}
export default HomePage;