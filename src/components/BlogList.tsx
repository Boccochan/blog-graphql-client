import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export type BlogMetaInfo = {
  avatar: string;
  author: string;
  title: string;
  keyword: string[];
};

export type BlogInfo = {
  blogList: BlogMetaInfo[];
};

export function BlogList(props: BlogInfo) {
  const blogList = props.blogList;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {blogList.map((meta) => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={meta.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={meta.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    by {meta.author}
                  </Typography>
                  <div>keyword: {meta.keyword.map((key) => key + " ")}</div>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
