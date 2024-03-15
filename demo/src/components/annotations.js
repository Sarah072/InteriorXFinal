import React, { Component } from 'react';
import axios from 'axios';

class AnnotationApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annotationText: '',
      isAnnotationOpen: false,
      annotations: [],
    };

    this.addAnnotation = this.addAnnotation.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    const projectID = localStorage.getItem('projectID');

    axios
      .get(`http://localhost:3000/annotation/get?projectID=${projectID}`)
      .then((response) => {
        console.log('Comments fetched successfully:', response.data);
        this.setState({ annotations: response.data });
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }

  addAnnotation() {
    const { annotationText } = this.state;

    if (annotationText.trim() !== '') {
      const username = localStorage.getItem('username');
      const projectID = localStorage.getItem('projectID');

      axios
        .post('http://localhost:3000/annotation', {
          username,
          comment: annotationText,
          projectID,
        })
        .then((response) => {
          console.log('Comment posted successfully:', response.data);
          this.setState((prevState) => ({
            annotations: [...prevState.annotations, { username, comment: annotationText }],
            annotationText: '',
          }));
          this.fetchComments();
        })
        .catch((error) => {
          console.error('Error posting comment:', error);
        });
    }
  }
  render() {
    const { annotationText, isAnnotationOpen, annotations } = this.state;

    return (
      <div
        className={`container ${isAnnotationOpen ? 'open' : ''}`}
      
      >
        <style>
          {`
        .container {
          max-width: 300px;
          margin: 0 auto;
          position: fixed;
          bottom: 20px;
          left: 0px;
          cursor: pointer;
          transition: max-height 0.8s ease;
          max-height: 150px;
          overflow: hidden;
          background-color: black;
          border: none;
        }
          .container.open {
            max-height: 700px; 
          }
          .title {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .annotation-box {
            margin-bottom: 20px;
          }

          .annotation-input {
            width: 100% !important;            
            padding: 5px; 
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .add-annotation-btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
          }

          .add-annotation-btn:hover {
            background-color: #0056b3;
          }

          .annotation-list {
            list-style-type: none;
            padding: 0;
            max-height: 300px;
            overflow-y: auto;
          }

          .annotation-item {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            font-size: 16px;
          }

          .comment-icon {
            color: blue;
            cursor: pointer;
            font-size: 20px;
          }

          .comment-icon:hover {
            color: navy;
          }
          
          `}
        </style>
        
        <div className="annotation-box">
          <p>
            <h2 style={{color: 'white'}}>Comments 💬</h2>

            
            <span
              className="comment-icon"
              onClick={() => this.setState(prevState => ({ isAnnotationOpen: !prevState.isAnnotationOpen }))}
            >
              {isAnnotationOpen ? '⬇️': '⬆️' }
            </span>
          </p>
       
          {isAnnotationOpen && (
            <div>
              <input
                className="annotation-input"
                type="text"
                value={annotationText}
                onChange={(e) => this.setState({ annotationText: e.target.value })}
                placeholder="Enter annotation..."
              />
              <button className="add-annotation-btn" onClick={this.addAnnotation}>
                Add Annotation
              </button>
            </div>
          )}
        </div>
     
        {isAnnotationOpen && (
          <div>
            <ul className="annotation-list">
              {annotations.map((annotation, index) => (
                <li key={index} className="annotation-item">
                  <span className="message-icon">📧  </span>
                  {annotation.username}: {annotation.comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default AnnotationApp;
