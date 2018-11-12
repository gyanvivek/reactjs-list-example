import React, { Component } from "react";
import { getProjectList } from "../actions";
import { connect } from "react-redux";
import ProjectItem from "./ProjectItem";
import {
  List,
  Grid,
  withStyles,
  Chip,
  Typography,
  TextField,
  Paper,
  MenuItem,
  TableCell,
  TableSortLabel,
  Table,
  TableRow,
  TableHead
} from "@material-ui/core";
import Select from "react-select";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";
import CancelIcon from "@material-ui/icons/Cancel";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function desct(a, b, orderBy) {
  const t1 = new Date(a[orderBy]);
  const t2 = new Date(b[orderBy]);
  if (t2 < t1) {
    return -1;
  }
  if (t2 > t1) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  if (orderBy === "end.time") {
    return order === "desc"
      ? (a, b) => desct(a, b, orderBy)
      : (a, b) => -desct(a, b, orderBy);
  }
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: null,
      orderBy: "",
      order: "asc"
    };
  }

  componentDidMount() {
    this.props.getProjectList();
  }
  filter = () => {
    let array = [];
    if (this.state.selectedProject == null) return this.props.projects;

    array = this.props.projects.map(item => {
      if (this.state.selectedProject.value.title === item.title) {
        return item;
      }
    });
    return array;
  };
  createSortHandler = property => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  render() {
    const { classes, theme } = this.props;
    const { order, orderBy } = this.state;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <>
        <Paper
          style={{
            position: "fixed",
            background: "black",
            zIndex: 10000,
            width: "100%"
          }}
        >
          {/* //<div style={{} >  */}
          <div
            style={{
              marginLeft: 20,
              marginTop: 8,
              marginRight: 20,
              marginBottom: 16
            }}
          >
            <Select
              classes={classes}
              styles={selectStyles}
              components={components}
              value={this.state.selectedProject}
              onChange={item => this.setState({ selectedProject: item })}
              onInputChange={event => {
                if (this.state.selectedProject !== null) {
                  this.setState({ selectedProject: null });
                }
              }}
              placeholder="Search Project by name"
              options={this.props.projects.map(item => {
                return { value: item, label: item.title };
              })}
            />
            <div />
            <Grid container direction="row">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography style={{ color: "white" }}>
                        Sort By :
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "end.time"}
                        direction={order}
                        style={{ color: "white" }}
                        onClick={() => this.createSortHandler("end.time")}
                      >
                        End Time
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "amt.pledged"}
                        direction={order}
                        style={{ color: "white" }}
                        onClick={() => this.createSortHandler("amt.pledged")}
                      >
                        Amount Pledged
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "percentage.funded"}
                        direction={order}
                        style={{ color: "white" }}
                        onClick={() =>
                          this.createSortHandler("percentage.funded")
                        }
                      >
                        Percentage Funded
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{borderColor:"white",borderWidth:1}}>
                     
                      >
                      <TableSortLabel
                        active={false}
                        direction={order}
                        style={{ color: "white" }}
                        onClick={()=>this.setState({selectedProject: null,orderBy: "",order: "asc"})}
                      >
                        REMOVE FILTERS
                      </TableSortLabel>
                      
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Grid>
          </div>
          {/* </div>  */}
        </Paper>
        <Paper style={{ paddingTop: 100, height: "100%" }}>
          <List>
            {this.state.selectedProject != null ? (
              <ProjectItem
                key={this.state.selectedProject.value["s.no"]}
                backer={this.state.selectedProject.value["num.backers"]}
                title={this.state.selectedProject.value.title}
                by={this.state.selectedProject.value.by}
                slno={this.state.selectedProject.value["s.no"]}
                blurb={this.state.selectedProject.value.blurb}
                location={this.state.selectedProject.value.location}
                state={this.state.selectedProject.value.state}
                amount={this.state.selectedProject.value["amt.pledged"]}
                percentage={
                  this.state.selectedProject.value["percentage.funded"]
                }
                url={this.state.selectedProject.value.url}
                currency={this.state.selectedProject.value.currency}
                endTime={this.state.selectedProject.value["end.time"]}
              />
            ) : this.props.projects.length !== 0 ? (
              stableSort(this.props.projects, getSorting(order, orderBy)).map(
                item => {
                  return (
                    <ProjectItem
                      key={item["s.no"]}
                      backer={item["num.backers"]}
                      title={item.title}
                      by={item.by}
                      slno={item["s.no"]}
                      blurb={item.blurb}
                      location={item.location}
                      state={item.state}
                      amount={item["amt.pledged"]}
                      percentage={item["percentage.funded"]}
                      url={item.url}
                      currency={item.currency}
                      endTime={item["end.time"]}
                    />
                  );
                }
              )
            ) : null}
          </List>
        </Paper>
      </>
    );
  }
}

//export default Home;

const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  };
};

// export default HolidayList;
//withStyles(styles, { withTheme: true })(IntegrationReactSelect);
export default connect(
  mapStateToProps,
  { getProjectList }
)(withStyles(styles, { withTheme: true })(Home));
