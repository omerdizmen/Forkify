import previewView from "./previewView";
import View from "./view";
import icons from "url:../../img/icons.svg" // parcel1

class ResultsView extends View{
    _parentElement = document.querySelector(".results");
    _errorMesage = "No recipes found.";
    _message = "";

    // _generateMarkup(){
    //     return this._data.map(this._generateMarkupPreview).join("");       
    // }

    // _generateMarkupPreview(){
    //   const id = window.location.hash.slice(1);

    //     return `
    //     <li class="preview">
    //         <a class="preview__link ${this._data.id === id ? "preview__link--active": ""}" href="#${this._data.id}">
    //           <figure class="preview__fig">
    //             <img src="${this._data.image}" alt="Test" />
    //           </figure>
    //           <div class="preview__data">
    //             <h4 class="preview__title">${this._data.title}</h4>
    //             <p class="preview__publisher">${this._data.id}</p>                
    //           </div>
    //         </a>
    //     </li>
    //     `
    // }

    _generateMarkup(){
      return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();