export interface FormInfo {
    title: string;
    info: string;
};

export interface OptionItemProps {
    id: number;         // option의 id or QuestionType id
    content : string;   // option 내용 or QuestionType description
};

interface OptionInfo {
    optionId: number;
    optionContent: string;
    isLast: boolean;
}

export const QUESTIONTYPES : OptionItemProps[] = [
    { id: 0, content: '단답형' },
    { id: 1, content: '장문형' },
    { id: 2, content: '객관식 질문'},
    { id: 3, content: '체크박스'},
    { id: 4, content: '드롭다운'},
];

export interface Question {
    id: string,             
    type: 0|1|2|3|4,        // QUESTIONTYPES
    isnecessary: boolean;   // 필수질문 여부
    ask: string;            // 질문내용
    answer: string;         // 답변, for subjective questions
    options: OptionItemProps[]; // 질문 선택지 for objective questions
    selected: number[];     // 답변, for objective Q
    thisOption?: OptionInfo;
    isAnswer?: boolean;
};