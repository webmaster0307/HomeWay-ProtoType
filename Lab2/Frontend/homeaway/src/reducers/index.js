import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import TravelerLoginReducer from "./traveler_login";
import OwnerLoginReducer from "./owner_login"
import TravelerSignUpReducer from "./traveler_signup"
import OwnerSignUpReducer from "./owner_signup"
import TravelerProfileReducer from "./trveler-profile"
import TravelerProfileReducerSet from "./set-traveler-profile"
import PostPropertyReducer from "./postproperty.js"
import PropertyLocation from "./property-location.js"
import PropertyDetails from "./property-details.js"
import PropertyPhotos from "./property-photos.js"
import PropertyPrice from "./property-price.js"
import FetchPropertiesReducer from "./fetchproperties.js"
import FetchDetailsView from "./fetchdetailsview.js"
import BookProperty from "./bookproperty.js"
import FetchMytrips from "./fetchmytrips.js"
import OwnerDashboard from "./ownerdashboard.js"
import GetTravelers from "./gettravelers.js"
const rootReducer = combineReducers({
    traveler_login: TravelerLoginReducer,
    form: formReducer,
    owner_login:OwnerLoginReducer,
    traveler_sign_up:TravelerSignUpReducer,
    owner_sign_up:OwnerSignUpReducer,
    traveler_profile:TravelerProfileReducer,
    traveler_profile_set:TravelerProfileReducerSet,
    post_property:PostPropertyReducer,
    property_location:PropertyLocation,
    property_details:PropertyDetails,
    property_photos:PropertyPhotos,
    property_price:PropertyPrice,
    fetch_properties:FetchPropertiesReducer,
    fetch_details_view:FetchDetailsView,
    book_property:BookProperty,
    fetch_trips:FetchMytrips,
    owner_properties:OwnerDashboard,
    get_travelers:GetTravelers
  });
  
  export default rootReducer;