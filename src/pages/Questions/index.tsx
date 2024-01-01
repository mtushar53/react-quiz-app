import "react-responsive-modal/styles.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useQuestion from "../../hooks/useQuestion";
import QuestionModal from "../../components/Modal/QuestionModal";

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
    console.log(data, "dataa");
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
      <div
        className="
      flex
      justify-center
      items-center
      mx-auto
      max-w-2xl
      rounded-lg
      md:p-16
      xs:p-2
      mt-10
    "
      >
        <div className="w-full mx-auto p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="sm:w-1/2 md:w-2/3">
              <h2 className="section-heading text-bold">Questions</h2>
            </div>

            <div className="relative sm:w-1/2 md:w-1/3 flex justify-end items-center space-x-1">
              <button
                className={`bg-gradient-to-r from-purple-400 to-pink-600 text-white font-bold py-2 px-4 rounded `}
                onClick={onOpenModal}
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div>
              {data?.map((item) => {
                return (
                  <div className="flex items-start mb-2" key={item?.id}>
                    <div>
                      <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
                        Q
                      </span>
                    </div>

                    <p className="ml-4 md:ml-6 text-bold">{item.question}</p>
                    <div className="flex ml-auto gap-3">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setEditQuestionData(item);
                          setValue("question", item.question);
                          setOpen(true);
                        }}
                      >
                        <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                      </svg>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        className="icon-danger"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          const confirmation = window.confirm(
                            "Are you sure to delete the question?"
                          );
                          if (confirmation) {
                            deleteQuestion(item.id);
                            setUpdated(new Date().toISOString());
                          }
                        }}
                      >
                        <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                      </svg>
                    </div>
                  </div>
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
