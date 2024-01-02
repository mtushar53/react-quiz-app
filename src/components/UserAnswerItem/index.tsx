import useAnswer from "../../hooks/useAnswer";

function UserAnswerItem({ item, register }) {
  const { getUserAnswersByQuestionId } = useAnswer();
  return (
    <>
      <div className="flex items-center mt-3 gap-6">
        <div>
          <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-400 text-white font-medium text-sm">
            A
          </span>
        </div>

        <input
          type="text"
          id="username"
          className="mt-1 p-2 w-full border rounded-md"
          {...register(`${item.id}`, { required: true })}
          defaultValue={getUserAnswersByQuestionId(item.id).slice(-1)}
        />
      </div>
      {getUserAnswersByQuestionId(item.id)?.length > 1 && (
        <div className="flex items-center mt-3 gap-6">
          <div>
            <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
              H
            </span>
          </div>

          <div>
            {getUserAnswersByQuestionId(item.id)?.slice(0, -1).join(", ")}
          </div>
        </div>
      )}
    </>
  );
}

export default UserAnswerItem;
