import React, { Component , useState, useEffect } from "react";
import meetingDetailService from "../services/Meeting.service";
import { Link } from "react-router-dom";

export default class MeetingsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMeetings = this.retrieveMeetings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeeting = this.setActiveMeeting.bind(this);
    this.removeAllMeetings = this.removeAllMeetings.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.state = {
      meetings: [],
      currentMeeting: null,
      currentIndex: -1,
      searchTitle: ""
    };

  }

  componentDidMount() {
    this.retrieveMeetings();
  }

deleteMeeting() {
    meetingDetailService.delete(this.state.currentMeeting.id)
      .then(response => {
        console.log(response.data);
       this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }


  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveMeetings() {
    meetingDetailService.getAll()
      .then(response => {
        this.setState({
          meetings: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMeetings();
    this.setState({
      currentMeeting: null,
      currentIndex: -1
    });
  }

  setActiveMeeting(meeting, index) {
    this.setState({
      currentMeeting: meeting,
      currentIndex: index
    });
  }

  removeAllMeetings() {
    meetingDetailService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentMeeting: null,
      currentIndex: -1
    });

   meetingDetailService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          meetings: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, meetings, currentMeeting, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Meetings List</h4>

          <ul className="list-group">
          <a href="#">
            {meetings &&
              meetings.map((meeting, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMeeting(meeting, index)}
                  key={index}
                >
                 {meeting.title}
                </li>

              ))}</a>
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMeetings}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentMeeting ? (
            <div>
              <h4>Meeting</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMeeting.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMeeting.description}
              </div>
              <div>
                              <label>
                                <strong>Action Items:</strong>
                              </label>{" "}
                              {currentMeeting.Action}
                            </div>


              <Link
                to={"/meetings/" + currentMeeting.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link  className="badge badge-danger mr-2" onClick={this.deleteMeeting} >
                            Delete
                            </Link>

            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Meeting Title...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
