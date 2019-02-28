import React, {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Folder from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import NextLink from 'next/link';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewFolder from '@material-ui/icons/CreateNewFolderOutlined';
import Settings from '@material-ui/icons/SettingsOutlined';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import dialog from 'utils/dialog';
import Input from 'components/Input';
import Component from "components/Component";
import {connect} from "dva-no-router";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 230;
const styles = theme => ({
  drawer: {
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: 'inherit',
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    height: 48,
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    height: 48,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    borderRadius: 0,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  buttonLeaf: {
    color: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  active: {
    // color: theme.palette.primary.main,
    // backgroundColor: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: '#e6f7ff',
    },
    borderRight: '3px solid #1890ff',
    color: '#1890ff',
    backgroundColor: '#e6f7ff',
  },
  menuLabel: {
    marginLeft: 6,
    cursor: 'pointer',
  },
  a: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
  moreOperation: {
    position: 'absolute',
    right: 0,
  },
  listIcon: {
    margin: '0',
  },
  listText: {
    padding: '0 6px',
    '& span': {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: '0.875rem',
      letterSpacing: '0.02857em',
    },
  },
  listSelected: {
    fontWeight: theme.typography.fontWeightMedium,
    borderRight: '3px solid #1890ff',
    '& span':{
      color: '#1890ff',
    },
    '& svg':{
      color: '#1890ff',
    },
    backgroundColor: '#e6f7ff!important',
  },
  input: {
    width: 'calc( 100% - 106px )',
    margin: '0 10px 0 0',
  },
  operationOption: {
    position: 'absolute',
    right: 0,
    top: 180,
    zIndex: 99999,
    backgroundColor: '#fff'
  },
  operationOptionItem: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  operationOptionIcon: {
    marginRight: 0,
  },
  operationOptionText: {
    padding: '0 4px',
    '& span': {
      color: 'rgba(0, 0, 0, 0.65)',
      fontSize: '12px',
      letterSpacing: '0.02857em',
    },
  },
  method:{
    fontSize: '0.7rem',
    width: 28,
    textAlign: 'center',
  },
  methodGET:{
    color:'rgba(24, 171, 105, 0.9)',
  },
  methodPOST:{
    color:'rgba(254, 169, 0, 0.9)',
  },
  methodPUT:{
    color:'rgba(34, 102, 242, 0.9)',
  },
  methodPATCH:{
    color:'rgba(137, 137, 137, 0.9)',
  },
  methodDELETE:{
    color:'rgba(236, 85, 86, 0.9)',
  },
  methodHEAD:{
    color:'rgba(137, 137, 137, 0.9)',
  },
  methodOPTIONS:{
    color:'rgba(137, 137, 137, 0.9)',
  },
});

const Directory = withStyles(styles)((
  {classes, id, depth, title, children, projectSelectd, handleOptionOpen, option,project}
) => {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const {selected,changeSelected,changeProject,changeCategory}=project;
  const {projectId,categoryId,interfaceId}=selected;
  const listItemSelected=depth===0?projectId===id:categoryId===id;
  const style = {paddingLeft: 8 * (2 + 2 * depth)};
  const directoryChange = () => {
    handleOptionOpen({open: false, selectId: categoryId});
    setOpen(!open);
    let asUrl;
    // 是项目
    if(depth===0){
      changeProject(id,!open);
      asUrl=`/sapi/project/${id}/interface`;
    }else{
      changeSelected({...selected,categoryId:id});
      asUrl=`/sapi/project/${projectId}/interface/category/${categoryId}`;
    };
    Router.push('/sapi/interface', asUrl);
  };
  const handleOption = (e) => {
    const rect = e.target.getBoundingClientRect();
    const newOpen = option.selectId === categoryId ? !option.open : true;
    handleOptionOpen({open: newOpen, top: rect.height / 2 + rect.top, selectId: categoryId});
    e.stopPropagation();
  };
  const handleHover = (flag) => {
    let newOption = {...option};
    newOption.open = false;
    document.body.onclick = flag === true ? () => {
    } : () => handleOptionOpen(newOption);
    setHover(flag);
  };
  return (
    <Fragment>
      <ListItem
        selected={listItemSelected}
        className={listItemSelected?classes.listSelected:undefined}
        // classes={{selected:classes.list}}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={() => directoryChange()}
        button
        style={style}
      >
        <ListItemIcon className={classes.listIcon}>
          {open ? <FolderOpen/> : <Folder/>}
        </ListItemIcon>
        <ListItemText className={classes.listText} primary={title}/>
        <IconButton
          style={{display: depth === 0 && hover ? undefined : 'none'}}
          className={classes.moreOperation}
          onClick={handleOption}
        >
          <MoreHoriz/>
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Fragment>

  );
});
const Interface = withStyles(styles)(({classes, projectId, interfaceId, depth, title,method}) => {
  const [hover, setHover] = React.useState(false);
  const style = {
    paddingLeft: 8 * (2 + 2 * depth),
  };
  const interfaceChange = () => {
    Router.push('/sapi/run', `/sapi/project/${projectId}/interface/${interfaceId}/run`);
  };
  const formatMethod=(method)=>{
    switch (method.toUpperCase()) {
      case 'PATCH':
        return 'PAT';
      case 'DELETE':
        return 'DEL';
      case 'OPTIONS':
        return 'OPT';
      default:
        return method;
    }
  };
  return (
    <ListItem
      // selected={projectSelectd}
      className={classes.list}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // className={classes.item}
      onClick={() => interfaceChange()}
      button
      style={style}
    >
      <span className={classNames(classes.method, classes[`method${method}`])}>{formatMethod(method)}</span>
      <ListItemText className={classes.listText} primary={title}/>
      <IconButton
        style={{display: depth === 0 && hover ? undefined : 'none'}}
        className={classes.moreOperation}
        onClick={(e) => e.stopPropagation()}
      >
        <MoreHoriz/>
      </IconButton>
    </ListItem>
  );
});

// eslint-disable-next-line react/prop-types
function renderNavItems({items, depth, projectId, option, handleOptionOpen, project}) {
  // let projectId = 0;
  // if (process.browser && depth === 0) {
  //   const split = Router.asPath.split('/');
  //   if (split.length === 4) {
  //     projectId = parseInt(split[3], 10);
  //   }
  // }
  return (
    <List style={{padding: 0}}>
      {items.reduce((children, item) => {
          const realProjectId = depth === 0 ? item.id : projectId;
          const haveChildren = item.children && item.children.length > 0;
          if (depth === 0 || item.type==='DIRECTORY') {
            children.push(
              <Directory
                key={item.id}
                id={item.id}
                depth={depth}
                title={item.name}
                option={option}
                handleOptionOpen={handleOptionOpen}
                project={project}
              >
                {haveChildren && renderNavItems({
                  items: item.children,
                  depth: depth + 1,
                  projectId: realProjectId,
                  option,
                  handleOptionOpen,
                  project
                })}
              </Directory>,
            );
          } else {
            children.push(
              <Interface
                key={item.id}
                projectId={realProjectId}
                interfaceId={item.id}
                depth={depth}
                title={item.name}
                option={option}
                method={item.method}
                handleOptionOpen={handleOptionOpen}
                project={project}
              />,
            );
          }
          return children;
        },
        [],
      )}
    </List>
  );
}

function NewProject({onChange}) {
  return (
    <Fragment>
      <Input onChange={e => onChange('name', e.target.value)} column={{label: '项目名'}}/>
      <Input onChange={e => onChange('basePath', e.target.value)} column={{label: '基础路径'}}/>
    </Fragment>
  );
}

function Category({onChange}) {
  return (
    <Fragment>
      <Input onChange={e => onChange('name', e.target.value)} column={{label: '分类名'}}/>
      <Input onChange={e => onChange('description', e.target.value)} column={{label: '备注'}}/>
    </Fragment>
  );
}

const OperationOption = withStyles(styles)(({classes, option, handleOptionOpen, createCategory,deleteCategory}) => {
  const {open, top} = option;
  const optionList = [
    {name: '添加分类', icon: <CreateNewFolder/>, onClick: createCategory},
    {
      name: '添加接口', icon: <CreateNewFolder/>, onClick: () => {
        console.log('a')
      }
    },
    {
      name: '修改', icon: <CreateNewFolder/>, onClick: () => {
        console.log('a')
      }
    },
    {
      name: '复制', icon: <CreateNewFolder/>, onClick: () => {
        console.log('a')
      }
    },
    {
      name: '删除', icon: <CreateNewFolder/>, onClick: deleteCategory
    },
  ];
  return (
    <Paper style={{display: !open && 'none', top: `${top - 40}px`}} className={classes.operationOption} elevation={24}>
      <List component="nav">
        {optionList.map((item, index) => {
          return (
            <ListItem key={index} className={classes.operationOptionItem} button onClick={item.onClick}>
              <ListItemIcon className={classes.operationOptionIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText className={classes.operationOptionText} primary={item.name}/>
            </ListItem>
          )
        })}
      </List>
    </Paper>
  );
});
const namespace = 'sapiSapi';

class ProjectSidebar extends Component {
  state = {
    project: {name: '', basePath: '', projectType: 'PRIVATE'},
    category: {name: ''},
    selected: {
      projectId: 0,
      categoryId: 0,
      interfaceId: 0,
    },
    option: {
      open: false,
      top: 0,
      selectId: undefined,
    },
  };

  componentDidMount() {
    this.dispatch({type: `${namespace}/all`})
  }

  handleDone = () => {
    this.dispatch({type: `${namespace}/insert`, payload: this.state.project})
  };
  handleCategoryDone = () => {
    const {selected: {projectId, categoryId}, category} = this.state;
    this.dispatch({type: `${namespace}/insertCategory`, payload: {...category, pid: categoryId, projectId}})
  };
  handleChange = (id, value) => {
    let project = this.state.project;
    project[id] = value;
    this.setState({project})
  };
  handleCategoryChange = (id, value) => {
    let category = this.state.category;
    category[id] = value;
    this.setState({category})
  };
  handleOptionOpen = ({open, top, selectId}) => {
    const newOpen = open !== undefined ? open : !this.state.option.open;
    this.setState({option: {open: newOpen, top, selectId}})
  };
  createProject = () => {
    this.handleOptionOpen({...this.state.option, open: false});
    dialog.confirm({
      top: 200,
      title: '添加项目',
      content: <NewProject onChange={this.handleChange}/>,
      onOk: this.handleDone,
    });
  };
  createCategory = () => {
    this.handleOptionOpen({...this.state.option, open: false});
    dialog.confirm({
      top: 200,
      title: '添加分类',
      content: <Category onChange={this.handleCategoryChange}/>,
      onOk: this.handleCategoryDone,
    });
  };
  deleteCategory = () => {
    const {projectId}=this.state.selected;
    const onOk=()=>this.dispatch({ type: `${namespace}/delete`, payload: [projectId] });
    this.handleOptionOpen({...this.state.option, open: false});
    dialog.confirm({ title:"确定要删除吗？",onOk  });
  };
  changeProject=(projectId,open)=>{
    const {selected}=this.state;
    if(projectId!==selected.projectId){
      this.setState({selected:{...selected,projectId}});
      this.dispatch({type:`${namespace}/getCategory`,payload:{projectId}})
    }
  };
  changeCategory=(categoryId)=>{
    const {selected}=this.state;
    if(categoryId!==selected.categoryId){
      this.setState({selected:{...selected,categoryId}});
      this.dispatch({type:`${namespace}/getCategory`,payload:{projectId}})
    }
  };
  render() {
    const {classes, data: {projectList}} = this.props;
    const {option, selected} = this.state;
    return (
      <Fragment>
        <Paper elevation={1}>
          <IconButton>
            <SearchIcon/>
          </IconButton>
          <InputBase type="search" className={classes.input}/>
          <IconButton onClick={() => this.createProject()}>
            <CreateNewFolder/>
          </IconButton>
        </Paper>
        <Divider/>
        <OperationOption
          option={option}
          handleOptionOpen={this.handleOptionOpen}
          createCategory={this.createCategory}
          deleteCategory={this.deleteCategory}
        />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {renderNavItems({items: projectList, depth: 0, option, handleOptionOpen: this.handleOptionOpen,
            project:{
              selected,
              changeSelected:(selected)=>{this.setState({selected})},
              changeProject:this.changeProject,
              changeCategory:this.changeCategory,
            }
          })}
        </Drawer>
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: state[namespace],
}))(withStyles(styles)(ProjectSidebar));
