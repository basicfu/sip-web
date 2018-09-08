export default theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    height: '100vh',
    padding: '15px',
    margin: '0',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    height: '100vh',
  },
  conntainLeft: {
    width: '38%',
    maxWidth: '38%',
    flexBasis: '38%',
  },
  conntainRight: {
    width: '58%',
    maxWidth: '58%',
    flexBasis: '58%',
  },
  line: {
    margin: '0 13px',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
  leftTable: {
    position: 'relative',
  },
  rightTabsOne: {
    position: 'relative',
  },
  CustomTable: {
    boxShadow: 'none'
  },
  search: {
    margin: '10px 0'
  }
})
