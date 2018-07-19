import purple from '@material-ui/core/colors/purple';

export default theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  container: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  '@global': {
    '.algolia-autocomplete': {
      fontFamily: theme.typography.fontFamily,
      '& .algolia-docsearch-suggestion--category-header-lvl0': {
        color: theme.palette.text.primary,
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column': {
        opacity: 1,
        padding: '5.33px 10.66px',
        textAlign: 'right',
        width: '30%',
        '&:before': {
          display: 'block',
        },
        '&:after': {
          display: 'none',
        },
      },
      '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content': {
        float: 'right',
        padding: '5.33px 0 5.33px 10.66px',
        width: '70%',
        '&:before': {
          display: 'block',
        },
      },
      '& .algolia-docsearch-suggestion--subcategory-column-text': {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightRegular,
      },
      '& .algolia-docsearch-suggestion--highlight': {
        color: theme.palette.type === 'light' ? '#174d8c' : '#acccf1',
      },
      '& .algolia-docsearch-suggestion': {
        background: 'transparent',
      },
      '& .algolia-docsearch-suggestion--title': {
        ...theme.typography.title,
      },
      '& .algolia-docsearch-suggestion--text': {
        ...theme.typography.body1,
      },
      '& .ds-dropdown-menu': {
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        '&::before': {
          display: 'none',
        },
        '& [class^=ds-dataset-]': {
          border: 0,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  },
  search: {
    position: 'absolute',
    right: '1px',
    top: '14px',
    width: '41px',
    height: '41px',
    fontSize: '20px',
    minWidth: '41px',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 1}px`,
    border: 0,
    borderBottom: '1px solid #ccc',
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
});
