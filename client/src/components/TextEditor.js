import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  DeveloperMode,
  FormatQuote
} from "@material-ui/icons";

import { Editor, getDefaultKeyBinding, EditorState, RichUtils } from "draft-js";
import CodeUtils from "draft-js-code";
import Prism from "prismjs";
import PrismDecorator from "draft-js-prism";
import "prismjs/themes/prism-okaidia.css";

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
      fontFamily: "'Inconsolata', 'Menlo', 'Consolas', monospace"
    }
  };

  const [languageState, setLanguageState] = useState(null);

  useEffect(() => {
    if (props.selectedLanguage !== "") {
      setLanguageState(props.selectedLanguage);
    }
  }, [props.selectedLanguage]);

  var decorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: languageState
  });

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );
  const [inlineFormatButtonState, setInlineFormatButtonState] = useState();
  const [blockFormatButtonState, setBlockFormatButtonState] = useState();

  //Pass language data through into the editor state
  useEffect(() => {
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    const data = block.getData().merge({ syntax: languageState });
    const newBlock = block.merge({ data });
    const newContentState = editorState.getCurrentContent().merge({
      blockMap: editorState
        .getCurrentContent()
        .getBlockMap()
        .set(selection.getStartKey(), newBlock),
      selectionAfter: selection
    });
    setEditorState(
      EditorState.push(editorState, newContentState, "change-block-data")
    );
  }, [languageState]);

  //Triggers editor's focus method
  const editor = React.useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  //Toggle button group controllers
  //TODO move these buttons into a controlled toolbar component.
  const handleInlineFormatChange = (event, newFormats) => {
    event.preventDefault();
    setInlineFormatButtonState(newFormats);
    const style = event.currentTarget.getAttribute("value");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleBlockFormatChange = (event, newFormats) => {
    event.preventDefault();
    setBlockFormatButtonState(newFormats);

    const style = event.currentTarget.getAttribute("value");
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  //When changing editor state always pass the decorator back in or it will be cleared
  const handleChange = newEditorState => {
    setEditorState(EditorState.set(newEditorState, { decorator }));
  };

  const getBlockStyle = block => {
    switch (block.getType()) {
      case "code-block":
        return "language-".concat(props.selectedLanguage);
      default:
        return null;
    }
  };

  //Prevent toolbar buttons from taking focus from the editor
  const preventDefault = event => {
    event.preventDefault();
  };

  //Key press handlers
  const handleKeyCommand = command => {
    let newState;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const bindKeys = event => {
    if (!CodeUtils.hasSelectionInBlock(editorState))
      return getDefaultKeyBinding(event);

    const command = CodeUtils.getKeyBinding(event);

    return command || getDefaultKeyBinding(event);
  };

  const handleReturn = event => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) return "not-handled";

    setEditorState(CodeUtils.handleReturn(event, editorState));
    return "handled";
  };

  const onTab = event => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) return "not-handled";

    setEditorState(CodeUtils.onTab(event, editorState));
    return "handled";
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="flex-start">
        <Grid item xs={3}>
          <ToggleButtonGroup
            value={inlineFormatButtonState}
            onChange={handleInlineFormatChange}
          >
            <ToggleButton value="BOLD" onMouseDown={preventDefault}>
              <FormatBold />
            </ToggleButton>
            <ToggleButton value="ITALIC" onMouseDown={preventDefault}>
              <FormatItalic />
            </ToggleButton>
            <ToggleButton value="UNDERLINE" onMouseDown={preventDefault}>
              <FormatUnderlined />
            </ToggleButton>
            <ToggleButton value="CODE" onMouseDown={preventDefault}>
              CODE
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={3}>
          <ToggleButtonGroup
            value={blockFormatButtonState}
            onChange={handleBlockFormatChange}
            exclusive
          >
            <ToggleButton
              value="unordered-list-item"
              onMouseDown={preventDefault}
            >
              <FormatListBulleted />
            </ToggleButton>
            <ToggleButton value="code-block" onMouseDown={preventDefault}>
              <DeveloperMode />
            </ToggleButton>
            <ToggleButton value="blockquote" onMouseDown={preventDefault}>
              <FormatQuote />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <div className={classes.editor} onClick={focusEditor}>
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={handleChange}
          customStyleMap={editorStyleMap}
          keyBindingFn={bindKeys}
          handleKeyCommand={handleKeyCommand}
          handleReturn={handleReturn}
          onTab={onTab}
          blockStyleFn={getBlockStyle}
        />
      </div>
    </div>
  );
};

export default TextEditor;
