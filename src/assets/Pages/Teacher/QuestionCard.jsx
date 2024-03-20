import React, { useState } from "react";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import axios from "axios";
const QuestionCard = ({
  stuclass,
  subject,
  id,
  name,
  school,
  token,
  refresh,
  notify,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [options, setOptions] = useState([
    { id: 1, value: "", isChecked: false },
    { id: 2, value: "", isChecked: false },
    { id: 3, value: "", isChecked: false },
    { id: 4, value: "", isChecked: false },
  ]);
  const [marks, setMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submissionDate, setSubmissionDate] = useState("");
  const addOption = () => {
    const newOptionId = options[options.length - 1].id + 1;
    setOptions([...options, { id: newOptionId, value: "", isChecked: false }]);
  };
  const removeOption = (id) => {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);
  };
  const updateOptionValue = (id, value) => {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, value } : option
    );
    setOptions(newOptions);
  };

  const toggleOptionCheck = (id) => {
    if (questionType === "single") {
      const newOptions = options.map((option) => ({
        ...option,
        isChecked: option.id === id,
      }));
      setOptions(newOptions);
    } else {
      const newOptions = options.map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option
      );
      setOptions(newOptions);
    }
  };
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);

    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };
  const submitQuestion = () => {
    const newQuestion = {
      text: questionText,
      type: questionType,
      options,
      marks,
    };
    const newAnswers = options
      .filter((option) => option.isChecked)
      .map((option) => option.value);

    setQuestions([...questions, newQuestion]);
    setAnswers([...answers, newAnswers]);

    // Reset form
    setQuestionText("");
    setQuestionType("single");
    setOptions([
      { id: 1, value: "", isChecked: false },
      { id: 2, value: "", isChecked: false },
      { id: 3, value: "", isChecked: false },
      { id: 4, value: "", isChecked: false },
    ]);
    setMarks("");
  };

  const postAssessment = async () => {
    const res = await axios.post(
      `http://localhost:9000/teachers/postassignment/${id}@${uuidv4()}`,
      {
        submissionDate,
        totalQuestions: questions.length,
        questions: questions.map((question, index) => ({
          ...question,
          answers: answers[index],
        })),
        grade: stuclass,
        subject,
        assignmentTitle: `${subject} Assessment by ${name}`,
        school,
        token,
        id,
      }
    );
    notify();
    refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold font-Montserrat text-[#917A68]">
          Total Questions Added: {questions.length}
        </p>
        <div>
          <label
            htmlFor="submission-date"
            className="font-bold font-Montserrat text-[#917A68]"
          >
            Enter Submission Date :{"  "}
          </label>
          <input
            type="date"
            id="submission-date"
            className="border mb-2 p-1"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
          />
        </div>
        <button
          onClick={postAssessment}
          className="border-none text-white p-1 font-bold font-Montserrat px-2 rounded bg-[#917A68] hover:bg-[#282323] hover:font-bold cursor-pointer"
        >
          Post Assessment
        </button>
      </div>
      <form
        onSubmit
        ={submitQuestion}
        className=" shadow-md  border rounded-lg mt-3 p-5"
      >
        <div className="flex gap-10">
          <input
            type="text"
            placeholder="Enter Question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="col-span-2 mb-4 border w-1/2 p-1"
            required
          />
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="col-span-2 mb-4 border w-1/4 p-1"
            required
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>
          <input
            type="number"
            placeholder="Enter marks for question"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="col-span-2 mb-4 border w-1/4 p-1"
          />
        </div>
        {options.map((option) => (
          <div key={option.id} className="flex items-center col-span-2">
            <input
              type={questionType === "single" ? "radio" : "checkbox"}
              name="questionOption"
              checked={option.isChecked}
              onChange={() => toggleOptionCheck(option.id)}
              className="mr-2 border-slate-700 border-2"
              required
            />
            <input
              type="text"
              placeholder={`Option ${option.id}`}
              value={option.value}
              onChange={(e) => updateOptionValue(option.id, e.target.value)}
              className="flex-grow mr-2 mb-2 border p-1"
              required
            />
            {/* Add a button to remove the option */}
            <button
              onClick={() => removeOption(option.id)}
              className="border-red-500  p-2 text-red-500 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          type="button"
          className="block bg-slate-400 p-2 mt-2 text-white rounded-lg"
        >
          + Add Option
        </button>
        <button className="bg-slate-700 rounded-xl p-2 text-white">
          Submit Question
        </button>
      </form>
      <div className="questions-display">
        <p className="font-semibold my-3">Added Questions</p>
        {questions.map((question, index) => (
          <div key={index} className="border p-3 mb-4">
            <div className="flex justify-between my-1">
              <p className="text-base font-medium">
                <span className="text-base font-medium">
                  {" "}
                  {index + 1}
                  {". "}
                </span>{" "}
                {question.text}
              </p>
              <p className="text-base font-medium">Marks: {question.marks}</p>
            </div>
            <div className=" text-left">
              <span className="text-base font-medium my-1">Options: </span>

              {question.options.map((option) => (
                <p key={option.id}>{`${option.value}   `} </p>
              ))}
            </div>

            <div className="text-left">
              <p className=" font-medium my-1">Answers:</p>
              {answers[index].map((answer, ansIndex) => (
                <p key={ansIndex}>{answer}</p>
              ))}
            </div>
            <button
              onClick={() => removeQuestion(index)}
              className="border-red-500 p-2 text-red-500 rounded-lg"
            >
              Remove Question
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
