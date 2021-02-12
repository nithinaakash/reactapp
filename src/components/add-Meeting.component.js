import React, { Component } from "react";
import meetingDetailService from "../services/Meeting.service";
import "./addstyle.css";
import axios from "axios";

export default class AddMeeting extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAssociateid=this.onChangeAssociateid.bind(this);
    this.savemeeting = this.savemeeting.bind(this);
    this.newmeeting = this.newmeeting.bind(this);
    this.handleOnSubmit=this.handleOnSubmit.bind(this);
    this.state = {
      id: null,
      title: "",
      description: "",
      Action: "",
      Email:"",
      Associateid:"",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeEmail(e) {
      this.setState({
        Email: e.target.value
      });
    }

onChangeAssociateid(e) {
    this.setState({
      Associateid: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeAction(e) {
      this.setState({
        Action: e.target.value
      });
    }

  savemeeting() {

    var data = {
      title: this.state.title,
      description: this.state.description,
      Action: this.state.Action,
      Email:this.state.Email,
      Associateid:this.state.Associateid
    };
   if(data["title"].length>10) {

    alert("Title should not be more thaan 10 letters");
    return;
    }


   meetingDetailService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          Action: response.data.Action,
          Email:response.data.Email,
          Associateid:response.data.Associateid,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });


  }

  newmeeting() {
    this.setState({
      id: null,
      title: "",
      description: "",
      Action: "",
      Email:"",
      Associateid:"",
      submitted: false
    });
  }
async handleOnSubmit(e) {
        e.preventDefault();
        var data = {
              title: this.state.title,
              description: this.state.description,
              Action: this.state.Action,
              Email:this.state.Email,
              Associateid:this.state.Associateid
            };

     meetingDetailService.sendmail(data);
        }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newmeeting}>
              Add
            </button>
          </div>
        ) : (

<div className="modal">
<br/>
            <div className="modal1">
              <label htmlFor="title">Title :- </label>
              <input

                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />  &nbsp;
              <label htmlFor="Associateid">Associate Id :- </label>
                            <input

                              className="form-control"
                              id="Associateid"
                              required
                              value={this.state.Associateid}
                              onChange={this.onChangeAssociateid}
                              name="Associateid"
                            />
                            </div>
                            <br/>
              <label htmlFor="description">&nbsp;&nbsp;Meeting Notes:- </label>
              <textarea
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />

                          <label htmlFor="Actions">&nbsp;&nbsp; Action Items:- </label>
                          <input
                            className="form-control"
                            id="description"
                            required
                            value={this.state.Action}
                            onChange={this.onChangeAction}
                            name="description"
                          />
                           <label htmlFor="Email">&nbsp;&nbsp; Email:- </label>
                                                    <input
                                                      className="form-control"
                                                      id="Email"
                                                      required
                                                      value={this.state.Email}
                                                      onChange={this.onChangeEmail}
                                                      name="Email"
                                                    />
<br/>
<div className="formbutton">
&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.savemeeting} id="button1" class="btn btn-success" >
 Submit           </button>
&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.handleOnSubmit} id="button2" class="btn btn-primary">
                          Mail
                        </button>
&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={this.handleOnSubmit}  id="button3" class="btn btn-danger" >
                                                  Cancel
                                                </button>
</div>

          </div>
        )}
      </div>
    );
  }
}
