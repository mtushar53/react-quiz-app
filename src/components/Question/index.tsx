import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function Question({
  item,
  setEditQuestionData,
  setValue,
  setOpen,
  deleteQuestion,
  setUpdated,
}) {
  return (
    <div className="flex items-center mb-2">
      <div>
        <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm">
          Q
        </span>
      </div>

      <p className="ml-4 md:ml-6 text-bold">{item.question}</p>
      <div className="flex ml-auto gap-3">
        <AiOutlineEdit
          className="cursor-pointer"
          onClick={() => {
            setEditQuestionData(item);
            setValue("question", item.question);
            setOpen(true);
          }}
        />
        <AiOutlineDelete
          color="red"
          className="cursor-pointer"
          onClick={() => {
            const confirmation = window.confirm(
              "Are you sure to delete the question?"
            );
            if (confirmation) {
              deleteQuestion(item.id);
              setUpdated(new Date().toISOString());
            }
          }}
        />
      </div>
    </div>
  );
}

export default Question;
