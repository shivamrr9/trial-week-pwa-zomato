import { Constants } from './constants';
import {doHttpGet, doHttpPost} from '../../components/utilities.js';

export function Test(flag){
    return (dispatch) => {
        dispatch({
            type : Constants.TEST_VALUE,
            flag
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

