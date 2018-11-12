import React, { Component } from "react";
import {
  ListItem,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import { LocationCity, LocalActivityOutlined } from "@material-ui/icons";
import { HOST_NAME } from "../utilities/constants";

class ProjectItem extends React.PureComponent {
  // componentDidMount(){
  //     console.log(this.props);
  // }

  render() {
    const {
      slno,
      title,
      by,
      blurb,
      location,
      state,
      amount,
      currency,
      endTime,
      percentage,
      backer,
      url
    } = this.props;
    const date = new Date(endTime);
    //  console.log("p"+percentage);
    return (
      <ListItem>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Grid container direction="row" spacing={8} >
              <Grid item sm={2} xl={2} lg={2}>
                <Grid container >
                  <Typography style={{ fontSize: 20 }}>{slno}</Typography>
                  <Grid container direction="row">
                    <LocationCity
                      style={{ color: "blue", height: 15, width: 15 }}
                    />
                    <Grid item container direction="column">
                      <Typography style={{ color: "blue" }}>
                        {" "}
                        {location}
                      </Typography>
                      <Typography style={{ color: "blue" }}>
                        {" "}
                        {state}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8} lg={8} sm container>
                <Grid item xs container direction="column" >
                  <Grid item xs>
                    <Typography style={{fontWeight:"bold"}} gutterBottom variant="subtitle1">
                      {title}
                    </Typography>
                    <div> <span  style={{fontWeight:"bold", color:"grey"}}>  Author : </span> <span>  {by}</span> </div> 
                    <Typography color="textSecondary">{blurb}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <div> <span  style={{fontWeight:"bold", color:"grey"}}>Date :</span>  {date.toDateString()}</div>
                      <div style={{ marginLeft: 20 }}>
                      <span  style={{fontWeight:"bold", color:"grey"}}>
                        Time : </span> {date.toTimeString()}
                        
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row">
                      <div> <span  style={{fontWeight:"bold", color:"grey"}}> No Of Backers :</span>  {backer}</div>
                      <div style={{ marginLeft: 20 }}>
                      <span  style={{fontWeight:"bold", color:"grey"}}>
                        Percentage Funded : </span> {percentage}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={2} xl={2} lg={2}>
                <div> <span  style={{fontWeight:"bold", color:"grey"}}>Currency : </span>  {currency} </div>
                <span  style={{fontWeight:"bold", color:"grey"}}>Amout Pledged </span>
                <Typography style={{fontWeight:"bold"}} variant="title">{amount}</Typography>
                <a href={HOST_NAME + url}> Detail Page</a>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ListItem>
    );
  }
}

export default ProjectItem;
