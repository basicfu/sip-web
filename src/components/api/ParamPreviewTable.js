import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core';

const styles = {
  table: {
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  headerRow: {
    height: 48,
  },
  tableRow: {
    height: 40,
  },
  tableCell: {
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '4px 6px 4px 14px',
  },
  contentPanel: {
    padding: 16,
  },
  panelHeader: {
    height: 30,
    fontSize: 16,
  },
};

class ParamPreviewTable extends React.Component {
  renderColumnWidth = (id) => {
    switch (id) {
      case 'key':
        return { width: '10%', minWidth: '150px' };
      case 'value':
        return { width: '16%', minWidth: '150px' };
      case 'require':
        return { width: '5%', minWidth: '100px' };
      case 'description':
        return undefined;
      default:
        return { width: '20%', minWidth: '150px' };
    }
  };

  render() {
    const { classes, title, columns, data } = this.props;
    return (
      <div className={classes.contentPanel}>
        <Typography className={classes.panelHeader}>{title}</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.headerRow}>
              {columns && columns.map(item =>
                <TableCell
                  key={item.id}
                  className={classes.tableCell}
                  style={this.renderColumnWidth(item.id)}>{item.label}
                </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.map((item, index) =>
                <TableRow key={index} className={classes.tableRow} style={{ backgroundColor: index % 2 === 1 ? '#f8f8f8' : undefined }}>
                  {columns.map(col => <TableCell key={col.id} className={classes.tableCell}>{col.render ? col.render(item[col.id]) : item[col.id]}</TableCell>)}
                </TableRow>,
              )
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(ParamPreviewTable);
