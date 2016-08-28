"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Angular imports
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
//My Imports
var Book_1 = require('../Book');
var BookLoader_1 = require('../BookLoader');
var bookList_component_1 = require('./bookList.component');
//Libraries
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(http) {
        _super.call(this, http, true);
        this.Books = new Array();
        this.AuthorBook = new Array();
        this.ReadBooks = 0;
        this.UnReadBooks = 0;
        this.Reading = 0;
        this.Authors = new Array();
        this.http = http;
    }
    AppComponent.prototype.HandleResponse = function (data) {
        if (data.length >= 1) {
            this.Books = Book_1.Book.sortByKey(data, "Author", "Series", "Number");
            this.AuthorBook = this.CreateAuthorList(this.Books);
            this.ReadBooks = this.CountBooks('Read', true);
            this.UnReadBooks = this.CountUnReadBooks();
            this.Reading = this.CountBooks('Reading', true);
            this.Authors = this.CreatePropertyList("Author");
        }
    };
    AppComponent.prototype.CreateAuthorList = function (books) {
        var _bigList = [];
        var currentAuthor;
        var currentList = [];
        currentAuthor = books[0].Author;
        for (var i = 0; i < books.length; i++) {
            if (currentAuthor == books[i].Author) {
                currentList.push(books[i]);
                currentAuthor = books[i].Author;
            }
            else {
                _bigList.push(currentList);
                currentList = [];
                currentList.push(books[i]);
                currentAuthor = books[i].Author;
            }
        }
        _bigList.push(currentList);
        return _bigList;
    };
    AppComponent.prototype.CountBooks = function (property, value) {
        var countbooks = 0;
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i][property] == value) {
                countbooks++;
            }
        }
        return countbooks;
    };
    AppComponent.prototype.CountUnReadBooks = function () {
        var countbooks = 0;
        for (var i = 0; i < this.Books.length; i++) {
            if (this.Books[i].Read == false &&
                this.Books[i].Reading == false) {
                countbooks++;
            }
        }
        return countbooks;
    };
    AppComponent.prototype.CreatePropertyList = function (property) {
        var list = [];
        for (var i = 0; i < this.Books.length; i++) {
            if (list.indexOf(this.Books[i][property]) < 0) {
                list.push(this.Books[i][property]);
            }
        }
        return list;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "model", void 0);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: './app.component.html',
            directives: [bookList_component_1.BookListComponent],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}(BookLoader_1.BookLoader));
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map