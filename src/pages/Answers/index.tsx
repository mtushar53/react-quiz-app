import { useEffect, useState } from "react";
import useQuestion from "../../hooks/useQuestion";
import { useForm } from "react-hook-form";
import useAnswer from "../../hooks/useAnswer";
import useAuth, { getUserNameById } from "../../hooks/useAuth";
import { ROLES } from "../../utils/Roles";

const Answers = () => {
  const { auth, isAdmin } = useAuth();
  const { getQuestions } = useQuestion();
  const { getUserAnswersByQuestionId, addAnswer, getAnswersByQuestionId } =
    useAnswer();
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const response = getQuestions();
    setData(response);
  }, [updated]);

  const onSubmit = (data) => {
    console.log(data, "data");
    Object.entries(data).forEach(([key, value]) => {
      addAnswer(parseInt(key), value.toString());
    });
    setUpdated(new Date().toString());
  };

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
            <div className="w-2/3">
              <h2 className="section-heading text-bold">
                Questions and Answer
              </h2>
            </div>
          </div>

          <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                      {getAnswersByQuestionId(item.id)?.map((answer) => {
                        return (
                          <div
                            key={answer.id}
                            className="border-b-2 border-b-gray-100 pb-4 last:border-none"
                          >
                            <div className="flex gap-20">
                              <div className="flex items-center mt-3 gap-6">
                                <div>
                                  <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                                    U
                                  </span>
                                </div>

                                <h4>{getUserNameById(answer?.userId)}</h4>
                              </div>
                              <div className="flex items-center mt-3 gap-6">
                                <div>
                                  <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                                    A
                                  </span>
                                </div>

                                <h4>{answer?.values?.slice(-1)}</h4>
                              </div>
                            </div>
                            <div className="flex items-center mt-3 gap-6">
                              <div>
                                <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                                  H
                                </span>
                              </div>

                              <h4>{answer?.values?.slice(0, -1).join(",")}</h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mt-3 gap-6">
                        <div>
                          <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                            A
                          </span>
                        </div>

                        <input
                          type="text"
                          id="username"
                          className="mt-1 p-2 w-full border rounded-md"
                          {...register(`${item.id}`, { required: true })}
                          defaultValue={getUserAnswersByQuestionId(
                            item.id
                          ).slice(-1)}
                        />
                      </div>
                      {getUserAnswersByQuestionId(item.id)?.length > 1 && (
                        <div className="flex items-center mt-3 gap-6">
                          <div>
                            <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                              U
                            </span>
                          </div>

                          <div>
                            {getUserAnswersByQuestionId(item.id)
                              ?.slice(0, -1)
                              .join(",")}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
            {data?.length && !isAdmin ? (
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full"
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
