import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

const styles = {};

function Interface(props) {
  const {classes} = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*{rows.map(row => (*/}
            {/*<TableRow key={row.id}>*/}
              {/*<TableCell component="th" scope="row">*/}
                {/*{row.name}*/}
              {/*</TableCell>*/}
              {/*<TableCell align="right">{row.calories}</TableCell>*/}
              {/*<TableCell align="right">{row.fat}</TableCell>*/}
              {/*<TableCell align="right">{row.carbs}</TableCell>*/}
              {/*<TableCell align="right">{row.protein}</TableCell>*/}
            {/*</TableRow>*/}
          {/*))}*/}
        </TableBody>
        {/*<TableFooter>*/}
          {/*<TableRow>*/}
            {/*<TablePagination*/}
              {/*rowsPerPageOptions={[5, 10, 25]}*/}
              {/*colSpan={3}*/}
              {/*count={30}*/}
              {/*rowsPerPage={2}*/}
              {/*// page={page}*/}
              {/*SelectProps={{*/}
                {/*native: true,*/}
              {/*}}*/}
              {/*// onChangePage={handleChangePage}*/}
              {/*// onChangeRowsPerPage={handleChangeRowsPerPage}*/}
              {/*// ActionsComponent={TablePaginationActions}*/}
            {/*/>*/}
          {/*</TableRow>*/}
        {/*</TableFooter>*/}
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(Interface);
