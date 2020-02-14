import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { levels } from "utils";

const NewExperienceForm = ({
  updateExperience,
  availableLanguages,
  language,
  index,
  deleteExperience,
  deletable
}) => {
  const [selected, setSelected] = useState({
    language,
    level: 1
  });

  const handleChange = name => async evt => {
    setSelected({ ...selected, [name]: evt.target.value });
  };

  useEffect(() => {
    updateExperience(index, { [selected.language]: Number(selected.level) });
  }, [index, selected, updateExperience]);

  return (
    <>
      <InputLabel id="label">Language</InputLabel>
      <Select
        labelid="label"
        id="select"
        onChange={handleChange("language")}
        value={selected.language}
        name="language"
      >
        {[language]
          .concat(availableLanguages)
          .sort()
          .map(ele => (
            <MenuItem value={ele} key={ele}>
              {ele}
            </MenuItem>
          ))}
      </Select>
      <Select
        labelid="label"
        id="select"
        onChange={handleChange("level")}
        value={selected.level}
        name="level"
      >
        {levels.map((ele, idx) => (
          <MenuItem key={ele} value={idx + 1}>
            {ele}
          </MenuItem>
        ))}
      </Select>
      {deletable && (
        <button onClick={() => deleteExperience(index)}> Delete </button>
      )}
    </>
  );
};

export default NewExperienceForm;
