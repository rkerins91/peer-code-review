import React from "react";
import { NavBar, ThreadDisplay } from "components";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  sidebar: {
    background: "white",
    height: "1000px",
    width: "30%",
    padding: "60px"
  }
});

const testThread = {
  language: {
    name: "javascript",
    experience: 3
  },
  status: 0,
  no_assign: ["5e4a45778e453627b44926ca"],
  _id: "5e4e03748887af2008fa248d",
  creator: "5e4a45778e453627b44926ca",
  title: "TestRawData",
  posts: [
    {
      _id: "5e4e03748887af2008fa248c",
      author: "5e4a45778e453627b44926ca",
      data: {
        blocks: [
          {
            key: "4vdod",
            text: "Testing raw data",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              syntax: "javascript"
            }
          },
          {
            key: "f3inn",
            text: "var rawJs()",
            type: "code-block",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
          {
            key: "12nja",
            text: "bullets",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
          {
            key: "8g0lu",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          }
        ]
      },
      createdAt: "2020-02-20T03:56:36.613Z",
      updatedAt: "2020-02-20T03:56:36.626Z",
      __v: 0
    },
    {
      _id: "5e4e03748887af2008fa248f",
      author: "5e4a45778e453627b44926ca",
      data: {
        blocks: [
          {
            key: "4vdod",
            text: "Testing raw data",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {
              syntax: "javascript"
            }
          },
          {
            key: "f3inn",
            text: "var rawJs()",
            type: "code-block",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
          {
            key: "12nja",
            text: "bullets",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          },
          {
            key: "8g0lu",
            text: "",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: []
          }
        ]
      },
      createdAt: "2020-02-20T03:56:36.613Z",
      updatedAt: "2020-02-20T03:56:36.626Z",
      __v: 0
    }
  ],
  createdAt: "2020-02-20T03:56:36.626Z",
  updatedAt: "2020-02-20T03:56:36.626Z",
  __v: 0
};

const TestPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar></NavBar>
      <Grid container spacing={0}>
        <Grid className={classes.sidebar} item xs={3} lg={3}>
          This is the sidebar
        </Grid>
        <Grid item xs={9} lg={9}>
          <ThreadDisplay threadData={testThread}></ThreadDisplay>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestPage;
