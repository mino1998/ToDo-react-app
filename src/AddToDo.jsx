import React from "react";
import{
    TextField,
    Paper,
    Button,
    Grid
}from "@material-ui/core";
class AddToDo extends React.Component{
    constructor(props){
        super(props);
        //입력받은 내용을 저장할 state를 생성
        this.state={item:{title:""}}
        this.add=props.add;
        this.clear=props.clear;
    }
    // 입력 내용이 변경될 때 title 수정하는 메서드
    // 얘로 따로 저장해두면 다른 애들이 다른 컴포넌트에 접근 x
    // 속성값만 가져가서 삽입하고 저장 하는 형태
    onInputChange=(e)=>{
        // item 속성 복제
        const thisItem=this.state.item;
        // 복제된 객체의 title 값을 입력한 내용으로 수정
        thisItem.title=e.target.value;
        // 복제된 객체를 다시 item으로 복사
        this.setState({item:thisItem});
        console.log(thisItem)
    }
    // + 버튼을 눌렀을 때
    onButtonClick=(e)=>{
        // 데이터 추가
        this.add(this.state.item);
        // title을 clear - 입력 상자도 clear 해아 한다.
        this.setState({item:{title:""}})
    }
    // 삭제누를떄
    onButtonClickDelete=(e)=>{
        this.clear(this.state.items);
    }
    // Enter를 눌렀을 때, enter 누르면 onButtonClick과 동일하게 작동
    enterKeyEnterHandler=(e)=>{
        if(e.key==="Enter"){
            this.onButtonClick();
        }
    }

    // size 값은 최대 16으로 본다.
    render(){
        return(
            <Paper style={{margin:16, padding:16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{padding:16}}>
                        <TextField placeholder="제목을 입력"
                        fullWidth
                        value={this.state.item.title}
                        onChange={this.onInputChange}
                        onKeyPress={this.enterKeyEnterHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={this.onButtonClick}>
                            +
                        </Button>
                        {/* <Button
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        onClick={this.onButtonClickDelete}>
                            삭제
                        </Button> */}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
export default AddToDo;