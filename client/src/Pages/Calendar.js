// import React from "react";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

// import events from "./events";

// export default function Calendar() {
//   return (
//     <div className="Calendar">
//       <FullCalendar
//         defaultView="dayGridMonth"
//         header={{
//           left: "prev,next",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,timeGridDay"
//         }}
//         plugins={[dayGridPlugin, timeGridPlugin]}
//         events={events}
//       />
//     </div>
//   );
// }

// import React from "react";

// import Calendar from "./Componenta/Calendar";

// import "./CalendarApp.css";

// class CalendarApp extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <header>
//           <div id="logo">
//             <span className="icon">date_range</span>
//             <span>
//               react<b>calendar</b>
//             </span>
//           </div>
//         </header>
//         <main>
//           <Calendar />
//         </main>
//       </div>
//     );
//   }
// }

// export default CalendarApp;
import React, { Component } from "react";
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            calApiLoaded: false,
            clientId: '<YOUR_CLIENT_ID>',
            eventColors: {},
            calColors: {},
            calIds: {},
            firstDay: new Date(),
            lastDay: new Date(),
            cals: []
        };
    }
    
    componentDidMount() {
        this.loadGoogleSDK();
    }
    
    // Load the SDK asynchronously
    loadGoogleSDK = () => {
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                this.onGoogleLoad();
                return;
            }
            const js = d.createElement(s);
            js.id = id;
            js.src = "//apis.google.com/js/client.js?onload=onGoogleLoad";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }
    
    onGoogleLoad() {
        gapi.auth.init(() => {});
    }
    
    getEventProps(event, calId) {
        return {
            start: event.start.date || event.start.dateTime,
            end: ((new Date(event.end.date) - new Date(event.start.date)) / 86400000 == 1 ? '' : event.end.date) || event.end.dateTime,
            text: event.summary || 'No Title',
            calendarId: calId,
            color: this.state.eventColors[event.colorId] || this.state.calColors[calId]
        };
    }
    
    onPageLoading = (event, inst) => {
        const state = this.state;
        const year = event.firstDay.getFullYear();
        const month = event.firstDay.getMonth();
        
        this.setState({
            firstDay: new Date(year, month - 1, -7),
            lastDay: new Date(year, month + 2, 14)
        });

        if (state.calApiLoaded) {
            let batch = gapi.client.newBatch();
            for (let calId in state.calIds) {
                batch.add(gapi.client.calendar.events.list({
                    'calendarId': calId,
                    'timeMin': firstDay.toISOString(),
                    'timeMax': lastDay.toISOString()
                }), { id: calId });
            }
            if (state.calIds) {
                batch.then((res) => {
                    let eventList = [];
                    for (let r in res) {
                        let events = res[r].result.items;
                        for (let i = 0; i < events.length; ++i) {
                            eventList.push(this.getEventProps(events[i], r));
                        }
                    }
                    this.setState({
                        events: eventList
                    });
                });
             }
        }
    }
    
    onChange(event) {
        const state = this.state;
        const calId = event.target.getAttribute('id');
        let eventList = state.events.slice(0);
        const calIds = Object.assign({}, this.state.calIds);
        
        if (event.target.checked) {
            // Add events from this calendar
            calIds[calId] = true;
            gapi.client.calendar.events.list({
                'calendarId': calId,
                'timeMin': state.firstDay.toISOString(),
                'timeMax': state.lastDay.toISOString()
            }).then((resp)=> {
                
                const events = resp.result.items;
                for (let i = 0; i < events.length; ++i) {
                    eventList.push(this.getEventProps(events[i], calId));
                }
                this.setState({
                    events: eventList,
                    calIds: calIds
                });
            });
        } else {
            // Remove events from this calendar
            eventList = state.events.filter(x => x.calendarId !== calId);
            calIds[calId] = false;
            this.setState({
                events: eventList,
                calIds: calIds
            });
        }
    }
    
    auth (ev) {
        const state = this.state;
        const btn = ev.target;
        // Google auth
        if (!state.calApiLoaded) {
            gapi.auth.authorize({
                client_id: state.clientId,
                scope: 'https://www.googleapis.com/auth/calendar',
                immediate: false
            }).then((authResult) => {
                // Load the calendar API
                if (authResult) {
                    return gapi.client.load('calendar', 'v3');
                }
            }).then(() => {
                this.setState({
                    calApiLoaded: true
                });
                btn.style.display = 'none';
                // Load calendar colors
                return gapi.client.calendar.colors.get({
                    'fields': 'event'
                });
            }).then((resp) => {
                const ev = resp.result.event;
                const eventColors = Object.assign({}, this.state.eventColors);
                for (let i = 0; i < ev.length; ++i) {
                    eventColors[i] = ev[i].color.background;
                    this.setState({
                        eventColors: eventColors
                    });
                }
                // Load calendar list
                return gapi.client.calendar.calendarList.list({
                    'fields': 'items(backgroundColor,colorId,description,id,summary)'
                });
            }).then((resp) => {
                // Populate the calendar list
                let html = '';
                const cals = resp.result.items;
                const calColors = Object.assign({}, this.state.calColors); 
                const state = this.state;
                
                 for (let i = 0; i < cals.length; ++i) {
                    const cal = cals[i];
                    
                    calColors[cal.id] = cal.backgroundColor;
                    
                    const newItem = {
                        id: cal.id, 
                        val: false,
                        summary: cal.summary, 
                        description: cal.description || 'No description'
                    };
                    
                    this.setState({
                        cals: [...state.cals, newItem]
                     });
                 }

                 this.setState({
                     calColors: calColors
                 });

             }).catch((err) => {
                // TODO test for more errors
                mobiscroll.toast({
                    message: err.error
                });
            });
        }
    }
    
    render() {
        return (
            <mobiscroll.Form ref="form" theme="ios"  themeVariant="light">
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.Button onClick={e => this.auth(e)} className="mbsc-btn-block">Add Google Calendars</mobiscroll.Button>
                                <div>
                                    {this.state.cals.map((cal, index) => {
                                        return <mobiscroll.Switch key={cal.id} id={cal.id} value={cal.val} onChange={this.onChange}>
                                            {cal.summary}
                                            <span className="mbsc-desc">{cal.description}</span>
                                        </mobiscroll.Switch>;
                                    })}
                                </div>
                            </mobiscroll.FormGroup>
                        </div>
                        <div className="mbsc-col-sm-12 mbsc-col-md-8">
                            <mobiscroll.FormGroup>
                                <mobiscroll.Eventcalendar
                                    theme="ios" 
                                    themeVariant="light"
                                    display="inline"
                                    view={{
                                        calendar: {
                                            labels: true
                                        }
                                    }}
                                    data={this.state.events}
                                    onPageLoading={this.onPageLoading}
                                />
                            </mobiscroll.FormGroup>
                        </div>
                    </div>
                </div>
            </mobiscroll.Form>
        );
    }    
}

export default Calendar;
