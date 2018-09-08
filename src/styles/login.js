const drawerWidth = 230;
export default theme => ({
  box: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundImage: 'url(\'/static/logo_bg.jpg\')',
    width: '100%',
    minHeight: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: '100% 100%',
    display: 'flex',
  },
  container: {
    width: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 80px)',
    paddingTop: '30vh',
    margin: '0 auto',
  },
  main: {
    width: '400px',
    margin: '0 auto',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 0',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.7)',
  },
  conPadding: {
    padding: '0 40px',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  logo: {
    margin: '0 auto',
    height: '45px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#e91e63',
    margin: '0 auto',
  },
  logoTitle: {
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: '400',
    margin: '20px 0'
  },
  buttonCon: {
    marginTop: '15px',
  },
  button: {
    width: '100%',
    minHeight: '40px',
  },
  pwdCon: {
    position: 'relative',
    marginTop: '20px',
  },
  pwdLeft: {
    float: 'left',
    '& a': {
      textDecoration: 'none',
      color: '#1a73e8',
      fontSize: '13px',
    },
  },
  pwdRight: {
    float: 'right',
    '& a': {
      textDecoration: 'none',
      color: '#1a73e8',
      fontSize: '13px',
    },
  },
  label: {
    color: '#1a73e8',
  },
});
