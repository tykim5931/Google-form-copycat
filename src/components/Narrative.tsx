import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { Question } from '../feature/interfaces';

import { questionAnswerMod} from "../feature/question/questionSlice";
import "./style.css"


const Narrative = ({ id, type }: Pick<Question, 'id' | 'type'>) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find((item) => item.id === id);
    if (!question) return null;

    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';

    const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(questionAnswerMod({ id: id, answer: e.target.value }));
    };

    return (
        <>
        {isPreview || isResult ? (
            <input
            className="narrativeAnswer"
            type="text"
            placeholder={isPreview ? '내 답변' : ''}
            value={question.answer}
            onChange={onAnswerChange}
            disabled={isPreview ? false : true} // result일 경우 수정금지
            maxLength={type===1 ? -1 : 30}  // 단답형일 경우 최대 30글자
            />
        ) : ( // if editpage
            <input 
            className="narrativeAnswer"
            type="text" 
            disabled 
            placeholder={type === 0 ? '단답형 텍스트' : '장문형 텍스트'} 
            />
        )}
        </>
    );
};

export default Narrative;