import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Grid, makeStyles } from "@material-ui/core";
import { Editor, EditorState, RichUtils } from "draft-js";

const TextEditor = props => {
  const useStlyes = makeStyles({
    root: {
      width: "100%"
    },
    toolBar: {},
    editor: {
      border: "2px solid grey",
      padding: "10px",
      margin: "0",
      height: "50vh"
    }
  });
  const classes = useStlyes();

  const editorStyleMap = {
    CODE: {
      background: "lightgrey",
      "font-family": "'Courier New', monospace"
    }
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = React.useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  React.useEffect(() => {
    focusEditor();
  }, []);

  const toggleInlineStyle = event => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("txt-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <ButtonGroup variant="text">
          <Button txt-style="BOLD" onMouseDown={toggleInlineStyle}>
            B
          </Button>
          <Button txt-style="ITALIC" onMouseDown={toggleInlineStyle}>
            I
          </Button>
          <Button txt-style="UNDERLINE" onMouseDown={toggleInlineStyle}>
            U
          </Button>
          <Button txt-style="CODE" onMouseDown={toggleInlineStyle}>
            Code
          </Button>
        </ButtonGroup>
      </Grid>
      <div className={classes.editor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          customStyleMap={editorStyleMap}
        />
      </div>
    </div>
  );
};

export default TextEditor;
