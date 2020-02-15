import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import SignUpContainer from "components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";
import { availableLanguages } from "utils";
import { Typography } from "@material-ui/core";
import axios from "axios";

// TO-DO: ALLOW USER TO CHANGE EXPERIENCE FROM PREVIOUS EXPERIENCE
const Experience = () => {
  const [experience, setExperience] = useState([{ C: 1 }]);

  // Put language keys from state into knownLanguages object
  const knownLanguages = {};
  experience.forEach(ele => {
    // Set key to true if language is in experience object
    knownLanguages[Object.keys(ele)[0]] = true;
  });
  // Filter all available languages list for elements not in known languages object
  const newUnselectedLanguages = availableLanguages.filter(ele => {
    return !knownLanguages.hasOwnProperty(ele);
  });

  const addExperience = () => {
    if (experience.length < availableLanguages.length) {
      setExperience([...experience, { [newUnselectedLanguages[0]]: 1 }]);
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
    // Flatten array of objects into single object
    experience.forEach(ele => {
      // Object.keys(ele)[0] is they key for each experience, set experience to submit at that key in
      // experienceToSubmt object
      const key = Object.keys(ele)[0];
      experienceToSubmit[key] = ele[key];
    });
    // TO-DO, use context for user ID instead of hardcoding
    axios.put(`user/5e4360e68c40114a421ae7e0/experience`, experienceToSubmit);
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
            availableLanguages={newUnselectedLanguages}
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
