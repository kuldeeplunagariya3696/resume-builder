import React, { useState, createContext } from "react";
import Finalresume from "./Finalresume";
import "./styleDemo.css";

export const FormData1 = createContext();

const Demo = () => {
  const [formdata, setformdata] = useState({});

  const [skills, setSkills] = useState(["Skill1", "Skill2"]);
  const [workDescs, setWorkDescs] = useState(["des1", "des2"]);
  const [projectDescs, setProjectDescs] = useState(["des_p1", "des_p2"]);
  const [achievements, setAchievements] = useState(["achivement1"]);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderFields = (fields) =>
    fields.map((field) => (
      <InputField key={field.name} {...field} onChange={handlechange} />
    ));

  const personalDetails = [
    { id: "firstname", label: "First Name", name: "fname", placeholder: "eg. name" },
    { id: "lastname", label: "Last Name", name: "lname", placeholder: "eg. surname" },
    { id: "profession", label: "Profession", name: "profession", placeholder: "eg. engineer" },
    { id: "city", label: "City", name: "city", placeholder: "eg. Ahmedabad" },
    { id: "country", label: "Country", name: "country", placeholder: "eg. India" },
    { id: "phone", label: "Mobile No", name: "phone", placeholder: "eg. 1234123412", type: "tel" },
    { id: "email", label: "Email address", name: "email", placeholder: "abcd@gmail.com", type: "email" }
  ];

  const educationFields = [
    { label: "Institute/College Name", name: "college", placeholder: "eg. LJU" },
    { label: "Year of Passing Out (College)", name: "year", type: "date" },
    { label: "School Name", name: "school", placeholder: "eg. XYZ school" },
    { label: "Year of Passing Out (School)", name: "yearc", type: "date" }
  ];

  const skillFields = [
    { label: "Technical Skills", name: "Skill", placeholder: "Skill set" },
    ...skills.map((skill, i) => ({
      name: skill,
      placeholder: `Line ${i + 1}`,
    })),
  ];

  const workFields = [
    { label: "Title", name: "title", placeholder: "Work" },
    { label: "Company Name", name: "cname", placeholder: "eg. XYZ tech" },
    { label: "Certificate Link", name: "cert_link" },
    { label: "Location", name: "Location" },
    { label: "Starting Date", name: "sdate", type: "date" },
    { label: "End Date", name: "edate", type: "date" },
    { label: "Work Description", name: "des", placeholder: "Line 1" },
    ...workDescs.map((desc, i) => ({
      name: desc,
      placeholder: `Line ${i + 2}`,
    })),
  ];

  const projectFields = [
    { label: "Project Title", name: "project_title", placeholder: "Title" },
    { label: "Overview", name: "overview", placeholder: "Overview of the project" },
    { label: "Github Link", name: "github" },
    { label: "Project Description", name: "des_p", placeholder: "Line 1" },
    ...projectDescs.map((desc, i) => ({
      name: desc,
      placeholder: `Line ${i + 2}`,
    })),
  ];

  const achievementFields = [
    { label: "Achievements", name: "achivement", placeholder: "Line 1" },
    ...achievements.map((a, i) => ({
      name: a,
      placeholder: `Line ${i + 2}`,
    })),
  ];

  const addField = (setter, baseName) =>
    setter((prev) => [...prev, `${baseName}${prev.length + 1}`]);

  const removeField = (setter) =>
    setter((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  return (
    <div className="demo-wrapper">
      <fieldset className="p-4">
        <div className="container-lg">
          <h2 className="section-title">Personal Details</h2>
          <form>
            <div className="row">
              <div className="col-md-6">{renderFields(personalDetails.slice(0, 4))}</div>
              <div className="col-md-6">{renderFields(personalDetails.slice(4))}</div>
            </div>

            <Section title="Education Details">
              <div className="col-md-6">{renderFields(educationFields)}</div>
            </Section>

            <Section title="Skills">
              <div className="col-md-6">
                {renderFields(skillFields)}
                <ButtonGroup
                  onAdd={() => addField(setSkills, "Skill")}
                  onRemove={() => removeField(setSkills)}
                />
              </div>
            </Section>

            <Section title="Work Experience">
              <div className="col-md-6">
                {renderFields(workFields)}
                <ButtonGroup
                  onAdd={() => addField(setWorkDescs, "des")}
                  onRemove={() => removeField(setWorkDescs)}
                />
              </div>
            </Section>

            <Section title="Projects">
              <div className="col-md-6">
                {renderFields(projectFields)}
                <ButtonGroup
                  onAdd={() => addField(setProjectDescs, "des_p")}
                  onRemove={() => removeField(setProjectDescs)}
                />
              </div>
            </Section>

            <Section title="Achievements">
              <div className="col-md-6">
                {renderFields(achievementFields)}
                <ButtonGroup
                  onAdd={() => addField(setAchievements, "achivement")}
                  onRemove={() => removeField(setAchievements)}
                />
              </div>
            </Section>
          </form>
        </div>
      </fieldset>

      <FormData1.Provider value={formdata}>
        <Finalresume dynamicData={{ skills, workDescs, projectDescs, achievements }} />
      </FormData1.Provider>
    </div>
  );
};

const InputField = ({ label, id, name, placeholder, type = "text", onChange }) => (
  <div className="mb-3">
    {label && <label htmlFor={id || name} className="form-label">{label}</label>}
    <input
      type={type}
      className="form-control"
      id={id || name}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="section container-lg">
    <h2 className="section-title">{title}</h2>
    <div className="row">{children}</div>
  </div>
);

const ButtonGroup = ({ onAdd, onRemove }) => (
  <div className="mb-3">
    <button type="button" className="btn btn-sm btn-primary me-2" onClick={onAdd}>Add</button>
    <button type="button" className="btn btn-sm btn-danger" onClick={onRemove}>Remove</button>
  </div>
);

export default Demo;
