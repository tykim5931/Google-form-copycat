import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../app/store';

import { questionReorder } from "./questionSlice";
import QuestionBox from './QuestionBox';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './style.css'

const QuestionList = () => {
    const dispatch = useDispatch()

    const questions = useSelector((state:RootState) => state.questions.questionList)
    const renderedQuestions = questions.map((question, idx) => (
        <Draggable key={question.id} draggableId={question.id} index={idx}>
            {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
                <QuestionBox key={question.id} questionId={question.id} provided={provided} />
            </div>
            )}
        </Draggable>
    ))
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
          return;
        }
        dispatch(questionReorder({ firstIdx: result.source.index, secondIdx: result.destination.index }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                {renderedQuestions}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    );
}


export default QuestionList;