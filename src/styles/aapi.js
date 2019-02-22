const drawerWidth = 230;
export default theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    height: 'calc( 100% - 48px )',
  },
  mainContent: {
    position: 'absolute',
    top: 112,
    left: 230,
    width: 'calc( 100% - 230px )',
    height: 'calc( 100% - 112px )',
  },
  tabsRoot: {
    // borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },

  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 2,
    height: 'calc(100% - 48px)',
    width: '100%',
    overflowY: 'auto',
    // backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },



  mainContentBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  mainContentBottom: {
    flex: 1,
    // borderTop: '2px dashed #ddf',
    overflowY: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },

  sendBtn: {
    color: '#666',
    marginRight: 10,
    width: '100%',
    minWidth: 70,
  },
  saveBtn: {
    width: '100%',
    minWidth: 70,
  },
  input: {
    color: 'inherit',
    // margin: theme.spacing.unit,
    width: '100%',
    minWidth: 200,
    fontSize: 14,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #eee',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
    minWidth: 120,
    fontSize: 14,
  },
  tableHeadRow: {
    height: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  tableHead: {
    fontWeight: 600,
    // color: '#333',
  },
  tableCellRoot: {
    border: '1px solid #eee',
    paddingRight: 10,
  },
  tableCellPadding: {
    padding: '0 10px',
  },
  checkboxPadding: {
    padding: 0,
  },
  tableBtn: {
    float: 'right',
    display: 'inline-block',
    color: '#40a9ff',
    cursor: 'pointer',
    height: '100%',
  },
  textLength: {
    display: 'inline-block',
    width: '100%',
    maxWidth: '100%',
    height: 25,
    lineHeight: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
  },
  desStyle: {
    float: 'left',
    width: '90%',
    maxWidth: '90%',
    height: 25,
    lineHeight: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
  },
  closeBtn: {
    float: 'right',
    padding: 0,
    fontSize: 14,
    color: '#666',
    verticalAlign: 'middle',
  },
  bulkSaveBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: '#40a9ff',
    fontSize: 12,
    cursor: 'pointer',
  },
  mainContentBottomHead: {
    // height: 40,
    backgroundColor: '#fff',
    margin: '10px 5px 10px 10px',
    '& > span': {
      display: 'inline-block',
      width: 90,
      textAlign: 'center',
      lineHeight: '40px',
      fontSize: 13,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#40a9ff',
        color: '#fff',
      },
    },
  },
  active: {
    backgroundColor: '#40a9ff',
    color: '#fff',
  },
  mainContentBottomTitle: {
    height: 25,
    fontSize: 13,
    padding: '5px 0',
    '& > span': {
      display: 'inline-block',
      width: 50,
      textAlign: 'center',
      borderRight: '1px solid #dde',
      cursor: 'pointer',
      '&:hover': {
        color: '#40a9ff',
      },
    },
  },
  spanActive: {
    color: '#40a9ff',
  },
  MuiFormControlRoot: {
    padding: '0 12px',
  },
  MuiFormControlLabelRoot: {
    margin: 0,
  },
});
