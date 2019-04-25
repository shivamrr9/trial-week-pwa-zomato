
import { Constants } from '../constants';

const initialState = {
    test:5,
    response:{},
    Postresponse:{},
    visibility:false,
    loaderString:null,
    googleResponse:null,
    imagesOnLocal:null,
    imagesToBeDeleted: null,
    undo: null,
    currentCount:1,
    totalCount: 0,
    tagsData:null,
    isTagAdded:false,
    selectedTabValue:0,
    openModal:null,
    emailToBeSearchedByModal:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Constants.TEST_VALUE:
                return{...state,
                    test: action.flag
                }
        case Constants.API_CALL_TEST:
                return{...state,
                    response: action.response,
                }
        case Constants.POST_API_RESPONSE:
                return{...state,
                    Postresponse: action.data
                }
        case Constants.SHOW_LOADER:
                return{...state,
                    visibility:action.visibility,
                    loaderString: action.loaderString
                }
        case Constants.HIDE_LOADER:
                return{...state,
                    visibility:action.visibility
                }
        case Constants.GOOGLE_LOGIN_DETAILS:
                return{...state,
                    googleResponse:action.response
                }
        case Constants.UPLOADED_ON_LOCAL_IMAGES:
                return{...state,
                    imagesOnLocal: action.imagesReceived
                }
        case Constants.TO_BE_CHECKED_FOR_DELETE:
                return{...state,
                    imagesOnLocal: action.imagesReceivedWithChange,
                }
        case Constants.IMAGES_AFTER_DELETION:
                return{...state,
                    imagesOnLocal: action.imagesAfterDeletion,
                    imagesToBeDeleted: action.imagesToBeDeleted
                }
        case Constants.IMAGES_AFTER_UNDO:
                return{...state,
                    imagesOnLocal: action.combinedImages,
                    undo: true
                }
        case Constants.OPTIMIZING_COUNTER:
                return{...state,
                    currentCount: action.currentCount,
                    totalCount: action.totalCount
                }
        case Constants.TAGS_INPUT_DATA:
                return{...state,
                    tagsData:action.tagsString
                }
        case Constants.IMAGES_AFTER_ADDING_TAGS:
                return{...state,
                    imagesOnLocal: action.imagesArray,
                    isTagAdded: true
                }
        case Constants.SELECTED_TAB:
                return{...state,
                    selectedTabValue:action.selectedTab
                }
        case Constants.OPEN_MODAL:
                return{...state,
                    openModal: action.openModal
                }
        case Constants.EMAIL_TO_BE_SEARCHED_BY_MODAL:
        console.log("Reducer tka value aarahi hai!! :", action.emailToBeSearchedByModal);
                return{...state,
                    emailToBeSearchedByModal: action.emailToBeSearched
                }
                
        default:
            return state;
    }
}
