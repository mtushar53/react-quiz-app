import { Modal } from "react-responsive-modal";

function AddQuestionModal({
  open,
  onCloseModal,
  handleSubmit,
  onSubmit,
  register,
}) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{ modal: "sm:w-full md:w-1/2 rounded-md" }}
    >
      <div className="bg-white p-8">
        <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
          Write Question
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {/* <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium"
            >
              Write your question here
            </label> */}
            <input
              type="text"
              id="question"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("question", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-pink-600 text-white p-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddQuestionModal;
