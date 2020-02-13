import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";

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
  }, [selected]);

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
        <MenuItem value="1">Beginner</MenuItem>
        <MenuItem value="2">Intermediate</MenuItem>
        <MenuItem value="3">Advanced</MenuItem>
        <MenuItem value="4">Expert</MenuItem>
      </Select>
      {deletable && (
        <button onClick={() => deleteExperience(index)}> Delete </button>
      )}
    </>
  );
};

export default NewExperienceForm;
