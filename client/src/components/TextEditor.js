import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";

const TextEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

ReactDOM.render(<MyEditor />, document.getElementById("container"));

export default TextEditor;
