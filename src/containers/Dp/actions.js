import { Constants } from './constants';
import {doHttpGet, doHttpPost} from '../../components/utilities.js';

var global='';

export function Test(flag){
    return (dispatch) => {
        dispatch({
            type : Constants.TEST_VALUE,
            flag
        });
    }
}

export function changeView(viewOption){
    return(dispatch) =>{
        dispatch({
            type: Constants.VIEW_TOGGLE,
            viewOption
        });
    }
}

export function openEmailModal(openModal){
  return (dispatch) =>{
        dispatch({
            type:Constants.OPEN_MODAL,
            openModal
        });
  }
}

export function getEmailToBeSearched(emailToBeSearched){
  return (dispatch) =>{
        dispatch({
          type: Constants.EMAIL_TO_BE_SEARCHED_BY_MODAL,
          emailToBeSearched
        })
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function uploadPhotos(readyToUploadImages){
  console.log("images to be uploaded,",readyToUploadImages);
   return (dispatch) => {
    let i;
    let promises = [];
    
    for (i = 0; i < readyToUploadImages.length; ++i) {
      promises.push(getBase64(readyToUploadImages[i]));
    }
    Promise.all(promises)
          .then((results) => {
            console.log("All done:", results);
              let tags = readyToUploadImages[0].tags || [];
              let authEmail = JSON.parse(localStorage.getItem('user_details')).email;
               var objToSend ={
                   "image":results,
                   "email":authEmail,
                   "tag": tags
                  }
                  console.log("obj to send: ",objToSend);
                  var url = `http://localhost:8001/imageRouter/uploadImage`;
                  dispatch({
                   type: Constants.SHOW_LOADER,
                   visibility: true,
                   loaderString: "Uploading Images.."
               });
                  var promise = doHttpPost(url, objToSend);
                  promise.then((response) => {
                    let isSuccess = false;
                    if(response.data.message === "success"){
                      isSuccess = true;
                    }
                    dispatch({
                      type: Constants.UPLOAD_API_RESPONSE,
                      data: isSuccess
                    });
                    dispatch({
                       type: Constants.HIDE_LOADER,
                       visibility: false
                   });
                  }, (err) => {
                   console.log("error in post call :",err);
                   dispatch({
                       type: Constants.HIDE_LOADER,
                      visibility: false
                   });
                  })
          })
          .catch((e) => {
              // Handle errors here
          });
       
   }
}

export function selectedTab(selectedTab){
    return (dispatch) =>{
      dispatch({
          type: Constants.SELECTED_TAB,
          selectedTab
      });
    }
}

export function addTagsToPhotos(tags,imagesArray){
  if(tags && tags.length){
  let tagsArray = [];
  if(tags.includes(',')){
    tagsArray = tags.split(',');
  }
  else{
  tagsArray.push(tags);
  }
  imagesArray.forEach((obj)=>{
    obj.tags = tagsArray;
  });
    return(dispatch) =>{
        dispatch({
          type: Constants.IMAGES_AFTER_ADDING_TAGS,
          imagesArray
        })
    }
  }
  else{
    alert("Enter atleast one tag")
  }
}

export function recordTags(value){
  console.log("entered value: ",value);
    return (dispatch)=>{
        dispatch({
            type: Constants.TAGS_INPUT_DATA,
            tagsString: value
        });
    }
}

export function fileCount(currentCount,totalCount){
    return (dispatch)=>{
      dispatch({
          type: Constants.OPTIMIZING_COUNTER,
          currentCount,totalCount
      });
    }
}

export function optimizeLoader(visibility,string){
    return(dispatch)=>{
      dispatch({
          type: Constants.SHOW_LOADER,
          visibility: visibility,
          loaderString: string
      });
    }
}

export function undoAction(currentImages,deletedImages){
  let combinedImages = currentImages.concat(deletedImages)
  return (dispatch) => {
    dispatch({
        type : Constants.IMAGES_AFTER_UNDO,
        combinedImages
    });
}
}

export function deleteSelectedImages(imagesOnLocal){
  let imagesAfterDeletion = [];
  let imagesToBeDeleted = [];
  imagesOnLocal.forEach((imgObj)=>{
      if(imgObj.isCheckedForDelete){
          imagesToBeDeleted.push(imgObj);
      }
      else{
      imagesAfterDeletion.push(imgObj);
      }
  })
    return (dispatch) =>{
      dispatch({
          type: Constants.IMAGES_AFTER_DELETION,
          imagesAfterDeletion: imagesAfterDeletion,
          imagesToBeDeleted: imagesToBeDeleted
      });
    }
}

export function onCheckForDelete(val,toBeCheckedImage,imagesOnLocal){
  let editedImagesOnLocal = []; 
  imagesOnLocal.forEach((imgObj)=>{
      if(imgObj.name === toBeCheckedImage.name){
        imgObj.isCheckedForDelete=val
      }
      editedImagesOnLocal.push(imgObj);
  })
  return (dispatch) =>{
      dispatch({
            type: Constants.TO_BE_CHECKED_FOR_DELETE,
            imagesReceivedWithChange: editedImagesOnLocal,
      });
  }
}

export function showUploadedImages(imagesReceived){
  imagesReceived.forEach((obj)=>{
                obj.isCheckedForDelete=false;
     						obj.tags=null;
  });

  return (dispatch) => {
            dispatch({
              type: Constants.UPLOADED_ON_LOCAL_IMAGES,
              imagesReceived
    });
  }
}

export function responseGoogle(response){
  if(response.tokenObj){
    localStorage.setItem("google-auth-token", response.tokenObj.access_token);
    localStorage.setItem("user_details",JSON.stringify(response.profileObj));
  }
  return (dispatch) =>{
    dispatch({
            type : Constants.GOOGLE_LOGIN_DETAILS,
            response: response
    });
  }
}

export function getImagesOnEmail(emailToGetImages){
  return (dispatch)=>{
    var objToSend ={
      "email": emailToGetImages
    }
    let url = "http://localhost:8001/imageRouter/getImage";
     dispatch({
      type: Constants.SHOW_LOADER,
      visibility: true,
      loaderString: "Loading Images"
  });
     var promise = doHttpPost(url, objToSend);
     promise.then((response) => {
       console.log("get Images result:",response);
       let displayArray = response.data;
       let tagsArray = [];
       displayArray.map((obj)=>{
          obj.src = obj.imageUrl;
          obj.thumbnail = obj.imageUrl;
          obj.thumbnailWidth= 300;
          obj.thumbnailHeight= 200;
          obj.caption =obj.tag.toString();
          obj.isSelected = false;
       })
       dispatch({
         type: Constants.LOADING_IMAGES_RESPONSE,
         data: displayArray
       });
       //setTimeout(() => window.location.reload(), 1000);
       dispatch({
          type: Constants.HIDE_LOADER,
          visibility: false
      });
     }, (err) => {
      console.log("error in post call :",err);
      dispatch({
          type: Constants.HIDE_LOADER,
          visibility: false
      });
     })
  }
}

//get call example
export function ApiCall(){
    var url1 =`https://api.github.com/users/shivamrr9`;
    return (dispatch) => {
        var promise = doHttpGet(url1,{});
        promise.then((response)=> {
          if(response && response.status === 200){     
            dispatch({
             type: Constants.API_CALL_TEST,
             response
           });
          }          
        }, (err) => {
         console.log("error:",err);
       })
      }
}

export function postApiCall(){
    return (dispatch) => {
        var objToSend ={
            "name":"test5",
            "salary":"123",
            "age":"23"
           }
           var url = `http://dummy.restapiexample.com/api/v1/create`;
           dispatch({
            type: Constants.SHOW_LOADER,
            visibility: true
        });
           var promise = doHttpPost(url, objToSend);
           promise.then((response) => {
             dispatch({
               type: Constants.POST_API_RESPONSE,
               data: response
             });
             //setTimeout(() => window.location.reload(), 1000);
             dispatch({
                type: Constants.HIDE_LOADER,
                visibility: false
            });
           }, (err) => {
            console.log("error in post call :",err);
            dispatch({
                type: Constants.HIDE_LOADER,
                visibility: false
            });
           })
    }
}

