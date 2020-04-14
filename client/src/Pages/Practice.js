
import React, {Component} from 'react';
import './Practice.css';
import  PracticeComponenta from'./Componenta/PracticeComponenta';
import Form from 'react-bootstrap/Form';
import { GiPuzzle,GiChefToque,GiBabyfootPlayers } from "react-icons/gi";
import { FaCar,FaShower } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import Button from 'react-bootstrap/Button';




export class Practice extends Component {
    render() {
        return (
            <div > 
                <div className="title">
                <img  className="profilePicture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png" alt="profilePicture"/>
                    <span >הפעילות היומית</span>
                {/* <h2 >הפעילות היומית</h2> */}
               
                </div>
                <p className="subtitle">?מתי תרצו לבצע את התרגול הבא</p>
                <div className="week">
                  
                  
                  <Button variant="light" style={{backgroundColor:"#28A745", color:"white", boxShadow: "1px 1px #888888",fontWeight: "bold" }}>ש</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }}>ו</Button>
                  <Button variant="light" style={{backgroundColor:"#28A745", color:"white", boxShadow: "1px 1px #888888",fontWeight: "bold", marginLeft:"5px" }}>ה</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold" ,marginLeft:"5px"}}>ד</Button>
                  <Button variant="light" style={{backgroundColor:"#28A745", color:"white", boxShadow: "1px 1px #888888",fontWeight: "bold" ,marginLeft:"5px"}}>ג</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold",marginLeft:"5px" }}>ב</Button>
                  <Button variant="light" style={{backgroundColor:"#28A745", color:"white", boxShadow: "1px 1px #888888",fontWeight: "bold" ,marginLeft:"5px"}}>א</Button>
                </div>
              


<Form>
    
  
  <Form.Group className="FormMeeting" controlId="Form.meeting">
    <Form.Control as="select" size="sm"  >
      <option>08:00</option>
      <option>09:00</option>
      <option>10:00</option>
      <option>11:00</option>
      <option>12:00</option>
      <option>13:00</option>
      <option>14:00</option>
      <option>15:00</option>
      <option>16:00</option>
      <option>17:00</option>
      <option>18:00</option>
      <option>19:00</option>
      <option>20:00</option>
      <option>21:00</option>
      <option>22:00</option>
    </Form.Control>
  </Form.Group>

  <p className="text">:פעילות מועודפת להיום</p>
  
  
</Form>
<div className="row">
    <div className="col-md-4">
    <GiChefToque className="icon"/> 
    <FaShower className="icon"/>
    <GiBabyfootPlayers className="icon"/>
    </div>
    <div className="col-md-4">
    <AiOutlineRead className="icon"/> 
    <FaCar className="icon"/>
    <GiPuzzle className="icon"/>
    </div>
</div>

            
               
                
            </div>
        )
    }
}

export default Practice;
