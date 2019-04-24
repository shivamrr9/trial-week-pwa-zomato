
import { Constants } from '../constants';
import { ActionSchedule } from 'material-ui/svg-icons';

const initialState = {
    test:5,
    response:{},
    Postresponse:{},
    visibility:false,
    googleResponse:null,
    imagesOnLocal:null,
    imagesToBeDeleted: null,
    undo: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Constants.TEST_VALUE:
                return{
                    test: action.flag
                }
        case Constants.API_CALL_TEST:
                return{
                    response: action.response,
                }
        case Constants.POST_API_RESPONSE:
                return{
                    Postresponse: action.data
                }
        case Constants.SHOW_LOADER:
                return{
                    visibility:action.visibility
                }
        case Constants.HIDE_LOADER:
                return{
                    visibility:action.visibility
                }
        case Constants.GOOGLE_LOGIN_DETAILS:
                return{
                    googleResponse:action.response
                }
        case Constants.UPLOADED_ON_LOCAL_IMAGES:
                return{
                    imagesOnLocal: action.imagesReceived
                }
        case Constants.TO_BE_CHECKED_FOR_DELETE:
                return{
                    imagesOnLocal: action.imagesReceivedWithChange,
                }
        case Constants.IMAGES_AFTER_DELETION:
                return{
                    imagesOnLocal: action.imagesAfterDeletion,
                    imagesToBeDeleted: action.imagesToBeDeleted
                }
        case Constants.IMAGES_AFTER_UNDO:
                return{
                    imagesOnLocal: action.combinedImages,
                    undo: true
                }
                
        default:
            return state;
    }
}
