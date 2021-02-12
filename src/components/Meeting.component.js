import React, { Component } from "react";
import meetingDetailService from "../services/Meeting.service";

export default class Meeting extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getMeeting = this.getMeeting.bind(this);
    this.updateMeeting = this.updateMeeting.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);

    this.state = {
      currentMeeting: {
        id: null,
        title: "",
        description: "",
        Action:""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMeeting(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMeeting: {
          ...prevState.currentMeeting,
          title: title
        }
      };
    });
  }
 onChangeAction(e) {
    const Action = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMeeting: {
          ...prevState.currentMeeting,
          Action: Action
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentMeeting: {
        ...prevState.currentMeeting,
        description: description
      }
    }));
  }

  getMeeting(id) {
    meetingDetailService.get(id)
      .then(response => {
        this.setState({
          currentMeeting: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateMeeting() {
    meetingDetailService.update(
      this.state.currentMeeting.id,
      this.state.currentMeeting
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Meeting was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMeeting() {
    meetingDetailService.delete(this.state.currentMeeting.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/meetings')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMeeting } = this.state;

    return (
      <div>
        {currentMeeting ? (
          <div className="edit-form">
            <h4>Meeting</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMeeting.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMeeting.description}
                  onChange={this.onChangeDescription}
                />
              </div>
             <div className="form-group">
                             <label htmlFor="description">Action</label>
                             <input
                               type="text"
                               className="form-control"
                               id="description"
                               value={currentMeeting.Action}
                               onChange={this.onChangeAction}
                             />
                           </div>

            </form>


          <div className="button-class">
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMeeting}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMeeting}
            >
              Update
            </button>
              <p>{this.state.message}</p>
          </div>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Meeting...</p>
          </div>
        )}
      </div>
    );
  }
}
