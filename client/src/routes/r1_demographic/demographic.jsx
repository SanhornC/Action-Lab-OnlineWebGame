import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import "./demographic.css";
import { API_HTTP_SUBMIT_DEMOGRAPH_SURVEY_DOMAIN_ENDPOINT } from "../../config";
import { on_submit_demographic_data_fn } from "./on_submit";
import { get_developer_mode_flag } from "../../dev_util/util";
import { DevContainer } from "../../dev_util/dev_elem";

const schema = Joi.object({
  playerName: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  yearsOfEducation: Joi.number().integer().min(0).max(150).required(),
  gender: Joi.string()
    .valid("female", "male", "other", "prefer_not_to_say")
    .required(),
  nativeEnglishSpeaker: Joi.string().valid("Yes", "No").required(),
  nativeLanguage: Joi.string().required(),
  ageLearningEnglish: Joi.number().integer().min(0).max(150).required(),
  ethnicity: Joi.string().required(),
  q1: Joi.string().required(),
  q2: Joi.string().required(),
  q3: Joi.string().required(),
  q4: Joi.string().required(),
  q5: Joi.string().required(),
  q6: Joi.string().required(),
  q7: Joi.string().required(),
  q8: Joi.string().required(),
  q9: Joi.string().required(),
  q10: Joi.string().required(),
});

/**
 * # Demographic
 * @returns
 */
export function DemographicPage(props) {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const ethnicityOptions = [
    { label: "Hispanic or Latino", value: "hispanic_or_latino" },
    {
      label: "Native American/Alaska Native",
      value: "native_american_alaska_native",
    },
    { label: "Asian", value: "asian" },
    {
      label: "Native Hawaiian or Other Pacific Islander",
      value: "native_hawaiian_other_pacific_islander",
    },
    { label: "Black or African American", value: "black_or_african_american" },
    { label: "White or Caucasian", value: "white_or_caucasian" },
    { label: "Other", value: "other" },
  ];

  const personalityOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neither Agree nor Disagree" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" },
  ];

  const QuestionGroup = ({ question, registerName, register }) => (
    <li>
      <Form.Label className="fw-bolder">{question}</Form.Label>
      <div className="options-container">
        {personalityOptions.map((option) => (
          <Form.Check
            key={option.value}
            inline
            label={option.label}
            value={option.value}
            type="radio"
            {...register(registerName, { required: "This field is required" })}
          />
        ))}
      </div>
    </li>
  );

  const questions = [
    { question: "is reserved", registerName: "q1" },
    { question: "is generally trusting", registerName: "q2" },
    { question: "tends to be lazy", registerName: "q3" },
    { question: "is relaxed, handles stress well", registerName: "q4" },
    { question: "has few artistic interests", registerName: "q5" },
    { question: "is outgoing, sociable", registerName: "q6" },
    { question: "tends to find fault with others", registerName: "q7" },
    { question: "does a thorough job", registerName: "q8" },
    { question: "gets nervous easily", registerName: "q9" },
    { question: "has an active imagination", registerName: "q10" },
  ];

  return (
    <>
      <DevContainer>
        <button
          onClick={() => {
            on_submit_demographic_data_fn({ dev_flag: true }, history);
          }}
        >
          Skip
        </button>
      </DevContainer>
      <div className="container">
        <h2> Demographic Information </h2>
        <p className="subHeading">Please answer the following questions:</p>

        <Form
          onSubmit={handleSubmit((data) => {
            on_submit_demographic_data_fn(data, history);
          })}
        >
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="playerName"
              {...register("playerName")}
            />
            {errors.playerName && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="mm/dd/yyyy"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
            />
            {errors.date_of_birth && (
              <span style={{ color: "red" }}>
                {errors.date_of_birth.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <div className="options">
              <Form.Check
                inline
                id="gender-female"
                value="female"
                label="Female"
                type="radio"
                {...register("gender")}
              />
              <Form.Check
                inline
                id="gender-male"
                value="male"
                label="Male"
                type="radio"
                {...register("gender")}
              />
              <Form.Check
                inline
                id="gender-other"
                value="other"
                label="Other"
                type="radio"
                {...register("gender")}
              />
              <Form.Check
                inline
                id="gender-prefer"
                value="prefer_not_to_say"
                label="Prefer not to say"
                type="radio"
                {...register("gender")}
              />
            </div>
            {errors.gender && (
              <span style={{ color: "red" }}>{errors.gender.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              How many years of education have you completed?
            </Form.Label>
            <Form.Control
              type="number"
              name="yearsOfEducation"
              min="0"
              max="150"
              {...register("yearsOfEducation", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Education years must be a positive number",
                },
              })}
            />
            {errors.yearsOfEducations && (
              <span style={{ color: "red" }}>{errors.education.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Are you a native English speaker?</Form.Label>
            {/* <Form.Select
            aria-label="Native English speaker select"
            {...register("nativeEnglishSpeaker")}
          >
            <option value="" disabled selected>
              Choose Option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Select>
          {errors.nativeEnglishSpeaker && (
            <span style={{ color: "red" }}>
              {errors.nativeEnglishSpeaker.message}
            </span>
          )} */}
            <div className="options">
              <Form.Check
                inline
                id="native-speaker"
                value="Yes"
                label="I'm a native English Speaker"
                type="radio"
                {...register("nativeEnglishSpeaker")}
              />
              <Form.Check
                inline
                id="non-native-speaker"
                value="No"
                label="I'm not a native English Speaker"
                type="radio"
                {...register("nativeEnglishSpeaker")}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>What is your native language?</Form.Label>
            <Form.Control type="text" {...register("nativeLanguage")} />
            {errors.nativeLanguage && (
              <span style={{ color: "red" }}>
                {errors.nativeLanguage.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              How old were you when you started learning English?
            </Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="150"
              {...register("ageLearningEnglish", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Age of learning English must be a positive number",
                },
              })}
            />
            {errors.ageLearningEnglish && (
              <span style={{ color: "red" }}>
                {errors.ageLearningEnglish.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Please check one of the following ethnic or racial categories that
              best describe you:
            </Form.Label>
            <div className="options">
              {ethnicityOptions.map((option) => (
                <Form.Check
                  key={option.value}
                  inline
                  label={option.label}
                  value={option.value}
                  type="radio"
                  {...register("ethnicity")}
                />
              ))}
            </div>
            {errors.ethnicity && (
              <span style={{ color: "red" }}>{errors.ethnicity.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              How well do the following statements describe your personality?
            </Form.Label>
            <Form.Label>I see myself as someone who</Form.Label>
            <ul className="questions-list">
              {questions.map(({ question, registerName }) => (
                <QuestionGroup
                  key={registerName}
                  question={question}
                  registerName={registerName}
                  register={register}
                />
              ))}
            </ul>
          </Form.Group>
          {Object.keys(errors).length > 0 && (
            <span style={{ color: "red" }}>
              Please select an option for all the questions.
            </span>
          )}
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
}
