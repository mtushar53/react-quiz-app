import { useEffect, useState } from "react";
import useQuestion from "../../hooks/useQuestion";
import { useForm } from "react-hook-form";
import useAnswer from "../../hooks/useAnswer";
import useAuth from "../../hooks/useAuth";
import AdminAnswerItem from "../../components/AdminAnswerItem";
import UserAnswerItem from "../../components/UserAnswerItem";
import { toast } from "react-toastify";

const Answers = () => {
  const { isAdmin } = useAuth();
  const { getQuestions } = useQuestion();
  const { addAnswer } = useAnswer();
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const response = getQuestions();
    setData(response);
  }, [updated]);

  const onSubmit = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      addAnswer(parseInt(key), value.toString());
    });
    setUpdated(new Date().toString());
    toast.success("Your answers submitted successfully!");
  };

  return (
    <div className="px-4">
      <div className="flex justify-center items-center mx-auto max-w-2xl rounded-lg md:p-16 xs:p-2 mt-10">
        <div className="w-full mx-auto p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Questions and Answers
              </h2>
            </div>
          </div>

          <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {
              !data?.length && <h2>No Question are there yet.</h2>
            }
            {data?.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex items-start">
                    <div>
                      <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium text-sm">
                        Q
                      </span>
                    </div>

                    <p className="ml-4 md:ml-6 text-bold">{item.question}</p>
                  </div>

                  {isAdmin ? (
                    <AdminAnswerItem item={item} />
                  ) : (
                    <UserAnswerItem item={item} register={register} />
                  )}
                </div>
              );
            })}
            {data?.length && !isAdmin ? (
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-400 to-pink-600 text-white p-2 rounded-md w-full"
              >
                Submit
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Answers;
