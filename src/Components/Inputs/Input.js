import DatePicker from "react-datepicker";

export const TitleInput = ({
    title,
    onChangeTitle
}) => {
    return(
        <input 
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
        />
    )
}


