import React, { Component } from "react";
import moment from "moment";
import drive from "../Images/drive.png";
import KitchenActivity from "../Images/KitchenActivity.png";
import playground from "../Images/playground.png";
import PlayingTime from "../Images/PlayingTime.png";
import ShowerActivity from "../Images/ShowerActivity.png";
import StoryTime from "../Images/StoryTime.png";
import gapi from 'gapi-client';
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";
import '../Pages/Practice.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GiPuzzle,GiChefToque,GiBabyfootPlayers } from "react-icons/gi";
import { FaCar,FaShower } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1000);
    setInterval(() => {
      this.getEvents();
    }, 60000);
  };

  getEvents() {
    let that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(function() {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
              .endOf("day")
              .toISOString()}`
          });
        })
        .then(
          response => {
            let events = response.result.items;
            let sortedEvents = events.sort(function(a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
                isLoading: false
              });
            }
          },
          function(reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client", start);
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  render() {
    const { time, events } = this.state;

    let eventsList = events.map(function(event) {
      return (
        <a
          className="list-group-item"
          href={event.htmlLink}
          target="_blank"
          key={event.id}
        >
          {event.summary}{" "}
          <span className="badge">
            {moment(event.start.dateTime).format("h:mm a")},{" "}
            {moment(event.end.dateTime).diff(
              moment(event.start.dateTime),
              "minutes"
            )}{" "}
            minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
          </span>
        </a>
      );
    });

    let emptyState = (
      <div className="empty">
        {/* <img src={welcomeImage} alt="Welcome" /> */}
        <h3>
          No meetings are scheduled for the day. Create one by clicking the
          button below.
        </h3>
      </div>
    );

    let loadingState = (
      <div className="loading">
        {/* <img src={spinner} alt="Loading..." /> */}
      </div>
    );

    return (
      <div >

              <div className="title">
                <img  className="profilePicture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png" alt="profilePicture"/>
                    <span >הפעילות היומית</span>
               
                </div>

                <p className="subtitle">?מתי תרצו לבצע את התרגול הבא</p>
                <div className="week">
                  
                  
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }}>ש</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }}>ו</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }} >ה</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold" ,marginLeft:"5px"}}>ד</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }}>ג</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold",marginLeft:"5px" }}>ב</Button>
                  <Button variant="outline-success" style={{backgroundColor:"whit", boxShadow: "1px 1px #888888 ",fontWeight: "bold", marginLeft:"5px" }}>א</Button>
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

  <p className="text" style={{marginRight:"40%"}}>:פעילות מועודפת להיום</p>
  
  
  </Form>

  



                
              

        {/* <div
          className={
            this.state.isBusy ? "current-status busy" : "current-status open"
          }
        >
          <h1>{this.state.isBusy ? "BUSY" : "OPEN"}</h1>
        </div> */}
        <div className="upcoming-meetings">
          <div className="current-time">{time}</div>
          
          <div className="list-group">
            {this.state.isLoading && loadingState}
            {events.length > 0 && eventsList}
            {this.state.isEmpty && emptyState}
          </div>
          <div>
          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={drive} alt="drive" className="icon" data-toggle="tooltip" title="מכוננית"/>
          </a>

          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={KitchenActivity} alt="KitchenActivity" className="icon" data-toggle="tooltip" title="פעילות במטבח" />
          </a>

          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={playground} alt="playground" className="icon"  data-toggle="tooltip" title="גן שעשועים"/>
          </a>
          </div>

          <div>
          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={PlayingTime} alt="PlayingTime" className="icon"  data-toggle="tooltip" title="זמן משחק"/>
          </a>

          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={ShowerActivity} alt="ShowerActivity" className="icon" data-toggle="tooltip" title="פעילות במקלחת" />
          </a>

          <a
          
            className="primary-cta"
            href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
            target="_blank"
          >
            <img src={StoryTime} alt="StoryTime" className="icon" data-toggle="tooltip" title="זמן סיפור" />
          </a>
          </div>
          
       
        </div>
        <div>


            <p> _____________________________________________________________</p>

            <p>איזה כייף, נפגשים בקרוב! תזכורת לתרגל תשלח לפני הפעילות</p>
        </div>
        
    
      </div>
    );
  }
}