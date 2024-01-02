import "react-responsive-modal/styles.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useQuestion from "../../hooks/useQuestion";
import QuestionModal from "../../components/Modal/QuestionModal";
import Question from "../../components/Question";

const Questions = () => {
  const { addQuestion, getQuestions, editQuestion, deleteQuestion } =
    useQuestion();
  const [open, setOpen] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState(null);
  const [updated, setUpdated] = useState("");

  const onOpenModal = () => {
    setValue("question", "");
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
    setEditQuestionData(null);
  };

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    if (editQuestionData) {
      editQuestion(editQuestionData?.id, data?.question);
    } else {
      addQuestion(data.question);
    }
    onCloseModal();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const response = getQuestions();
    setData(response);
  }, [open, updated]);

  return (
    <div className="px-4">
      <div className="flex justify-center items-center mx-auto max-w-2xl rounded-lg md:p-16 xs:p-2 mt-10">
        <div className="w-full mx-auto p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="sm:w-1/2 md:w-2/3">
              <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Questions
              </h2>
            </div>

            <div className="relative sm:w-1/2 md:w-1/3 flex justify-end items-center space-x-1">
              <button
                className={
                  "bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold py-2 px-4 rounded"
                }
                onClick={onOpenModal}
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div>
              {!data?.length && (
                <h2>
                  No question there. Click Add Question button to add a
                  question.
                </h2>
              )}
              {data?.map((item) => {
                return (
                  <Question
                    key={item.id}
                    item={item}
                    setEditQuestionData={setEditQuestionData}
                    setOpen={setOpen}
                    setValue={setValue}
                    deleteQuestion={deleteQuestion}
                    setUpdated={setUpdated}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <QuestionModal
        open={open}
        onCloseModal={onCloseModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      />
    </div>
  );
};

export default Questions;
