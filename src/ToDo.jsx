// material ui import
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
}from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
// react.js 파일에서 export한 객체를 React로 받아서 사용한다.
// {이름} 의 경우는 export한 객체에서 이름에 해당하는 것만 받아서 사용
// 하나로 묶여있어야 하는 것을 잊지 말자.
import React from "react";
class ToDo extends React.Component{
    constructor(props){
        // 상위 컴포넌트로부터 넘겨받은 데이터를 나의 props에 저장
        super(props)
        //안에서 쓴다면 this.state={이름: 초기값, 이름: 초기값...} 
        // this 는 인스턴스 안에 숨겨진 첫 번째 매개변수
        // 왜 생성자에서 만드는거야? render 안에 넣으면 안되나? 
        // 둘이 this.state 해도 되는건데?
        // 왜냐하면, instance 호출은 constructor 이다. 
        // 얘가 아니면 다른곳에서 한다면 있는지 없는지 알 수 없음
        // python 은 def __init__(): super()겠지
        // 생성자를 만드는 이유 : 시작하자마자 무엇인가를 해야 한다면 
        // props는 읽기 전용이라 수정을 한다면, state에 복사해서 사용해야 합니다.
        this.state={item:props.item, readOnly:"true"}
        this.delete=props.delete;
        this.update=props.update;
    }
    // Event가 발생하면 readOnly의 값을 false로 수정하기
    offReadOnlyMode=(e)=>{
        // 여기서는 state의 값을 바로 변경함, 이게 가능합니까?
        // 한개짜리 속성을 바꿀때는 바로 바꾸기가 가능하다.
        this.setState({readOnly:false})
    }
    //Enter를 눌렀을 때 동작하는 메서드
    enterKeyEventHandler=(e)=>{
        if(e.key==="Enter"){
            this.setState({readOnly:true});
            //데이터 수정
            this.update(this.state.item);
        }
    }
    // input의 내용을 변경했을 때 호출될 메서드
    editEventHandler=(e)=>{ 
        const thisItem=this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem})
        this.update(this.state.item);
    }
    // 체크박스의 값을 변경할 때 호출되는 메서드
    checkboxEventHandler=(e)=>{
        const thisItem=this.state.item;
        thisItem.done=!thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }
    onButtonClick=(e)=>{
        this.delete(this.state.item);
    }
    //밖에다가 쓴다면
    // state={이름:초기값,...}
        render(){ // render는 메서드, 메서드 안에서 인스턴스를 쓴다면 this를 붙여야 한다. 
            // 안붙으면 없으면 그냥 만든다.
            // this.state 쓰기 싫지?
            const item=this.state.item;
            return(
                <ListItem>
                    <Checkbox checked={item.done} 
                    onChange={this.checkboxEventHandler}/>
                    <ListItemText>
                        <InputBase
                            inputProps={{"aria-label":"naked", 
                        readOnly:this.state.readOnly}}
                            type="text"
                            id={item.id}
                            name={item.id}
                            value={item.title}
                            multiline={true}
                            fullWidth={true}
                            onClick={this.offReadOnlyMode}
                            onKeyPress={this.enterKeyEventHandler}
                            onChange={this.editEventHandler}/>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete ToDo" onClick={this.onButtonClick}>
                            <DeleteOutlined/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        }
    }
    export default ToDo;
// label? 모바일은 체크박스 누르기가 어렵다. 
// 그래서 label을 이용한다. 
// 이를 checkbox랑  아이디를 맞추고 title을 해두면 이름 눌러도 선택되도도록 한다.
