/* eslint-disable jsx-a11y/no-autofocus */
import React, {Fragment} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {withStyles} from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = {
  table: {
    font: '400 11px system-ui',
  },
  headerRow: {
    height: 32,
  },
  tableRow: {
    height: 32,
  },
  tableHeaderCell: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderLeft: 'none',
    padding: '4px 6px',
    height: 32,
    '&:last-child': {
      borderRight: 'none',
    },
  },
  tableCell: {
    borderBottom: '2px solid rgba(224, 224, 224, 0.4)',
    borderLeft: '2px solid rgba(224, 224, 224, 0.4)',
    borderRight: '2px solid rgba(224, 224, 224, 0.4)',
    padding: '4px 6px',
    height: 32,
    '&:first-child': {
      padding: 0,
    },
    // font: '400 11px system-ui',
  },
  contentPanel: {
    padding: 16,
  },
  panelHeader: {
    height: 30,
    fontSize: 16,
  },
  bulk: {
    font: '400 11px system-ui',
  },
  bulkDiv: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    height: 32,
    textAlign: 'right',
  },
  keyValueEdit: {
    font: '400 12px system-ui',
    color: '#ff5300',
    cursor: 'pointer',
    verticalAlign: 'middle',
    lineHeight: '32px',
    position: 'absolute',
    right: '24px',
    '-moz-user-select': '-moz-none',
    '-khtml-user-select:': 'none',
    '-webkit-user-select': 'none',
  },
  bulkEdit: {
    font: '400 12px system-ui',
    color: '#ff5300',
    cursor: 'pointer',
    position: 'absolute',
    right: '24px',
    '-moz-user-select': '-moz-none',
    '-khtml-user-select:': 'none',
    '-webkit-user-select': 'none',
  },
  input: {
    width: '100%',
    height: '100%',
    outlineStyle: 'none',
    paddingBottom: '3px',
    // font: '400 11px system-ui',
    border: 'none',
  },
  selectInput: {
    width: '100%',
    height: '100%',
    outlineStyle: 'none',
    paddingBottom: '3px',
    // font: '400 11px system-ui',
    border: 'none',
    // border: '1px solid rgba(224, 224, 224, 0.8)',
  },
  tableHeaderFirstCell: {
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '4px 6px',
    width: 42,
    height: 32,
  },
  checkBox: {
    width: 24,
    height: 24,
  },
  queryDragIcon: {
    marginRight: '-6px',
    padding: '2px',
    float: 'left',
  }
};
function FormEditTable(props) {
  // console.log(props);
  const {classes, value, setValue, columns} = props;
  const {bulk, data, selectRow, selectId} = value;
  const renderColumnWidth = (id) => {
    switch (id) {
      case 'key':
        return {width: '10%', minWidth: '150px'};
      case 'value':
        return {width: '16%', minWidth: '150px'};
      case 'require':
        return {width: '5%', minWidth: '100px'};
      case 'description':
        return undefined;
      default:
        return {width: '20%', minWidth: '150px'};
    }
  };
  const updateValue = (index, id, newValue) => {
    const newData = [...data];
    newData[index][id] = newValue;
    setValue({...value, data: newData});
  };

  return (
    <Fragment>
      {bulk ?
        <div className={classes.bulk}>
          <div className={classes.bulkDiv}>
            <span className={classes.keyValueEdit} onClick={() => setValue({...value, bulk: !bulk})}>Bulk Edit</span>
          </div>
          <textarea
            placeholder={'key:value'}
            style={{minWidth: '100%', maxWidth: '100%', outline: 'none', border: '1px solid #ddd', minHeight: '150px'}}
            // value={queryParamsBulk}
            // onChange={event => onBulkEditChange(event, 'queryParamsBulk')}
          />
        </div>
        :
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.headerRow}>
              <TableCell className={classes.tableHeaderFirstCell}/>
              {columns && columns.map(item =>
                <TableCell
                  key={item.id}
                  className={classes.tableHeaderCell}
                  style={renderColumnWidth(item.id)}>
                  {item.label}
                  {item.id === 'description' &&
                  <span className={classes.bulkEdit} onClick={() => setValue({...value, bulk: !bulk})}>Bulk Edit</span>
                  }
                </TableCell>,
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data && data.map((item, index) =>
                <TableRow key={index} className={classes.tableRow}
                          style={{backgroundColor: selectRow === index ? '#efefef' : '#fff'}}>
                  <TableCell className={classes.tableCell}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24"
                         fill="rgba(190, 190, 190, 1)" className={classes.queryDragIcon}>
                      <path d="M256 710h482v108H286v-108z m0-242h482v108H286v-108z m0-242h482v108H286v-108z"></path>
                    </svg>
                    <Checkbox
                      className={classes.checkBox}
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                    />
                  </TableCell>
                  {columns.map(col =>
                    <TableCell
                      key={col.id}
                      className={classes.tableCell}
                      onClick={() => setValue({...value, selectRow: index, selectId: col.id})}
                    >
                      <input
                        style={{backgroundColor: selectRow === index ? '#efefef' : '#fff'}}
                        autoFocus
                        onFocus={() => setValue({...value, selectRow: index})}
                        className={`${selectRow}${selectId}` === `${index}${col.id}` ? classes.selectInput : classes.input}
                        value={item[col.id]}
                        spellCheck={false}
                        onChange={(e) => updateValue(index, col.id, e.target.value)}
                      />
                    </TableCell>,
                  )}
                </TableRow>,
              )
            }
          </TableBody>
        </Table>
      }
    </Fragment>
  );
}

export default (withStyles(styles)(FormEditTable));
