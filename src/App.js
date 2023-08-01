import './App.css';
import React from "react";
import ToDo from "./ToDo";
import {Paper, List, Container} from "@material-ui/core"
import AddToDo from './AddToDo';
import { call } from './service/ApiService';
class App extends React.Component {
  constructor(props){
    super(props);
    // 여러 개의 객체를 생성해서 state에 items라는 이름으로 저장
    // state에 item으로 id, title done을 만든다. 
    this.state={items:[]}; // 여기를 서버에서 받아오는 데이터로 설정할 것이다.
    // 더미 데이터로 구조를 만들어 두고, 마지막에 서버에서 데이터를 받아서 완성할 것이다. 
  }
  // 컴포넌트가 메모리 할당을 한 후 출력하기 전에 호출되는 메서드
  componentDidMount(){
    // 데이터를 가져오는 API 요청을 수행
    call("/todo","GET",null)
    .then((response)=>this.setState({items:response.list}))
  }
  //데이터 추가를 위한 함수
  // Item 1개를 받아서 items에 추가하기
  add=(item)=>{
      // // 기존 items를 thisItems에 복제
      // const thisItems=this.state.items;
      // //추가할 item 생성
      // item.id="ID-"+thisItems.length;
      // item.done=false;
      // // 복제본에 데이터 추가
      // thisItems.push(item);
      // // items에 복제본을 추가
      // // react는 props나 state가 변경되면 자동으로 컴포넌트를 재출력함
      // this.setState({items:thisItems})
      item.userID="mino"; //이는 로그인하면 안줘도 된다.
      call("/todo","POST",item)
      .then((response)=>this.setState({items:response.list}))
  }
  // 데이터 삭제를 위한 메서드
  delete=(item)=>{
    // const thisItems=this.state.items;
    // // thisItems에서 item을 삭제하기 - id가 구별하는 속성
    // // 이러면 thisItems는 영향을 받지 않는다.
    // const newItems=thisItems.filter((e)=>e.id!==item.id);
    // this.setState({items:newItems},()=>{
    //   console.log(item.id+"가 제거되었습니다.");
    // })
    item.userID="mino"; 
    call("/todo","DELETE",item)
      .then((response)=>this.setState({items:response.list}))
  }
  // 어떻게 할지 몰라서 잠시 보류
  // clear=(items)=>{
  //   const thisItems=this.state.items;
  //   // thisItems.length=0
  //   // const clearItems=thisItems; 이렇게도 가능함 배열 초기화
  //   const clearItems=thisItems.filter((e)=>e.length<0);
  //   this.setState({items:clearItems});
  // }
  // 수정 함수
  update=(item)=>{
    item.userID="mino"
    call("/todo","PUT",item)
    .then((response)=>this.setState({items:response.list}))
  }
  // map은 무조건 기억해야 한다.
  // map : 데이터의 모임을 순회하면서 함수를 적용해 함수의 리턴 값을 가지고 
  // 데이터의 모임을 만들어주는 함수
  // 데이터 변환에 활용, fileter, reduce를 같이 기억해
  // python은 list comprehension을 적용할 지 고민하자.
  // [ for ~] 이게 list comprehension
  // 기억 안나면 무조건 review하자... python에서 이걸 모르면 멍청이다.
  // items를 순회하면서 item에 넣고 함수를 적용해서 변환하여 todoItems 에 넣는다.
  // react에서는 동일한 모양을 여러개 한다면 key값을 넣는 것을 강제합니다.
  render(){
    var todoItems=this.state.items.length>0 && (
      <Paper style={{margin:16}}>
          <List>
            {this.state.items.map((item,idx)=>(
              <ToDo item={item} key={item.id} delete={this.delete}
              update={this.update}/>
            ))}
            </List>
        </Paper>
    )
    return(
      <div className="App">
        <Container maxWidth="md">
          <AddToDo add={this.add} clear={this.clear}/>
          {todoItems}
        </Container>
      </div>
    )
  }
}
export default App;
// return (
//   <div className="App">
//     <ToDo/>
//   </div>
// );