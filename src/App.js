import { useEffect, useState } from "react";
import "./App.css";
import {Users} from "./components/Users/Users.jsx"
import { Success } from "./components/Success/Success.jsx";

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [isInvites, setIsInvites] = useState([])
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(json => {
            setUsers(json.data);
        }).catch((err) => {
        console.log(err);
    }).finally(() => setIsLoading(false));
}, [])


  function onChangeSearchValue(event){
    setSearchValue(event.target.value)
  }
  function onClickSendInvites(){
    setSuccess(true)
  }


  function onClickInvites(id){
    console.log(id)
    if (isInvites.includes(id)){
      setIsInvites(prevState => {
        return prevState.filter(userId => userId !== id)
      })
    } else {
      setIsInvites(prevState => {
        return [...prevState, id]
      })
    }
  }


  console.log(isInvites)
  return (
    <div className="App">
      {success ? <Success count={isInvites.length}/>:<Users onClickSendInvites={onClickSendInvites} onClickInvites={onClickInvites} users={users} isLoading={isLoading} onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} isInvites={isInvites}/>}
    </div>
  );
}

export default App;
