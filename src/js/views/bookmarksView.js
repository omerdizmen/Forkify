import View from "./view";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg" // parcel1

class BookmarksView extends View{
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMesage = "No bookmarks yet.";
    _message = "";

    addHandlerRender(handler){
        window.addEventListener("load", handler);
    }

    _generateMarkup(){
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
    }

    
}

export default new BookmarksView(); 