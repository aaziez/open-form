'use client'

import React, { useState } from 'react'

import QuestionOption from './QuestionOption'
import Question from './Question'
import { determineIcon } from './utils/utilities'
import AddOption from './AddOption'
import { questionTypeMultipleOptions as qTypeMultiOptions } from './question-type'

export default function QuestionForm() {
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    qTypeMultiOptions.radio
  )
  const [questionOptions, setQuestionOptions] = useState([
    {
      key: 1,
      value: 'Option 1',
    },
  ])

  const changeQuestionTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuestionType(event.target.value)
  }

  const addQuestionOptionHandler = () => {
    const lastOptionKey = questionOptions[questionOptions.length - 1].key
    const newKey = lastOptionKey + 1
    const newValue = 'Option ' + newKey
    const newOption = { key: newKey, value: newValue }
    const options = [...questionOptions, newOption]

    setQuestionOptions(options)
  }

  const updateQuestionOptionHandler = (key: number, value: string) => {
    const newQuestionOptions = questionOptions.map((option) => {
      if (option.key === key) {
        return { key, value }
      }
      return option
    })
    setQuestionOptions(newQuestionOptions)
  }

  const deleteQuestionOptionHandler = (key: number) => {
    const newQuestionOptions = questionOptions.filter(
      (option) => option.key !== key
    )
    setQuestionOptions(newQuestionOptions)
  }

  const renderQuestionOptions = () => {
    const icon = determineIcon(selectedQuestionType)

    return (
      <div className="flex flex-col">
        {questionOptions.map((option, index) => {
          return (
            <QuestionOption
              key={option.key}
              icon={icon}
              num={index + 1}
              defaultValue={option.value}
              otherQuestionOptions={questionOptions.filter(
                (op) => op.key !== option.key
              )}
              onUpdate={(value) =>
                updateQuestionOptionHandler(option.key, value)
              }
              onDelete={() => deleteQuestionOptionHandler(option.key)}
            />
          )
        })}
        <AddOption
          icon={icon}
          num={questionOptions.length + 1}
          onClick={addQuestionOptionHandler}
        />
      </div>
    )
  }

  return (
    <>
      <Question />
      <div>
        <label>
          Question Type:
          <select
            value={selectedQuestionType}
            onChange={changeQuestionTypeHandler}
          >
            <option value={qTypeMultiOptions.radio}>Radio button</option>
            <option value={qTypeMultiOptions.checkbox}>Checkbox</option>
            <option value={qTypeMultiOptions.pulldown}>Pulldown</option>
          </select>
        </label>
        {renderQuestionOptions()}
      </div>
    </>
  )
}
