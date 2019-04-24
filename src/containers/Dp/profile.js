import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Test,
	ApiCall,
	postApiCall,
	responseGoogle,
	showUploadedImages,
	onCheckForDelete,
	deleteSelectedImages,
	undoAction
} from './actions.js';
import styles from './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Header from './header';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Gallery from 'react-grid-gallery';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { stat } from 'fs';
import Icon from '@material-ui/core/Icon';

class Profile extends Component {

	handleClose(){
		//write code to close toast logic sochna hai..
	}

	handleUndo(currentImages,deletedImages){
		this.props.undoAction(currentImages,deletedImages);
	}

	deleteSelectedImages(imagesOnLocal){
		this.props.deleteSelectedImages(imagesOnLocal);
	}

	onCheckForDelete(val,imageObj,imagesOnLocal){
		this.props.onCheckForDelete(val,imageObj,imagesOnLocal);
	}

	onDrop(acceptedFiles,rejectedFiles){
            let sendFiles = [];
            acceptedFiles.forEach((file) => {
												file.isCheckedForDelete=false;
												file.tags=null;
												sendFiles.push(file);
						});
							this.props.showUploadedImages(sendFiles);
	}

  render() {
		console.log("profile props: ",this.props);
	 return (
		<div>
			<Header />
			<Container>
    <Row className="col-center">
      <Col md={2}>
			{this.props.imagesOnLocal &&
			<div style={{marginTop: '70px',textAlign:'center'}}>
					<Button 
						variant="contained"
						color="primary"
						className="delete-button"
						onClick={()=>{this.deleteSelectedImages(this.props.imagesOnLocal)}}
					>
					Delete Photos
				</Button>
				</div>
			}
			</Col>
      <Col md={8}>
			{this.props.imagesOnLocal && this.props.imagesOnLocal.length > 0 ?
		<div style={{marginTop:'50px'}}>
			<Row>
				<Col md={6}>	
					<span>Assign a Tag to your Album/Photos:</span>
				</Col>
				<Col md={4}>
				<Tooltip title="To enter multiple tags use comma (,)" placement="bottom">
					<TextField
								id="standard-dense"
								label="Tags"
								// className={classNames(classes.textField, classes.dense)}
							/>
        </Tooltip>
					
				</Col>
				<Col md={2}>
				<div>
					<Button variant="contained" color="secondary">
							Added
					</Button>
					<Button variant="contained" color="primary" onClick={()=>{this.addTagsToPhotos()}}>
					 	Add
					</Button>
					</div>
				
				</Col>
			</Row>
			<div style={{border:'1px solid #E0E0E0',boxShadow: '2px 2px 2px 2px #E0E0E0',marginTop:'50px'}}>
				<Row>
					{this.props.imagesOnLocal.map(obj=>{
							return <Col md={4}><img style={{padding:'10px'}} height="200px" width="220px" src={obj.preview} />
							<Checkbox
								checked={obj.isCheckedForDelete}
								onChange={(val)=>{this.onCheckForDelete(val.target.checked,obj,this.props.imagesOnLocal)}}
								color="primary"
							/>
						</Col>
					})
					}
				</Row>
			</div>
			</div> :
			<div className="upload-container">
			<Dropzone
            className="dropZone"
            accept={"image/png,image/jpeg,image/jpg,image/svg"}
            multiple={true}
            onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
            >
						<Button 
							style={{marginTop: '100px',marginBottom:'50px'}}
							variant="contained"
							color="primary"
							className="upload-button"
						>
							Upload Photos
						</Button>
      </Dropzone>
			<span>No Uploads So Far.. Upload Photos?</span>
			</div>
			}
			</Col>
			<Col md={2}>
			{this.props.imagesOnLocal &&
			<div style={{marginTop: '70px'}}>
					<Button 
					variant="contained"
					color="primary"
					className="final-upload-button"
				>
					Upload Photos
				</Button>
				</div>
			}
			</Col>
			</Row>
		</Container>
  	  {this.props.visibility &&
			 <div className="full-loader">
				<div className="relative">
				  <div className="abs" id='full-screen-loader-wrapper'>
					 <CircularProgress size={50} thickness={5} />
				  </div>
				</div>
			 </div>
			}
			<Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.imagesToBeDeleted ? true : false}
          autoHideDuration={2000}
          onClose={()=>{this.handleClose()}}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{`Deleted ${this.props.imagesToBeDeleted ? this.props.imagesToBeDeleted.length : ''} Images`}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={()=>{this.handleUndo(this.props.imagesOnLocal,this.props.imagesToBeDeleted)}}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
							onClick={()=>{this.handleClose()}}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
		</div>
	 );
  }
}

const mapStateToProps = state => ({
	test: state.postReducer.test,
	response: state.postReducer.response,
	Postresponse: state.postReducer.Postresponse,
	visibility: state.postReducer.visibility,
	googleResponse: state.postReducer.googleResponse,
	imagesOnLocal: state.postReducer.imagesOnLocal,
	isAnyCheckBoxChecked: state.postReducer.isAnyCheckBoxChecked,
	imagesToBeDeleted: state.postReducer.imagesToBeDeleted,
  undo: state.postReducer.undo
})

export default connect(mapStateToProps, {
	Test,
	ApiCall,
	postApiCall,
	responseGoogle,
	showUploadedImages,
	onCheckForDelete,
	deleteSelectedImages,
	undoAction
})(Profile);

