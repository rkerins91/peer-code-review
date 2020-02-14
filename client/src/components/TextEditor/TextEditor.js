import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Toolbar from "./components/Toolbar";

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
    } else {
      //Null is a fallback grammar for Prism
      setLanguageState(null);
    }
  }, [props.selectedLanguage]);

  const decorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: languageState
  });

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorator)
  );

  const [currentInlineStyles, setInlineStyles] = useState([]);
  const [currentBlockType, setBlockType] = useState("");

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

  //Toggle button group controller
  const handleFormatChange = style => {
    if (
      style == "BOLD" ||
      style == "ITALIC" ||
      style == "UNDERLINE" ||
      style == "CODE"
    ) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    } else {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    }
  };

  useEffect(() => {
    const prevContentState = editorState.getCurrentContent();
    if (!prevContentState.hasText()) {
      setBlockType(RichUtils.getCurrentBlockType(editorState));
    }
  }, [editorState]);

  //Run on any change to the editor, updates the editorState
  const handleChange = newEditorState => {
    const prevContentState = editorState.getCurrentContent();

    if (!prevContentState.hasText()) {
      setEditorState(EditorState.set(newEditorState, { decorator }));
      return;
    } //Editor has text, update toolbar buttons
    else {
      setInlineStyles(newEditorState.getCurrentInlineStyle().toArray());
      setBlockType(RichUtils.getCurrentBlockType(newEditorState));
      setEditorState(EditorState.set(newEditorState, { decorator }));
    }
  };

  //Add CSS class to code-blocks
  const getBlockStyle = block => {
    switch (block.getType()) {
      case "code-block":
        return "language-".concat(props.selectedLanguage);
      default:
        return null;
    }
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
      <Toolbar
        onChange={style => handleFormatChange(style)}
        InlineStyle={currentInlineStyles}
        BlockStyle={currentBlockType}
      />
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
