import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";
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

  useDeepCompareEffect(() => {
    // update experience at current index of experience section, with selected language as key
    // and level as property
    updateExperience(index, { [selected.language]: Number(selected.level) });
  }, [index, selected]);

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
        {// concatenate current languagee with available language, sort and map through for dropdown list
        [language]
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
