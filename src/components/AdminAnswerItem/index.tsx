import { getUserNameById } from "../../hooks/useAuth";
import useAnswer from "../../hooks/useAnswer";

function AdminAnswerItem({ item }) {
  const { getAnswersByQuestionId } = useAnswer();

  return (
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
                  <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-400 text-white font-medium text-sm">
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

              <h4>{answer?.values?.slice(0, -1).join(", ")}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminAnswerItem;
