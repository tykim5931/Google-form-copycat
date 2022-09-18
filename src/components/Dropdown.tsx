import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { questionSelectedMod, questionTypeMod } from '../feature/question/questionSlice';
import "./style.css";
import { useLocation } from 'react-router-dom';
import { Question } from '../feature/featureTypes';


const Dropdown = ({ id, options, isAnswer}: Pick<Question, 'id' | 'options' |'isAnswer'>) => {
    const dispatch = useDispatch();
    const theme = unstable_createMuiStrictModeTheme();
    
    // =========== Find HREF Location ================
    const location = useLocation()
    const isPreview = location.pathname === '/preview';
    const isResult = location.pathname === '/result';
    const isEdit = !isPreview && !isResult;

    // ============== Render QuestionList ===============
    const questions = useSelector((state:RootState) => state.questions.questionList)
    const question = questions.find((item) => item.id === id);
    if (!question) return null;

    const {type: questionType, selected} = question;

    // ============= Event Handler =================
    const onTypeChanged = (e: SelectChangeEvent<number>) => {
        dispatch(questionTypeMod({id: id, type: e.target.value}))
    }
    const onSelectedChanged = (e: SelectChangeEvent<number>) => {
        dispatch(questionSelectedMod({id: id, optionId: e.target.value, isAnswer, isOne:true}))
    }

    // ========= 드롭다운 선택항목 return ===========
    const getSelectedOption = () => {
        if (!isEdit) {
            const selectedOption = question.options.find(item => item.id == question.selected[0]);
            const selectedContent = selectedOption? selectedOption.id : 1;
            return selectedContent;
        }
        // if preview or result, show selectedAns
        return questionType
    }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Select 
            onChange={isEdit? onTypeChanged : onSelectedChanged}
            className='dropdown'
            disabled={false}
            value={getSelectedOption()}
            >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id} className="dropdownComp">
                    <div className='menu-content'>{option.content}</div>
                </MenuItem>
            ))}
        </Select>
    </ThemeProvider>
    </>
  );
};

export default Dropdown;
