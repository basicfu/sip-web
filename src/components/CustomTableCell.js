import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell/TableCell';

const CustomTableCell = withStyles(theme => ({
  head: {
    padding: 4,
  },
  body: {
    padding: 4,
  },
}))(TableCell);
export default CustomTableCell;
