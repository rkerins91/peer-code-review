import React, { useState, useEffect } from "react";
import SignUpContainer from "../../components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";
import { availableLanguages } from "../../utils";

const Experience = () => {
  const [experience, setExperience] = useState([{ C: 1 }]);
  const [unselectedLanguages, setUnselectedLanguages] = useState(
    availableLanguages.slice(1)
  );

  useEffect(() => {
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
  }, [experience]);

  const addExperience = () => {
    setExperience([...experience, { [unselectedLanguages[0]]: 1 }]);
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

  return (
    <SignUpContainer>
      <p>Add your experience here</p>
      {experience.map((_, idx) => (
        <NewExperienceForm
          key={Object.keys(experience[idx])[0]}
          updateExperience={updateExperience}
          language={Object.keys(experience[idx])[0]}
          availableLanguages={unselectedLanguages}
          deleteExperience={deleteExperience}
          index={idx}
          experience={experience}
          deletable={experience.length > 1}
        />
      ))}
      <AddExperienceButton addExperience={addExperience} />
    </SignUpContainer>
  );
};

export default Experience;
