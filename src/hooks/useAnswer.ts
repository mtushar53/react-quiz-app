interface Answer {
  id: number;
  questionId: number;
  values: string[];
  userId: number;
}

const useAnswer = () => {
  const data: Answer[] = JSON.parse(localStorage.getItem("answers")) || [];
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
      (answer) => answer.userId === auth?.id && answer.questionId === questionId
    );

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
    getAnswersByQuestionId,
  };
};
export default useAnswer;
