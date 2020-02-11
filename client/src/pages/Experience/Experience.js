import React, { useState, useEffect } from "react";
import SignUpContainer from "../../components/SignUpContainer";
import NewExperienceForm from "./NewExperienceForm";
import AddExperienceButton from "./AddExperienceButton";

// TO-DO: ADD FUNCTIONALITY TO FILTER LANGUAGES ALREADY SELECTED
const Experience = props => {
  const [experience, setExperience] = useState([{ C: 1 }]);

  const languagesAvailable = [
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Python",
    "Ruby"
  ];

  const addExperience = () => {
    setExperience([...experience, { [languagesAvailable[0]]: 1 }]);
  };

  const updateExperience = async (index, newExperience) => {
    let newExperienceList = experience;
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
          updateExperience={updateExperience}
          language={languagesAvailable[0]}
          languagesAvailable={languagesAvailable}
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
