import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";

const TextEditor = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div className="editor">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default TextEditor;
