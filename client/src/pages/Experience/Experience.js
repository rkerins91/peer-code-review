import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import SignUpContainer from "../../components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";
import { availableLanguages } from "../../utils";
import { Typography } from "@material-ui/core";
import axios from "axios";

// TO-DO: ALLOW USER TO CHANGE EXPERIENCE FROM PREVIOUS EXPERIENCE
const Experience = () => {
  const [experience, setExperience] = useState([{ C: 1 }]);
  const [unselectedLanguages, setUnselectedLanguages] = useState(
    availableLanguages.slice(1)
  );

  useDeepCompareEffect(() => {
    // 'knownLanguages' variable is used to have a O(1) lookup when filtering
    // for unselected languages, preventing nested looping by having to search through
    // 'experience' state on each pass of filter
    const knownLanguages = {};
    experience.forEach(ele => {
      knownLanguages[Object.keys(ele)[0]] = true;
    });

    // Make array of languages from copy of availableLanguages array if they are
    // not already selected
    const newUnselectedLanguages = availableLanguages.slice().filter(ele => {
      return !knownLanguages.hasOwnProperty(ele);
    });
    setUnselectedLanguages(newUnselectedLanguages);
    console.log(experience);
  }, [experience]);

  const addExperience = () => {
    if (experience.length < availableLanguages.length) {
      setExperience([...experience, { [unselectedLanguages[0]]: 1 }]);
    }
  };

  const updateExperience = async (index, newExperience) => {
    let newExperienceList = experience.slice();
    newExperienceList[index] = newExperience;
    setExperience(newExperienceList);
  };

  const deleteExperience = idx => {
    let newExperienceList = experience.slice();
    newExperienceList.splice(idx, 1);
    setExperience(newExperienceList);
  };

  const handleSubmit = async () => {
    let experienceToSubmit = {};
    experience.forEach(ele => {
      experienceToSubmit = { ...experienceToSubmit, ...ele };
    });
    console.log(experienceToSubmit);
    // TO-DO, use context for user ID instead of hardcoding
    const submitted = axios.put(
      `user/5e4360e68c40114a421ae7e0/experience`,
      experienceToSubmit
    );
    console.log(submitted);
  };

  return (
    <SignUpContainer>
      <Typography>Add your experience here</Typography>
      {experience.map((_, idx) => {
        const currLanguage = Object.keys(experience[idx])[0];
        return (
          <NewExperienceForm
            key={currLanguage}
            updateExperience={updateExperience}
            language={currLanguage}
            availableLanguages={unselectedLanguages}
            deleteExperience={deleteExperience}
            index={idx}
            experience={experience}
            deletable={experience.length > 1}
          />
        );
      })}
      {experience.length < availableLanguages.length && (
        <AddExperienceButton addExperience={addExperience} />
      )}
      <button onClick={handleSubmit}>Submit</button>
    </SignUpContainer>
  );
};

export default Experience;
