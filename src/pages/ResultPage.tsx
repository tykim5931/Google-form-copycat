import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import QuestionList from "../feature/question/QuestionList";
import { Question } from "../feature/question/questionSlice";
import TitleBox from "../feature/title/TitleBox";
import "../index.css"

const ResultPage = () => {
  const questions = useSelector((state:RootState) => state.questions)
  const renderedQuestions = questions.map((question) => summarize(question))

  return (
    <div className="formCanvas">
      <TitleBox></TitleBox>
      <div className="formResult">
          {renderedQuestions}
      </div>
    </div>
  );
};

const summarize = (question: Question) => {
  const ask = question.ask;
  let answer = question.answer;
  const selectedOptions: string[] = []
  question.selected.forEach( selectedId => {
    const option = question.options.find(item => item.id === selectedId);
    const selected = option? option.content : "";
    selectedOptions.push(selected);
  })

  if (question.type !== 0 && question.type !== 1){
    answer = selectedOptions.join(', ')
  }

  return (
    <div className="formResultComp" key={question.id}>
      <p>질문: {ask}</p>
      <p>답변: {answer}</p>
    </div>
  )
}

export default ResultPage;