const useAnswer = () => {
  const data = JSON.parse(localStorage.getItem("answers")) || [];
  const auth = JSON.parse(localStorage.getItem("auth"));

  const getAnswers = () => {
    return data;
  };

  const getUserAnswersByQuestionId = (questionId: number) => {
    const answer = data.find(
      (item) => item.questionId === questionId && item.userId === auth?.id
    );
    return answer?.values || [];
  };

  const getAnswersByQuestionId = (questionId: number) => {
    const answer = data?.filter((item) => item.questionId === questionId);
    return answer;
  };

  const addAnswer = (questionId: number, answer: string) => {
    const index = data.findIndex(
      (answer) =>
        parseInt(answer.userId) === auth?.id &&
        parseInt(answer.questionId) === questionId
    );

    console.log(index, "index");
    if (data[index]?.values?.includes(answer)) return;

    if (index !== -1) {
      data[index].values.push(answer);
    } else {
      data.push({
        id: data.length + 1,
        questionId: questionId,
        values: [answer],
        userId: auth?.id,
      });
    }

    localStorage.setItem("answers", JSON.stringify(data));
  };

  return {
    getAnswers,
    addAnswer,
    getUserAnswersByQuestionId,
    getAnswersByQuestionId
  };
};
export default useAnswer;
