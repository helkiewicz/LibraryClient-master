import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Book } from '../models/book';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../shared/authentication-service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit {
  booksData: any;
  searchTerm: string = '';

  constructor(
    private router: Router,
    public apiService: ApiService,
    public authService: AuthenticationService,
    private navCtrl: NavController
  ) {
    this.booksData = [];
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }
  }

  ionViewWillEnter() {
    this.getAllBooks();
  }

  getAllBooks() {
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.booksData = response;
    });
  }

  delete(item: Book) {
    this.apiService.deleteItem(item.idBook).subscribe(response => {
      this.getAllBooks();
    });
  }

  searchBooks() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.apiService.searchBooksByTitle(this.searchTerm).subscribe(response => {
        this.booksData = response;
      });
    } else {
      this.getAllBooks();
    }
  }
  
}
