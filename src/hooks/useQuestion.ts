const useQuestion = () => {
  const data = JSON.parse(localStorage.getItem("questions")) || [];

  const getQuestions = () => {
    return data;
  };
  const editQuestion = (id, question) => {
    const index = data.findIndex((question) => question.id === id);
    data[index].question = question;
    localStorage.setItem("questions", JSON.stringify(data));
  };
  const deleteQuestion = (id) => {
    const index = data.findIndex((question) => question.id === id);
    data.splice(index, 1);
    localStorage.setItem("questions", JSON.stringify(data));
  };

  const addQuestion = (question: string) => {
    data.push({ id: data.length + 1, question: question });
    localStorage.setItem("questions", JSON.stringify(data));
  };

  return {
    getQuestions,
    editQuestion,
    deleteQuestion,
    addQuestion,
  };
};
export default useQuestion;
